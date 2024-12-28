import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Translate } from '../../../../interface/translate.enum';

class Product {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  s_price?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  discount?: number | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image_url?: string | null;
}

class TranslateProduct {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Translate)
  locale: Translate;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  information?: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string | null;
}

class RelationRef {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  subcat_attr_slug: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brand_slug: string;
}

// class Sku {
//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   sku: string;

//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   stock?: number | null;

//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber({ maxDecimalPlaces: 2 })
//   price?: number | null;

//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber({ maxDecimalPlaces: 2 })
//   discount?: number | null;

//   @IsOptional()
//   @IsNotEmpty()
//   @IsBoolean()
//   is_primary?: boolean | null;

//   @IsOptional()
//   @IsNotEmpty()
//   @IsBoolean()
//   is_active?: boolean | null;

//   @IsOptional()
//   @IsNotEmpty()
//   @IsString()
//   image_url?: string | null;
// }

// class SkuProduct {
//   @IsOptional()
//   @IsObject()
//   @IsNotEmpty()
//   @ValidateNested({ each: true })
//   @Type(() => Sku)
//   sku?: Sku;

//   @IsOptional()
//   @IsArray()
//   @ArrayNotEmpty()
//   @IsNumber({}, { each: true })
//   attr_value_id: number[];

//   @IsString()
//   @IsNotEmpty()
//   sku_ref: string;
// }

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Product)
  product?: Product;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslateProduct)
  translate?: TranslateProduct[];

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => RelationRef)
  ref?: RelationRef;

  // @IsOptional()
  // @IsArray()
  // @ArrayNotEmpty()
  // @ValidateNested({ each: true })
  // @Type(() => SkuProduct)
  // options?: SkuProduct[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  media?: string[] | null;
}
