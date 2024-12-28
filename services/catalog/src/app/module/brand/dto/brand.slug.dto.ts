import { IsNotEmpty, IsString } from 'class-validator';

export class BrandSlugDto {
  @IsString()
  @IsNotEmpty()
  public slug: string;
}
