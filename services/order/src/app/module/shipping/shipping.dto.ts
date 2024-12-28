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

enum Translate {
  th = 'th',
  en = 'en',
}

class ShippingMethod {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  cost: number;

  @IsOptional()
  @IsString()
  image_url?: string | null;
}

class ShippingTranslateDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Translate)
  locale: Translate;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}

export class ShippingCreateDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ShippingMethod)
  shipping: ShippingMethod;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ShippingTranslateDto)
  translate: ShippingTranslateDto[];
}
