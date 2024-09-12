import { Injectable } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

@Injectable()
export class CategoryService {
  prisma = new PrismaClient();

  findMany() {
    return this.prisma.category.findMany();
  }
}
