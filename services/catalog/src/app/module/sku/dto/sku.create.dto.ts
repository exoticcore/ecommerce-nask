import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Sku {
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNumber()
  stock?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_stock?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discount?: number | null;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean | null;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean | null;

  @IsOptional()
  @IsString()
  image_url?: string | null;
}

export class CreateSkuDto {
  @IsString()
  @IsNotEmpty()
  product_slug: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  attr_value_id?: number[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Sku)
  sku: Sku;
}
