import { IsOptional, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image_url?: string;
}
