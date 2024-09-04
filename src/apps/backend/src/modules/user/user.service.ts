import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { compare, genSalt, hash } from "bcrypt";

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  saltRounds = Number(process.env["BCRYPT_SALT_ROUNDS"]);

  async hashPassword(password: string) {
    if (isNaN(this.saltRounds))
      throw new InternalServerErrorException("salt rounds needs to be a number");

    const salt = await genSalt(this.saltRounds);

    return hash(password, salt);
  }

  verifyPassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  findByToken(token: string) {
    return this.prisma.user.findUnique({
      where: {
        token,
      },
    });
  }

  create(username: string, password: string, token: string) {
    return this.prisma.user.create({
      data: {
        username,
        password,
        token,
        timestamp: new Date(),
      },
    });
  }
}
