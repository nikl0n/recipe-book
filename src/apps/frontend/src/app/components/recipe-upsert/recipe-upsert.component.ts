import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Store } from "@ngrx/store";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";

import { environment } from "../../../environment/environment";
import { CreateIngredient, ReadIngredient } from "../../api/ingredients.api";
import { CreateRecipeExtended, UpdateRecipeExtended } from "../../api/recipe.api";
import { CreateStep, ReadStep } from "../../api/step.api";
import { CategorySelectCategories } from "../../states/category/category.reducer";
import { IngredientSelectIngredientsByRecipeId } from "../../states/ingredient/ingredient.reducer";
import {
  RecipeSelectRecipeById,
  RecipeSelectStatus,
  RecipeSelectStatusAction,
} from "../../states/recipe/recipe.reducer";
import { StepSelectStepsByRecipeId } from "../../states/step/step.reducer";
import { UnitSelectUnits } from "../../states/unit/unit.reducer";

@Component({
  selector: "app-recipe-upsert",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: "./recipe-upsert.component.html",
  styleUrl: "./recipe-upsert.component.scss",
})
export class RecipeUpsertComponent {
  store = inject(Store);
  snackBar = inject(MatSnackBar);
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);

  paramRecipeId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

  action = input.required<"create" | "edit">();

  onCreateRecipe = output<CreateRecipeExtended>();
  onEditRecipe = output<UpdateRecipeExtended>();

  fileNode = viewChild<ElementRef<HTMLInputElement>>("fileInput");

  units = this.store.selectSignal(UnitSelectUnits);

  categories = this.store.selectSignal(CategorySelectCategories);

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipe = this.store.selectSignal(RecipeSelectRecipeById(this.paramRecipeId));
  recipeStatusAction = this.store.selectSignal(RecipeSelectStatusAction);

  ingredientsByRecipe = this.store.selectSignal(
    IngredientSelectIngredientsByRecipeId(this.paramRecipeId)
  );

  stepsByRecipe = this.store.selectSignal(StepSelectStepsByRecipeId(this.paramRecipeId));

  isFetching = computed(() => {
    if (this.recipeStatus() === "LOADING" && this.recipeStatusAction() === "CREATE") return true;

    return false;
  });

  getImageUrl = computed(() => {
    const recipe = this.recipe();
    if (!recipe) return null;

    return `${environment.api.baseUrl}/api/v1/recipes/${recipe.id}/image`;
  });

  submitButtonName = computed(() =>
    this.action() === "create" ? "Rezept erstellen" : "Rezept bearbeiten"
  );

  private _initEffect = effect(() => {
    const recipe = this.recipe();

    if (!recipe || this.action() === "create") {
      this.addIngredient();
      this.addStep();

      return;
    }

    this.form.controls.name.patchValue(recipe.name);
    this.form.controls.category.patchValue(recipe.categoryId);
    this.form.controls.image.patchValue(
      `${environment.api.baseUrl}/api/v1/recipes/${recipe.id}/image`
    );

    if (this.action() === "edit") {
      for (const ingredient of this.ingredientsByRecipe()) {
        this.addIngredient(ingredient);
      }

      for (const step of this.stepsByRecipe()) {
        this.addStep(step);
      }

      if (this.stepsByRecipe().length === 0) {
        this.addStep();
      }

      if (this.ingredientsByRecipe().length === 0) {
        this.addIngredient();
      }

      return;
    }
  });

  snackbarEffect = effect(() => {
    if (this.recipeStatusAction() !== "CREATE") return;

    if (this.recipeStatus() === "ERROR")
      this.snackBar.open("Beim erstellen des Rezeptes ist ein Fehler aufgetreten", undefined, {
        duration: 5000,
      });
  });

  form = this.formBuilder.group({
    name: new FormControl<string | null>(null, [Validators.required]),
    category: new FormControl<number | null>(null, [Validators.required]),
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
    image: new FormControl<string | null>(null),
  });

  addIngredient(ingredient?: ReadIngredient) {
    const ingredientForm = this.formBuilder.group({
      amount: new FormControl<number | null>(ingredient?.amount ?? null),
      unitId: new FormControl<number | null>(ingredient?.unitId ?? null),
      name: new FormControl<string | null>(ingredient?.name ?? null),
    });

    (this.form.get("ingredients") as FormArray).push(ingredientForm);
  }

  removeIngredient(index: number) {
    (this.form.get("ingredients") as FormArray).removeAt(index);
  }

  addStep(step?: ReadStep) {
    const stepsArray = this.form.get("steps") as FormArray;
    const order = step?.order ?? stepsArray.length + 1;

    const stepForm = this.formBuilder.group({
      text: new FormControl<string | null>(step?.text ?? null),
      order: new FormControl<number>(order),
    });

    stepsArray.push(stepForm);
  }

  removeStep(index: number) {
    (this.form.get("steps") as FormArray).removeAt(index);
  }

  onFileSelected() {
    const fileNode = this.fileNode()?.nativeElement;

    if (fileNode?.files && fileNode.files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string | null;

        if (!result) return;

        this.form.patchValue({ image: result });
      };

      reader.readAsDataURL(fileNode.files[0]);
    }
  }

  onImageError() {
    this.form.controls.image.patchValue(null);
  }

  submitForm() {
    if (this.form.invalid) return;

    const name = this.form.controls.name.value;
    const categoryId = this.form.controls.category.value;
    const image = this.form.controls.image.value;
    const ingredients = (this.form.controls.ingredients.value as CreateIngredient[]).filter(
      (ingredient) => ingredient.amount && ingredient.name && ingredient.unitId
    );
    const steps = (this.form.controls.steps.value as CreateStep[]).filter((step) => step.text);

    if (!name || !categoryId) return;

    if (this.action() === "create") {
      const createRecipe: CreateRecipeExtended = {
        name,
        categoryId,
        image: {
          base64: image,
        },
        ingredients,
        steps,
      };

      this.onCreateRecipe.emit(createRecipe);
    } else if (this.action() === "edit") {
      if (!this.paramRecipeId) return;

      const updateRecipe: UpdateRecipeExtended = {
        id: this.paramRecipeId,
        name,
        categoryId,
        image: {
          base64: image,
        },
        ingredients,
        steps,
      };

      this.onEditRecipe.emit(updateRecipe);
    }
  }
}
