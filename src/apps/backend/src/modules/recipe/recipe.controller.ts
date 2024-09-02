import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";

import { CreateImage } from "../image/image.controller";
import { ImageService } from "../image/image.service";
import { CreateIngredient } from "../ingredient/ingredient.controller";
import { IngredientService } from "../ingredient/ingredient.service";
import { CreateStep } from "../step/step.controller";
import { StepService } from "../step/step.service";
import { RecipeService } from "./recipe.service";

export type ReadRecipe = { id: number; categoryId: number; name: string; timestamp: Date };
export type CreateRecipe = Omit<ReadRecipe, "id" | "timestamp">;
export type UpdateRecipe = Omit<ReadRecipe, "timestamp">;

@Controller("api/v1/recipes")
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly stepService: StepService,
    private readonly ingredientService: IngredientService,
    private readonly imageService: ImageService
  ) {}

  @Get()
  findMany() {
    return this.recipeService.findMany();
  }

  @Get(":id")
  findUnique(@Param("id", ParseIntPipe) recipeId: number) {
    return this.recipeService.findUnique(recipeId);
  }

  @Post()
  async create(
    @Body()
    recipe: CreateRecipe & {
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    }
  ) {
    return this.recipeService.create(recipe);
  }

  @Post()
  async update(
    @Body()
    recipe: CreateRecipe & {
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    }
  ) {
    return this.recipeService.create(recipe);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) recipeId: number) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    return this.recipeService.delete(recipeId);
  }

  @Get(":id/steps")
  async findManyStepsByRecipeId(@Param("id", ParseIntPipe) recipeId: number) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    return this.stepService.findManyByRecipeId(recipeId);
  }

  @Get(":id/ingredients")
  async findManyIngredientsByRecipeId(@Param("id", ParseIntPipe) recipeId: number) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    return this.ingredientService.findManyByRecipeId(recipeId);
  }

  @Get(":id/images")
  async findManyImagesByRecipeId(@Param("id", ParseIntPipe) recipeId: number) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    return this.imageService.findManyByRecipeId(recipeId);
  }
}
