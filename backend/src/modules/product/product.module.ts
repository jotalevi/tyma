import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { EmailModule } from "modules/email/email.module";
import { Product } from "./product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), EmailModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
