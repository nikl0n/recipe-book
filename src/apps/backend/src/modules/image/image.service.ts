import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  findManyByRecipeId(recipeId: number) {
    return this.prisma.image.findMany({
      where: {
        recipeId,
      },
    });
  }

  async findFirstByRecipeIds(recipeIds: number[]) {
    return Promise.all(
      recipeIds.map(async (recipeId) =>
        this.prisma.image.findFirst({
          where: {
            recipeId,
          },
        })
      )
    );
  }
}
