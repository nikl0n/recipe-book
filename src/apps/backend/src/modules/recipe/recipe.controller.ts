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
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";

import { CreateImage, CreateIngredient, CreateRecipe, CreateStep, ReadUser } from "@packages/types";

import { Request, Response } from "express";

import { TokenAuthGuard } from "src/guards/token.guard";
import { ImageService } from "../image/image.service";
import { IngredientService } from "../ingredient/ingredient.service";
import { StepService } from "../step/step.service";
import { RecipeService } from "./recipe.service";

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

  @SkipThrottle()
  @Get(":id/image")
  async findFirstByRecipeId(@Param("id", ParseIntPipe) recipeId: number, @Res() res: Response) {
    const recipe = await this.recipeService.findById(recipeId);
    if (!recipe) throw new NotFoundException(`no recipe found with id ${recipeId}`);

    const image = await this.imageService.findFirstByRecipeId(recipeId);

    if (!image) throw new NotFoundException(`no image found with recipe id ${recipe.id}`);

    res.setHeader("Content-Type", image.mimeType);

    res.send(image.content);
  }
}
