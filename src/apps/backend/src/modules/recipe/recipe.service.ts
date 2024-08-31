import { Injectable } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

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
    return this.prisma.recipes.findMany();
  }

  findUnique(id: number) {
    return this.prisma.recipes.findUnique({ where: { id } });
  }
}
