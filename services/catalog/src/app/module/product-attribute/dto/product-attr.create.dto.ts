import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Translate } from '../../../../interface/translate.enum';
import { Type } from 'class-transformer';
import { AttributeType } from '../../../../interface/attribute-type.enum';

class ProductAttributeValue {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  more?: string;
}

class TranslateAttribute {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Translate)
  locale: Translate;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}

export class CreateProductAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(AttributeType)
  type?: AttributeType;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslateAttribute)
  translate: TranslateAttribute[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributeValue)
  product_attr_value?: ProductAttributeValue[];
}
