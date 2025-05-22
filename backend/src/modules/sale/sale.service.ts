import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sale } from "./sale.entity";
import { SaleItem } from "./saleItem.entity";
import PushProductDto from "dto/pushProduct.dto";
import { User } from "modules/user/user.entity";
import { Product } from "modules/product/product.entity";
import { SaleStatus } from "./salestatus.enum";
import { WebpayPlus } from 'transbank-sdk';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createSale(dto: PushProductDto, user?: User): Promise<Sale> {
    const sale = this.saleRepository.create()

    const product = await this.productRepository.findOne({
      where: {
        id: dto.itemId
      }
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let saleItem = this.saleItemRepository.create({
      product: product,
      quantity: dto.quantity,
      priceAtPurchase: product.price
    });

    saleItem = await this.saleItemRepository.save(saleItem);

    sale.items = [saleItem];
    sale.total = dto.quantity * product.price;
    sale.user = user;
    sale.status = SaleStatus.ON_CART;
    
    return this.saleRepository.save(sale);
  }

  async pushProduct(saleId: number, dto: PushProductDto, user?: User): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: {
        id: saleId
      },
      relations: ["items", "items.product"]
    });
    
    if (!sale) {
      throw new Error("Sale not found");
    }

    let saleItem = sale.items.find((item) => {
      return item.product.id === dto.itemId
    });

    if (!saleItem) {
      const product = await this.productRepository.findOne({
        where: {
          id: dto.itemId
        }
      });

      if (!product) {
        throw new Error("Product not found");
      }

      saleItem = this.saleItemRepository.create({
        product: product,
        quantity: dto.quantity,
        priceAtPurchase: product.price
      });

      sale.items.push(saleItem);
    } else {
      saleItem.quantity = dto.quantity;
    }

    sale.total = sale.items.reduce((total, item) => total + (item.priceAtPurchase * item.quantity), 0);
    sale.user = user;
    sale.status = SaleStatus.ON_CART;
    return this.saleRepository.save(sale);
  }

  async getAllSales(user?: User): Promise<Sale[]> {
    return this.saleRepository.find({
      where: user ?  {
        user: user
      } : {},
      relations: ["items", "items.product"]
    });
  }

  async getSale(saleId: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: {
        id: saleId
      },
      relations: ["items", "items.product"]
    });

    if (!sale) {
      throw new Error("Sale not found");
    }

    return sale;
  }

  async getTransbank(saleId: number): Promise<any> {
    
    const sale = await this.saleRepository.findOne({
      where: {
        id: saleId
      },
    });
    
    if (!sale) {
      throw new Error("Sale not found");
    }
    
    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
    const response = await tx.create(sale.id.toString(), sale.id.toString(), sale.total, 'http://localhost:3010/sale/callback/' + sale.id.toString());

    sale.status = SaleStatus.WAITING_PAYMENT;
    await this.saleRepository.save(sale);

    return response;
  }

  async getCallback(saleId: number, token: string): Promise<any> {
    const sale = await this.saleRepository.findOne({
      where: {
        id: saleId
      }
    });

    if (!sale) {
      throw new Error("Sale not found");
    }

    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
    const response = await tx.commit(token);

    if (response.status === 'AUTHORIZED') {
      sale.status = SaleStatus.PAID;
    } else {
      sale.status = SaleStatus.ON_CART;
    }

    return response;
  }
}