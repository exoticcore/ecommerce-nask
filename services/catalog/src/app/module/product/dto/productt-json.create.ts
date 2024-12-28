import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum Translate {
  th = 'th',
  en = 'en',
}

class Product {
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
  @IsNumber({ maxDecimalPlaces: 2 })
  discount?: number | null;

  @IsOptional()
  @IsString()
  image_url?: string | null;
}

class TranslateProduct {
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

class RelationRef {
  @IsNotEmpty()
  @IsString()
  subcat_attr_slug: string;

  @IsOptional()
  @IsString()
  brand_slug: string;
}

class SkuProduct {
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNumber()
  stock?: number | null;

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

class ProductAttributeTranslate {
  @IsString()
  @IsNotEmpty()
  locale: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class ProductAttribute {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributeTranslate)
  translate: ProductAttributeTranslate[];
}

class ProductSelection {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ProductAttribute)
  attr: ProductAttribute;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  value: string[];
}

class ProductOption {
  @IsNotEmpty()
  @IsNumber()
  p_index: number;
}

class Selection {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductSelection)
  product_selection: ProductSelection[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductOption)
  product_option: ProductOption[];
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
  sku: SkuProduct[];

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Selection)
  selection?: Selection;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  media?: string[] | null;
}
