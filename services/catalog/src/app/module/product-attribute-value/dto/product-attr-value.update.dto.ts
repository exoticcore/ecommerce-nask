import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductAttrValueDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  more?: string;
}
