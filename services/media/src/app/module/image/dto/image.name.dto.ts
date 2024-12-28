import { IsNotEmpty, IsString } from 'class-validator';

export class ImageNameDto {
  @IsString()
  @IsNotEmpty()
  public image_name: string;

  @IsString()
  @IsNotEmpty()
  public file_type: string;
}
