import { Controller } from "@nestjs/common";

import { IngredientService } from "./ingredient.service";

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

@Controller("api/v1/ingredients")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}
}
