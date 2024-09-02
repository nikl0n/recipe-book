import { Injectable } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";
import { CreateImage, UpdateImage } from "../image/image.controller";
import { CreateIngredient, UpdateIngredient } from "../ingredient/ingredient.controller";
import { CreateStep, UpdateStep } from "../step/step.controller";
import { CreateRecipe, UpdateRecipe } from "./recipe.controller";

@Injectable()
export class RecipeService {
  prisma = new PrismaClient();

  findById(id: number) {
    return this.prisma.recipes.findUnique({
      where: {
        id,
      },
    });
  }

  findMany() {
    return this.prisma.recipes.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  findUnique(id: number) {
    return this.prisma.recipes.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.recipes.delete({ where: { id } });
  }

  create(
    recipe: CreateRecipe & {
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    }
  ) {
    const timestamp = new Date();

    return this.prisma.$transaction(async (tx) => {
      const newRecipe = await tx.recipes.create({
        data: {
          name: recipe.name,
          categoryId: recipe.categoryId,
          timestamp,
        },
      });

      if (recipe.image.base64) {
        await tx.images.create({
          data: {
            base64: recipe.image.base64,
            recipeId: newRecipe.id,
            timestamp,
          },
        });
      }

      if (recipe.ingredients.length > 0) {
        await tx.ingredients.createMany({
          data: recipe.ingredients.map((ingredient) => ({
            amount: ingredient.amount,
            name: ingredient.name,
            unitId: ingredient.unitId,
            recipeId: newRecipe.id,
            timestamp,
          })),
        });
      }

      if (recipe.steps.length > 0) {
        await tx.steps.createMany({
          data: recipe.steps.map((step) => ({
            text: step.text,
            order: step.order,
            recipeId: newRecipe.id,
            timestamp,
          })),
        });
      }

      return newRecipe;
    });
  }

  update(
    recipe: UpdateRecipe & {
      ingredients: UpdateIngredient[];
      steps: UpdateStep[];
      image: UpdateImage;
    }
  ) {
    const timestamp = new Date();

    return this.prisma.$transaction(async (tx) => {
      const newRecipe = await this.prisma.recipes.update({
        where: {
          id: recipe.id,
        },
        data: {
          name: recipe.name,
          categoryId: recipe.categoryId,
        },
      });

      if (recipe.image.id) {
        await tx.images.update({
          where: {
            id: recipe.image.id,
          },
          data: {
            base64: recipe.image.base64,
            timestamp: new Date(),
          },
        });
      }

      if (recipe.ingredients.length > 0) {
        await tx.ingredients.updateMany({
          where: {
            id: {
              in: recipe.ingredients.map((ingredient) => ingredient.id),
            },
          },
          data: recipe.ingredients.map((ingredient) => ({
            amount: ingredient.amount,
            name: ingredient.name,
            unitId: ingredient.unitId,
            timestamp,
          })),
        });
      }

      if (recipe.steps.length > 0) {
        await tx.steps.updateMany({
          where: {
            id: {
              in: recipe.steps.map((step) => step.id),
            },
          },
          data: recipe.steps.map((step) => ({
            text: step.text,
            order: step.order,
            timestamp,
          })),
        });
      }

      return newRecipe;
    });
  }
}
