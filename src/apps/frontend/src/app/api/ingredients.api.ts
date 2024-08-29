import { Injectable } from "@angular/core";

export type Ingredient = {
  id: number;
  recipeId: number;
  unitId: number;
  name: string;
  amount: string;
  timestamp: Date;
};

@Injectable({ providedIn: "root" })
export class IngredientsApi {
  // private readonly http = inject(HttpClient);
  // private readonly baseUrl = `${environment.api.baseUrl}/api/v1/ingredients`;
}
