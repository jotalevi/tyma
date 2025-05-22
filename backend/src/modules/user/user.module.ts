import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { EmailModule } from "modules/email/email.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
