import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Translate } from '../../../../interface/translate.enum';
import { Visibility } from '../../../../interface/visibility.enum';

export class Product {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  s_price?: number | null;

  @IsOptional()
  @IsDateString()
  s_price_start?: Date | null;

  @IsOptional()
  @IsDateString()
  s_price_end?: Date | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discount?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  publish_at?: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Visibility)
  visibility: Visibility;

  @IsOptional()
  @IsString()
  image_url?: string | null;
}

export class TranslateProduct {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Translate)
  locale: Translate;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  information?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}

export class RelationRef {
  @IsNotEmpty()
  @IsString()
  subcat_attr_slug: string;

  @IsOptional()
  @IsString()
  brand_slug?: string;
}

export class Sku {
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNumber()
  stock?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  is_stock?: boolean | null;

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

export class SkuProduct {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Sku)
  sku: Sku;

  @IsOptional()
  @IsArray()
  // @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  attr_value_id?: number[];
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Product)
  product: Product;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslateProduct)
  translate: TranslateProduct[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => RelationRef)
  ref: RelationRef;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SkuProduct)
  options: SkuProduct[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  media?: string[] | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tag: string[] | null;
}
