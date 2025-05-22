import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { User } from "../user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailModule } from "modules/email/email.module";

@Module({
  imports: [
    UserModule,
    PassportModule,
    EmailModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "your_jwt_secret", // Replace with a secure environment variable
      signOptions: { expiresIn: "1h" }
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
