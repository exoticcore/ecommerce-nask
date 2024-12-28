import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  public title: string;
}
