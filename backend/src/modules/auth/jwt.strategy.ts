import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? "your_jwt_secret" // Ensure this matches your JWT config
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userService.findByRut(payload.sub); // Fetch user by ID
    if (!user) {
      throw new UnauthorizedException("Invalid token");
    }
    return user; // Attach user to the request
  }
}
