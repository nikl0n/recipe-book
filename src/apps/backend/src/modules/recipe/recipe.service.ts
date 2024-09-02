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
}
