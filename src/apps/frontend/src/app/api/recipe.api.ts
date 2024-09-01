import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";
import { Image } from "./image.api";
import { CreateIngredient, Ingredient } from "./ingredients.api";
import { CreateStep, Step } from "./step.api";

export type Recipe = {
  id: number;
  categoryId: number;
  name: string;
  timestamp: Date;
};

export type CreateRecipe = Omit<Recipe, "id" | "timestamp"> & {
  ingredients: Array<CreateIngredient>;
  steps: Array<CreateStep>;
  image: string | null;
};

@Injectable({ providedIn: "root" })
export class RecipeApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/recipes`;

  fetchMany() {
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  fetchById(recipeId: number) {
    return this.http.get<Recipe>(`${this.baseUrl}/${recipeId}`);
  }

  create(recipe: CreateRecipe) {
    return this.http.post<Recipe>(`${this.baseUrl}`, recipe);
  }

  delete(recipeId: number) {
    return this.http.delete<Recipe>(`${this.baseUrl}/${recipeId}`);
  }

  // ------

  fetchManyIngredientsByRecipeId(recipeId: number) {
    return this.http.get<Ingredient[]>(`${this.baseUrl}/${recipeId}/ingredients`);
  }

  fetchManyImagesByRecipeId(recipeId: number) {
    return this.http.get<Image[]>(`${this.baseUrl}/${recipeId}/images`);
  }

  fetchManyStepsByRecipeId(recipeId: number) {
    return this.http.get<Step[]>(`${this.baseUrl}/${recipeId}/steps`);
  }
}
