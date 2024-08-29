import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";
import { Image } from "./image.api";
import { Ingredient } from "./ingredients.api";
import { Step } from "./step.api";

export type Recipe = {
  id: number;
  categoryId: number;
  name: string;
  timestamp: Date;
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
