import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
}
