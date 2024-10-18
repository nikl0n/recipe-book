import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import {
  CreateImage,
  CreateIngredient,
  CreateRecipe,
  CreateStep,
  ReadImage,
  ReadIngredient,
  ReadRecipe,
  ReadStep,
} from "@repo/types";

import { environment } from "../../environment/environment";

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

  create(recipe: CreateRecipeExtended, token: string) {
    return this.http.post<ReadRecipe>(`${this.baseUrl}`, recipe, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  delete(recipeId: number, token: string) {
    return this.http.delete<ReadRecipe>(`${this.baseUrl}/${recipeId}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  update(recipe: UpdateRecipeExtended, token: string) {
    return this.http.put<ReadRecipe>(`${this.baseUrl}/${recipe.id}`, recipe, {
      headers: {
        "x-access-token": token,
      },
    });
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
