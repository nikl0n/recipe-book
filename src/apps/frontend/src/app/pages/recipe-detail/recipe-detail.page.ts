import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";

import { MatButtonModule } from "@angular/material/button";
import { LoadingComponent } from "../../components/loading/loading.component";
import { CategorySelectCategoryById } from "../../states/category/category.reducer";
import { ImageActions } from "../../states/image/image.action";
import { ImageSelectImages, ImageSelectStatus } from "../../states/image/image.reducer";
import { IngredientActions } from "../../states/ingredient/ingredient.action";
import {
  IngredientSelectIngredients,
  IngredientSelectStatus,
} from "../../states/ingredient/ingredient.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import {
  RecipeSelectLastFetched,
  RecipeSelectRecipeById,
  RecipeSelectStatus,
} from "../../states/recipe/recipe.reducer";
import { StepActions } from "../../states/step/step.action";
import { StepSelectStatus, StepSelectSteps } from "../../states/step/step.reducer";
import { UnitSelectUnits } from "../../states/unit/unit.reducer";

@Component({
  selector: "app-recipe-detail",
  standalone: true,
  imports: [LoadingComponent, CommonModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: "./recipe-detail.page.html",
  styleUrl: "./recipe-detail.page.scss",
})
export class RecipeDetailPage {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  router = inject(Router);

  paramRecipeId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

  checkedIngredients: Set<number> = new Set();

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipe = this.store.selectSignal(RecipeSelectRecipeById(this.paramRecipeId));
  recipeLastFetched = this.store.selectSignal(RecipeSelectLastFetched);

  imageStatus = this.store.selectSignal(ImageSelectStatus);
  images = this.store.selectSignal(ImageSelectImages);

  ingredientStatus = this.store.selectSignal(IngredientSelectStatus);
  ingredients = this.store.selectSignal(IngredientSelectIngredients);

  stepStatus = this.store.selectSignal(StepSelectStatus);
  steps = this.store.selectSignal(StepSelectSteps);

  units = this.store.selectSignal(UnitSelectUnits);

  category = this.store.selectSignal(CategorySelectCategoryById(this.recipe()?.categoryId ?? NaN));

  fetchResourcesEffect = effect(
    () => {
      const recipe = this.recipe();

      if (!recipe) {
        const recipeId = this.paramRecipeId;
        if (isNaN(recipeId)) return;

        this.store.dispatch(RecipeActions.fetchById({ recipeId }));

        return;
      }

      const fetchStepsAndIngredients = () => {
        this.store.dispatch(StepActions.fetchByRecipeId({ recipeId: recipe.id }));
        this.store.dispatch(StepActions.setLastFetched({ componentName: "recipe-detail" }));

        this.store.dispatch(IngredientActions.fetchByRecipeId({ recipeId: recipe.id }));
        this.store.dispatch(IngredientActions.setLastFetched({ componentName: "recipe-detail" }));
      };

      if (this.recipeLastFetched() === "recipe-list") {
        fetchStepsAndIngredients();

        this.fetchResourcesEffect.destroy();
      } else {
        fetchStepsAndIngredients();

        this.store.dispatch(ImageActions.fetchByRecipeId({ recipeId: recipe.id }));
        this.store.dispatch(ImageActions.setLastFetched({ componentName: "recipe-detail" }));

        this.fetchResourcesEffect.destroy();
      }
    },
    { allowSignalWrites: true }
  );

  isLoading = computed(() => {
    return [
      this.recipeStatus(),
      this.imageStatus(),
      this.ingredientStatus(),
      this.stepStatus(),
    ].some((status) => status === "LOADING");
  });

  extendedRecipe = computed(() => {
    const recipe = this.recipe();

    if (!recipe) return;

    return {
      ...recipe,
      images: this.images().filter((image) => {
        if (!image) return false;

        return image.recipeId === this.recipe()?.id;
      }),
      ingredients: this.ingredients().map((ingredient) => ({
        ...ingredient,
        unit: this.units().find((unit) => unit.id === ingredient.unitId),
      })),
      steps: this.steps(),
    };
  });

  toggleIngredient(index: number) {
    if (this.checkedIngredients.has(index)) {
      this.checkedIngredients.delete(index);

      return;
    }

    this.checkedIngredients.add(index);
  }

  isCheckedIngredient(index: number) {
    return this.checkedIngredients.has(index);
  }

  onClickBackButton() {
    this.router.navigateByUrl("/recipes");
  }
}
