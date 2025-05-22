import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { SaleService } from "./sale.service";
import PushProductDto from "dto/pushProduct.dto";

@Controller("sale")
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async createSale(@Req() req, @Body() dto: PushProductDto): Promise<any> {
    const user = req.user;

    return this.saleService.createSale(dto, user ?? null);
  }

  @Put(':saleId')
  async pushProduct(@Req() req, @Param() saleId: number, @Body() dto: PushProductDto): Promise<any> {
    const user = req.user;
    return this.saleService.pushProduct(saleId, dto, user ?? null);
  }

  @Get()
  async getAllSales(@Req() req): Promise<any> {
    const user = req.user;

    if (!user) throw new Error("Must be logged in to see sales");

    if (user.role === 'admin' || user.role === 'superadmin') {
      return this.saleService.getAllSales();
    }

    return this.saleService.getAllSales(user);
  }

  @Get(':saleId')
  async getSale(@Param() saleId: number): Promise<any> {
    return this.saleService.getSale(saleId);
  }

  @Get('transbank/:saleId')
  async getTransbank(@Param() saleId: number): Promise<any> {
    return this.saleService.getTransbank(saleId);
  }
  
  @Get('callback/:saleId')
  async getCallback(@Param() saleId: number, @Req() req): Promise<any> {
    console.log("Callback:", req);
    return this.saleService.getCallback(saleId, "aaa");
  }
}
