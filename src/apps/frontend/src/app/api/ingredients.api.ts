import { Injectable } from "@angular/core";

export type ReadIngredient = {
  id: number;
  recipeId: number;
  unitId: number;
  name: string;
  amount: number;
  timestamp: Date;
};
export type CreateIngredient = Omit<ReadIngredient, "id" | "recipeId" | "timestamp">;
export type UpdateIngredient = Omit<ReadIngredient, "timestamp">;

@Injectable({ providedIn: "root" })
export class IngredientsApi {
  // private readonly http = inject(HttpClient);
  // private readonly baseUrl = `${environment.api.baseUrl}/api/v1/ingredients`;
}
