import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductAttrValueDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  more?: string;

  @IsNumber()
  @IsNotEmpty()
  product_attr_id: number;
}
