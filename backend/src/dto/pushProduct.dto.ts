import { IsNotEmpty, IsNumber } from "class-validator";

export default class PushProductDto {
    @IsNotEmpty()
    @IsNumber()
    itemId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
