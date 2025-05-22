import { Controller, Get, Post, Put, Param, Body, Req, UnauthorizedException } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Public } from "../auth/public.decorator";
import { User } from "modules/user/user.entity";
import CreateProductDto from "dto/createProduct.dto";
import UpdateProductDto from "dto/updateProduct.dto";
import { Product } from "./product.entity";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateProductDto): Promise<Product> {
    const user = req.user as User;

    if (!user) throw new UnauthorizedException("Must be logged in");
    if (!(user.role === "superadmin") && !(user.role === "admin")) throw new UnauthorizedException("Must be an admin");
    
    return this.productService.create(dto);
  }

  @Get()
  @Public()
  async get(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(":id")
  @Public()
  async getById(@Param("id") id: number): Promise<Product> {
    return await this.productService.getById(id);
  }

  @Put(":id")
  async update(@Req() req, @Param("id") id: number, @Body() data: UpdateProductDto): Promise<Product> {
    console.log("Update product", id, data);

    const user = req.user as User;

    if (!user) throw new UnauthorizedException("Must be logged in");
    if (!(user.role === "superadmin") && !(user.role === "admin")) throw new UnauthorizedException("Must be an admin");

    return this.productService.update(id, data);
  }
}
