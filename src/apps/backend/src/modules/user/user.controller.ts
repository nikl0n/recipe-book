import { Body, ConflictException, Controller, Post, UnauthorizedException } from "@nestjs/common";

import { randomBytes } from "node:crypto";

import { UserService } from "./user.service";

export type ReadUser = { name: string; token: string };
type CreateUser = Omit<ReadUser, "token"> & { password: string };

@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  async login(@Body() body: CreateUser) {
    const user = await this.userService.findByName(body.name);
    if (!user) throw new UnauthorizedException(`wrong username or password`); // to avoid targeted attacks

    const isPasswordValid = await this.userService.verifyPassword(body.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("wrong username or password"); // to avoid targeted attacks

    return { name: user.name, token: user.token } as ReadUser;
  }

  @Post("/register")
  async register(@Body() body: CreateUser) {
    const user = await this.userService.findByName(body.name);
    if (user) throw new ConflictException(`username already exists`);

    const hashedPassword = await this.userService.hashPassword(body.password);
    const token = randomBytes(128).toString("hex");

    const newUser = await this.userService.create(body.name, hashedPassword, token);

    return { name: newUser.name, token: newUser.token } as ReadUser;
  }
}
