import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Translate } from '../../../../interface/translate.enum';

class SubCatAttr {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  subcat_slug?: string | null;
}

class TranslateSubcatAttr {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Translate)
  locale: Translate;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateSubCatAttrDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => SubCatAttr)
  subcat_attr: SubCatAttr;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslateSubcatAttr)
  translate: TranslateSubcatAttr[];
}
