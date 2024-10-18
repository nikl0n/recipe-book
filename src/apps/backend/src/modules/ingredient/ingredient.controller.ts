import { Controller } from "@nestjs/common";

import { IngredientService } from "./ingredient.service";

@Controller("api/v1/ingredients")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}
}
