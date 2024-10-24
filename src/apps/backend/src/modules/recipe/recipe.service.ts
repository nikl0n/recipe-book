import { Injectable } from "@nestjs/common";

import { CreateImage, CreateIngredient, CreateRecipe, CreateStep } from "@monorepo/types";

import { PrismaClient } from "@prisma/client";

import { ImageService } from "../image/image.service";

@Injectable()
export class RecipeService {
  prisma = new PrismaClient();

  constructor(private readonly imageService: ImageService) {}

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
        const { mimeType, content } = this.imageService.getBufferMimeTypeFromBase64String(
          recipe.image.base64
        );

        if (mimeType && content) {
          await tx.image.create({
            data: {
              content,
              mimeType,
              recipeId: newRecipe.id,
              timestamp,
            },
          });
        }
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

      if (recipe.image.base64) {
        const { mimeType, content } = this.imageService.getBufferMimeTypeFromBase64String(
          recipe.image.base64
        );

        if (mimeType && content) {
          await tx.image.deleteMany({
            where: {
              recipeId: recipe.id,
            },
          });

          await tx.image.create({
            data: {
              content,
              mimeType,
              recipeId: newRecipe.id,
              timestamp,
            },
          });
        }
      }

      if (recipe.ingredients.length > 0) {
        await tx.ingredient.deleteMany({
          where: {
            recipeId: recipe.id,
          },
        });

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
        await tx.step.deleteMany({
          where: {
            recipeId: recipe.id,
          },
        });

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
