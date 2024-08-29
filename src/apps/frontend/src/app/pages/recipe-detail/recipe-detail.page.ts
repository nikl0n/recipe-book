import { Component, computed, effect, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { LoadingComponent } from "../../components/loading/loading.component";
import { CategorySelectCategoryById } from "../../states/category/category.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import { RecipeSelectRecipeById, RecipeSelectStatus } from "../../states/recipe/recipe.reducer";

@Component({
  selector: "app-recipe-detail",
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: "./recipe-detail.page.html",
  styleUrl: "./recipe-detail.page.scss",
})
export class RecipeDetailPage {
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);

  paramRecipeId = Number(this.activatedRoute.snapshot.paramMap.get("id"));

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipe = this.store.selectSignal(RecipeSelectRecipeById(this.paramRecipeId));

  category = this.store.selectSignal(CategorySelectCategoryById(this.recipe()?.categoryId ?? NaN));

  isLoading = computed(() => {
    return [this.recipeStatus()].some((status) => status === "LOADING");
  });

  fetchRecipeEffect = effect(
    () => {
      if (this.recipeStatus() === "IDLE" && !this.recipe()) {
        this.store.dispatch(RecipeActions.fetchById({ recipeId: this.paramRecipeId }));

        this.fetchRecipeEffect.destroy();
      }
    },
    { allowSignalWrites: true }
  );
}
