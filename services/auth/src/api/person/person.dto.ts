import { IsEmail, isNotEmpty } from 'class-validator';

export class EmailCheckDTO {
  @IsEmail()
  email: string;
}

export class CreatePerosonDTO {
  @IsEmail()
  email: string;
}
