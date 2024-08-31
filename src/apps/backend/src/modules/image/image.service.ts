import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  findMany() {
    return this.prisma.images.findMany();
  }

  findManyByRecipeId(recipeId: number) {
    return this.prisma.images.findMany({
      where: {
        recipeId,
      },
    });
  }
}
