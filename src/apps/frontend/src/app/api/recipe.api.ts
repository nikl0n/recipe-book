import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";
import { CreateImage, ReadImage } from "./image.api";
import { CreateIngredient, ReadIngredient } from "./ingredients.api";
import { CreateStep, ReadStep } from "./step.api";

export type ReadRecipe = {
  id: number;
  userId: number;
  categoryId: number;
  name: string;
  timestamp: Date;
};
export type CreateRecipe = Omit<ReadRecipe, "id" | "timestamp">;
export type UpdateRecipe = Omit<ReadRecipe, "timestamp">;

export type CreateRecipeExtended = CreateRecipe & {
  image: CreateImage;
  ingredients: CreateIngredient[];
  steps: CreateStep[];
};

export type UpdateRecipeExtended = CreateRecipeExtended & { id: number };

@Injectable({ providedIn: "root" })
export class RecipeApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/recipes`;

  fetchMany() {
    return this.http.get<ReadRecipe[]>(this.baseUrl);
  }

  fetchById(recipeId: number) {
    return this.http.get<ReadRecipe>(`${this.baseUrl}/${recipeId}`);
  }

  create(recipe: CreateRecipeExtended) {
    return this.http.post<ReadRecipe>(`${this.baseUrl}`, recipe);
  }

  delete(recipeId: number) {
    return this.http.delete<ReadRecipe>(`${this.baseUrl}/${recipeId}`);
  }

  update(recipe: UpdateRecipeExtended) {
    return this.http.put<ReadRecipe>(`${this.baseUrl}/${recipe.id}`, recipe);
  }

  // ------

  fetchManyIngredientsByRecipeId(recipeId: number) {
    return this.http.get<ReadIngredient[]>(`${this.baseUrl}/${recipeId}/ingredients`);
  }

  fetchManyImagesByRecipeId(recipeId: number) {
    return this.http.get<ReadImage[]>(`${this.baseUrl}/${recipeId}/images`);
  }

  fetchManyStepsByRecipeId(recipeId: number) {
    return this.http.get<ReadStep[]>(`${this.baseUrl}/${recipeId}/steps`);
  }
}
