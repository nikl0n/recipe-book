import { Controller } from "@nestjs/common";

import { IngredientService } from "./ingredient.service";

export type CreateIngredient = { unitId: number; name: string; amount: number };

@Controller("api/v1/ingredients")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}
}
