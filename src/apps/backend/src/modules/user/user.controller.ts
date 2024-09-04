import { Body, ConflictException, Controller, Post, UnauthorizedException } from "@nestjs/common";

import { randomBytes } from "node:crypto";

import { UserService } from "./user.service";

type ReadUser = { id: number; username: string; token: string };
type CreateUser = Omit<ReadUser, "id" | "token"> & { password: string };

@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  async login(@Body() body: CreateUser) {
    const user = await this.userService.findByUsername(body.username);
    if (!user) throw new UnauthorizedException(`wrong username or password`); // to avoid targeted attacks

    const isPasswordValid = await this.userService.verifyPassword(body.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("wrong username or password"); // to avoid targeted attacks

    return { id: user.id, username: user.username, token: user.token } as ReadUser;
  }

  @Post("/register")
  async register(@Body() body: CreateUser) {
    const user = await this.userService.findByUsername(body.username);
    if (user) throw new ConflictException(`username already exists`);

    const hashedPassword = await this.userService.hashPassword(body.password);
    const token = randomBytes(128).toString("hex");

    const newUser = await this.userService.create(body.username, hashedPassword, token);

    return { id: newUser.id, username: newUser.username, token: newUser.token } as ReadUser;
  }
}
