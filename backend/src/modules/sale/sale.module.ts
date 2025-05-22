import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";
import { EmailModule } from "modules/email/email.module";
import { Sale } from "./sale.entity";
import { SaleItem } from "./saleItem.entity";
import { Product } from "modules/product/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem, Product]), EmailModule],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService]
})
export class SaleModule {}
