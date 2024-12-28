import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccessTypeDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  public serviceId: number;
}
