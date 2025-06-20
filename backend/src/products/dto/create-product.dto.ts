import { IsString, IsInt, IsOptional, IsNumber, IsNotEmpty, Min, Max, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsInt()
    @IsPositive()
    CategoryId: number;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    weight: number;

    @IsNumber()
    @IsPositive()
    width: number;

    @IsNumber()
    @IsPositive()
    length: number;

    @IsNumber()
    @IsPositive()
    height: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @IsPositive()
    price: number;
}
