import { Injectable } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

import { CreateImage } from "../image/image.controller";
import { CreateIngredient } from "../ingredient/ingredient.controller";
import { CreateStep } from "../step/step.controller";
import { CreateRecipe } from "./recipe.controller";

@Injectable()
export class RecipeService {
  prisma = new PrismaClient();

  findById(id: number) {
    return this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });
  }

  findMany() {
    return this.prisma.recipe.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  findUnique(id: number) {
    return this.prisma.recipe.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.recipe.delete({ where: { id } });
  }

  create(
    recipe: CreateRecipe & {
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    },
    userName: string
  ) {
    const timestamp = new Date();

    return this.prisma.$transaction(async (tx) => {
      const newRecipe = await tx.recipe.create({
        data: {
          name: recipe.name,
          userName,
          categoryId: recipe.categoryId,
          timestamp,
        },
      });

      if (recipe.image.base64) {
        await tx.image.create({
          data: {
            base64: recipe.image.base64,
            recipeId: newRecipe.id,
            timestamp,
          },
        });
      }

      if (recipe.ingredients.length > 0) {
        await tx.ingredient.createMany({
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
        await tx.step.createMany({
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
    recipe: CreateRecipe & {
      id: number;
      ingredients: CreateIngredient[];
      steps: CreateStep[];
      image: CreateImage;
    }
  ) {
    const timestamp = new Date();

    return this.prisma.$transaction(async (tx) => {
      const newRecipe = await this.prisma.recipe.update({
        where: {
          id: recipe.id,
        },
        data: {
          name: recipe.name,
          categoryId: recipe.categoryId,
        },
      });

      await tx.image.deleteMany({
        where: {
          recipeId: recipe.id,
        },
      });

      await tx.ingredient.deleteMany({
        where: {
          recipeId: recipe.id,
        },
      });

      await tx.step.deleteMany({
        where: {
          recipeId: recipe.id,
        },
      });
      if (recipe.image) {
        await tx.image.create({
          data: {
            recipeId: recipe.id,
            base64: recipe.image.base64,
            timestamp,
          },
        });
      }

      if (recipe.ingredients.length > 0) {
        await tx.ingredient.createMany({
          data: recipe.ingredients.map((ingredient) => ({
            recipeId: recipe.id,
            unitId: ingredient.unitId,
            amount: ingredient.amount,
            name: ingredient.name,
            timestamp,
          })),
        });
      }

      if (recipe.steps.length > 0) {
        await tx.step.createMany({
          data: recipe.steps.map((step) => ({
            recipeId: recipe.id,
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
