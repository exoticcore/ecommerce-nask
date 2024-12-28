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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  stock?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_stock?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  discount?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_primary?: boolean | null;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_active?: boolean | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image_url?: string | null;
}

export class UpdateSkuDto {
  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Sku)
  sku?: Sku;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  attr_value_id: number[];

  @IsString()
  @IsNotEmpty()
  sku_ref: string;
}
