import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  detail?: string;
}
