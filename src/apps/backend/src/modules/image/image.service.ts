import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  findManyByRecipeId(recipeId: number) {
    return this.prisma.images.findMany({
      where: {
        recipeId,
      },
    });
  }
}
