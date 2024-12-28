import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductAttributeDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type?: string;
}
