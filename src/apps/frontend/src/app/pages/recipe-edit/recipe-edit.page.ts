import { Component, computed, effect, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Store } from "@ngrx/store";

import { UpdateRecipeExtended } from "../../api/recipe.api";
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { RecipeUpsertComponent } from "../../components/recipe-upsert/recipe-upsert.component";
import { IngredientActions } from "../../states/ingredient/ingredient.action";
import { IngredientSelectStatus } from "../../states/ingredient/ingredient.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import {
  RecipeSelectLastFetched,
  RecipeSelectRecipeById,
  RecipeSelectStatus,
  RecipeSelectStatusAction,
} from "../../states/recipe/recipe.reducer";
import { StepActions } from "../../states/step/step.action";
import { StepSelectStatus } from "../../states/step/step.reducer";
import { UserSelectUser } from "../../states/user/user.reducer";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [RecipeUpsertComponent, LoadingComponent, BackButtonComponent],
  templateUrl: "./recipe-edit.page.html",
  styleUrl: "./recipe-edit.page.scss",
})
export class RecipeEditPage {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);

  paramRecipeId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

  user = this.store.selectSignal(UserSelectUser);

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipeStatusAction = this.store.selectSignal(RecipeSelectStatusAction);
  recipe = this.store.selectSignal(RecipeSelectRecipeById(this.paramRecipeId));
  recipeLastFetched = this.store.selectSignal(RecipeSelectLastFetched);

  ingredientStatus = this.store.selectSignal(IngredientSelectStatus);

  stepStatus = this.store.selectSignal(StepSelectStatus);

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
        this.store.dispatch(StepActions.setLastFetched({ componentName: "recipe-edit" }));

        this.store.dispatch(IngredientActions.fetchByRecipeId({ recipeId: recipe.id }));
        this.store.dispatch(IngredientActions.setLastFetched({ componentName: "recipe-edit" }));
      };

      if (this.recipeLastFetched() === "recipe-list") {
        fetchStepsAndIngredients();

        this.fetchResourcesEffect.destroy();
      } else {
        fetchStepsAndIngredients();

        this.fetchResourcesEffect.destroy();
      }
    },
    { allowSignalWrites: true }
  );

  isLoading = computed(() => {
    return [this.recipeStatus(), this.ingredientStatus(), this.stepStatus()].some(
      (status) => status === "LOADING"
    );
  });

  fetchResourcesAfterEdit = effect(
    () => {
      const recipe = this.recipe();
      if (!recipe) return;

      if (this.recipeStatus() === "SUCCESS" && this.recipeStatusAction() === "UPDATE") {
        this.store.dispatch(IngredientActions.fetchByRecipeId({ recipeId: recipe.id }));
        this.store.dispatch(IngredientActions.setLastFetched({ componentName: "recipe-edit" }));

        this.store.dispatch(StepActions.fetchByRecipeId({ recipeId: recipe.id }));
        this.store.dispatch(StepActions.setLastFetched({ componentName: "recipe-edit" }));
      }
    },
    { allowSignalWrites: true }
  );

  onEditRecipe(recipe: UpdateRecipeExtended) {
    const token = this.user()?.token;
    if (!token) return;

    this.store.dispatch(RecipeActions.update({ recipe, token }));
  }
}
