import { IsBoolean, IsNotEmpty } from "class-validator";
import { Transform } from 'class-transformer';

export default class UpdateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  imageB64: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true || value === 1 || value === '1') return true;
    if (value === 'false' || value === false || value === 0 || value === '0') return false;
    return value; // fallback for validation to catch
  })
  isAvailable: boolean;
}