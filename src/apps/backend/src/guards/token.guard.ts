import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { UserService } from "../modules/user/user.service";

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["x-access-token"];

    if (!token) throw new UnauthorizedException("no token found");

    const user = await this.userService.findByToken(token);
    if (!user) throw new UnauthorizedException("invalid token");

    request.user = user;

    return true;
  }
}
