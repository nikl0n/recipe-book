import { CommonModule } from "@angular/common";
import { Component, computed, effect, ElementRef, inject, OnInit, viewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { Store } from "@ngrx/store";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CreateIngredient } from "../../api/ingredients.api";
import { CreateRecipeExtended } from "../../api/recipe.api";
import { CreateStep } from "../../api/step.api";
import { CategorySelectCategories } from "../../states/category/category.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import { RecipeSelectStatus, RecipeSelectStatusAction } from "../../states/recipe/recipe.reducer";
import { UnitSelectUnits } from "../../states/unit/unit.reducer";

@Component({
  selector: "app-recipe-create",
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
  templateUrl: "./recipe-create.page.html",
  styleUrl: "./recipe-create.page.scss",
})
export class RecipeCreatePage implements OnInit {
  store = inject(Store);
  snackBar = inject(MatSnackBar);
  formBuilder = inject(FormBuilder);

  fileNode = viewChild<ElementRef<HTMLInputElement>>("fileInput");

  units = this.store.selectSignal(UnitSelectUnits);

  categories = this.store.selectSignal(CategorySelectCategories);

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipeStatusAction = this.store.selectSignal(RecipeSelectStatusAction);

  form = this.formBuilder.group({
    name: new FormControl<string | null>(null, [Validators.required]),
    category: new FormControl<number | null>(null, [Validators.required]),
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
    image: new FormControl<string | null>(null),
  });

  isCreating = computed(() => {
    if (this.recipeStatus() === "LOADING" && this.recipeStatusAction() === "CREATE") return true;

    return false;
  });

  snackbarEffect = effect(() => {
    if (this.recipeStatusAction() !== "CREATE") return;

    if (this.recipeStatus() === "SUCCESS")
      this.snackBar.open("Rezept wurde erfolgreich erstellt", undefined, { duration: 5000 });
    if (this.recipeStatus() === "ERROR")
      this.snackBar.open("Beim erstellen des Rezeptes ist ein Fehler aufgetreten", undefined, {
        duration: 5000,
      });
  });

  ngOnInit(): void {
    this.addIngredient();
    this.addStep();
  }

  addIngredient() {
    const ingredientForm = this.formBuilder.group({
      amount: new FormControl<number | null>(null),
      unitId: new FormControl<number | null>(null),
      name: new FormControl<string | null>(null),
    });

    (this.form.get("ingredients") as FormArray).push(ingredientForm);
  }

  removeIngredient(index: number) {
    (this.form.get("ingredients") as FormArray).removeAt(index);
  }

  addStep() {
    const stepsArray = this.form.get("steps") as FormArray;
    const order = stepsArray.length + 1;

    const stepForm = this.formBuilder.group({
      text: new FormControl<string | null>(null),
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

    const recipe: CreateRecipeExtended = {
      name,
      categoryId,
      image: {
        base64: image,
      },
      ingredients,
      steps,
    };

    this.store.dispatch(RecipeActions.create({ recipe }));
  }
}
