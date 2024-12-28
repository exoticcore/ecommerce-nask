import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  isNotEmpty,
} from 'class-validator';
import { UUID } from 'crypto';

export class ActiveEmailDTO {
  @IsEmail()
  email: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}

export class VerifyDTO {
  @IsString()
  token: string;

  @IsOptional()
  device?: string | null;

  @IsOptional()
  ip?: string | null;

  @IsOptional()
  userAgent?: string | null;

  @IsOptional()
  timezone?: string | null;
}

export class RefreshTokenDTO {
  @IsUUID()
  jti: UUID;
}

export class SetPasswordDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
