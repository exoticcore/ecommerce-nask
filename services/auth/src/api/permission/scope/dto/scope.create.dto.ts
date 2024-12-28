import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScopeDto {
  @IsNotEmpty()
  @IsString()
  public title: string;
}
