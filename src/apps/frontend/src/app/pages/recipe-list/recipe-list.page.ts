import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatChipListboxChange, MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";

import { Store } from "@ngrx/store";

import { Category } from "../../api/category.api";
import { Image } from "../../api/image.api";
import { Recipe } from "../../api/recipe.api";
import { LoadingComponent } from "../../components/loading/loading.component";
import { RecipeComponent } from "../../components/recipe/recipe.component";
import { CategorySelectCategories } from "../../states/category/category.reducer";
import { ImageActions } from "../../states/image/image.action";
import { ImageSelectImages, ImageSelectStatus } from "../../states/image/image.reducer";
import { RecipeActions } from "../../states/recipe/recipe.action";
import {
  RecipeSelectLastFetched,
  RecipeSelectRecipes,
  RecipeSelectStatus,
} from "../../states/recipe/recipe.reducer";

export type ExtendedRecipe = Recipe & {
  category: Category | undefined;
  images: Image[];
};

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [
    CommonModule,

    MatChipsModule,
    MatButtonModule,
    MatIconModule,

    RecipeComponent,
    LoadingComponent,
  ],
  templateUrl: "./recipe-list.page.html",
  styleUrl: "./recipe-list.page.scss",
})
export class RecipeListPage implements OnInit {
  store = inject(Store);
  router = inject(Router);

  recipeStatus = this.store.selectSignal(RecipeSelectStatus);
  recipes = this.store.selectSignal(RecipeSelectRecipes);
  recipeLastFetched = this.store.selectSignal(RecipeSelectLastFetched);

  imageStatus = this.store.selectSignal(ImageSelectStatus);
  images = this.store.selectSignal(ImageSelectImages);

  categories = this.store.selectSignal(CategorySelectCategories);

  activeCategoryId = signal<Category["id"] | null>(null);

  extendedRecipe = computed(() => {
    let recipes: ExtendedRecipe[] = this.recipes()
      .map((recipe) => ({
        ...recipe,
        category: this.categories().find((category) => category.id === recipe.categoryId),
        images: this.images().filter((image) => image.recipeId === recipe.id),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (typeof this.activeCategoryId() === "number") {
      recipes = recipes.filter((recipe) => recipe.categoryId === this.activeCategoryId());
    }

    return recipes;
  });

  isLoading = computed(() => {
    return [this.recipeStatus(), this.imageStatus()].some((status) => status === "LOADING");
  });

  ngOnInit(): void {
    if (this.recipeLastFetched() === "recipe-list") return;

    this.store.dispatch(RecipeActions.fetchAll());
    this.store.dispatch(RecipeActions.setLastFetched({ componentName: "recipe-list" }));

    this.store.dispatch(ImageActions.fetchMany());
    this.store.dispatch(ImageActions.setLastFetched({ componentName: "recipe-list" }));
  }

  onClickChipCategory(event: MatChipListboxChange) {
    const categoryId = event.value as Category["id"];

    if (categoryId === undefined) {
      this.activeCategoryId.set(null);

      return;
    }

    this.activeCategoryId.set(categoryId);
  }

  onClickRecipe(id: number) {
    this.router.navigateByUrl(`recipes/${id}`);
  }

  onClickDeleteRecipe(recipeId: number) {
    this.store.dispatch(RecipeActions.delete({ recipeId }));
  }

  onClickCreateRecipe() {
    this.router.navigateByUrl(`recipes/create`);
  }
}
