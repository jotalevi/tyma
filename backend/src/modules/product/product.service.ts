import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import CreateProductDto from "dto/createProduct.dto";
import UpdateProductDto from "dto/updateProduct.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
      const product = this.productRepository.create();

      product.name = dto.name;
      product.description = dto.description;
      product.price = dto.price;
      product.stock = dto.stock;
      product.imageB64 = dto.imageB64;
      product.category = dto.category;
      product.isAvailable = dto.isAvailable;

      return this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: { isAvailable: true },
      order: { name: "ASC" },
    });
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new NotFoundException("Product not found");

    Object.assign(product, dto);

    return this.productRepository.save(product);
  }
}