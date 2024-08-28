import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class IngredientService {
  prisma = new PrismaClient();

  findManyByRecipeId(recipeId: number) {
    return this.prisma.ingredients.findMany({
      where: {
        recipeId,
      },
    });
  }
}
