import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccessTypeDto {
  @IsNotEmpty()
  @IsString()
  public title: string;
}
