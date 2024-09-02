import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";

import { CreateImage, UpdateImage } from "../image/image.controller";
import { ImageService } from "../image/image.service";
import { CreateIngredient, UpdateIngredient } from "../ingredient/ingredient.controller";
import { IngredientService } from "../ingredient/ingredient.service";
import { CreateStep, UpdateStep } from "../step/step.controller";
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
  async findUnique(@Param("id", ParseIntPipe) recipeId: number) {
    const recipe = await this.recipeService.findUnique(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    return recipe;
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
    bodyRecipe: UpdateRecipe & {
      ingredients: UpdateIngredient[];
      steps: UpdateStep[];
      image: UpdateImage;
    }
  ) {
    const recipe = await this.recipeService.findById(bodyRecipe.id);
    if (!recipe) throw new BadRequestException(`no recipe found with id ${bodyRecipe.id}`);

    return this.recipeService.update(bodyRecipe);
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
