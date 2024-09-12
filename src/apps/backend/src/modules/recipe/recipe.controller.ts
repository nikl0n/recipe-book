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
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { Request } from "express";

import { TokenAuthGuard } from "src/guards/token.guard";
import { CreateImage } from "../image/image.controller";
import { ImageService } from "../image/image.service";
import { CreateIngredient } from "../ingredient/ingredient.controller";
import { IngredientService } from "../ingredient/ingredient.service";
import { CreateStep } from "../step/step.controller";
import { StepService } from "../step/step.service";
import { ReadUser } from "../user/user.controller";
import { RecipeService } from "./recipe.service";

export type ReadRecipe = {
  id: number;
  userName: string;
  categoryId: number;
  name: string;
  timestamp: Date;
};
export type CreateRecipe = Omit<ReadRecipe, "id" | "userName" | "timestamp">;
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
  @UseGuards(TokenAuthGuard)
  async create(
    @Body()
    recipe: CreateRecipe & {
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    },
    @Req() request: Request & { user: ReadUser }
  ) {
    return this.recipeService.create(recipe, request.user.name);
  }

  @Put(":id")
  @UseGuards(TokenAuthGuard)
  async update(
    @Param("id", ParseIntPipe) recipeId: number,
    @Body()
    bodyRecipe: CreateRecipe & {
      id: number;
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    },
    @Req() request: Request & { user: ReadUser }
  ) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new BadRequestException(`no recipe found with id ${recipeId}`);

    if (recipe.userName !== request.user.name)
      throw new UnauthorizedException("not allowed to edit recipe");

    return this.recipeService.update(bodyRecipe);
  }

  @Delete(":id")
  @UseGuards(TokenAuthGuard)
  async delete(
    @Param("id", ParseIntPipe) recipeId: number,
    @Req() request: Request & { user: ReadUser }
  ) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    if (recipe.userName !== request.user.name)
      throw new UnauthorizedException("not allowed to delete recipe");

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
