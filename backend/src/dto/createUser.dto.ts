import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export default class CreateUserDto {
  @IsNotEmpty()
  rut: number;

  @IsNotEmpty()
  dv: string;

  @IsNotEmpty()
  names: string;

  @IsNotEmpty()
  surnames: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password: string;
}
