import { Injectable } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

@Injectable()
export class UnitService {
  prisma = new PrismaClient();

  findMany() {
    return this.prisma.units.findMany();
  }
}
