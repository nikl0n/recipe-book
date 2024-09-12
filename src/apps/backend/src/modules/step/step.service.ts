import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class StepService {
  prisma = new PrismaClient();

  findManyByRecipeId(recipeId: number) {
    return this.prisma.step.findMany({
      where: {
        recipeId,
      },
      orderBy: {
        order: "asc",
      },
    });
  }
}
