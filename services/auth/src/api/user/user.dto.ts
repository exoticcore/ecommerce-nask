import {
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Person } from '../person/person.entity';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  public password?: string;

  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  public blocked?: boolean;

  @IsObject()
  public person: Person;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  public password?: string;

  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  public blocked?: boolean;

  @IsObject()
  public person: Person;
}
