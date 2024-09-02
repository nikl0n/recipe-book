import { Controller, Get } from "@nestjs/common";

import { RecipeService } from "../recipe/recipe.service";
import { ImageService } from "./image.service";

export type ReadImage = { id: number; recipeId: number; base64: string; timestamp: Date };
export type CreateImage = Omit<ReadImage, "id" | "recipeId" | "timestamp">;
export type UpdateImage = Omit<ReadImage, "timestamp">;

@Controller("api/v1/images")
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly recipeService: RecipeService
  ) {}

  @Get()
  async fetchMany() {
    const recipes = await this.recipeService.findMany();
    const recipeIds = recipes.map((recipe) => recipe.id);

    return this.imageService.findFirstPerRecipeIds(recipeIds);
  }
}
