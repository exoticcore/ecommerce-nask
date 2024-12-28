import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateScopeDto {
  @IsNotEmpty()
  @IsString()
  public title: string;
}
