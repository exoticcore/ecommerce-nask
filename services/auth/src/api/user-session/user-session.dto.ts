import {
  IsBoolean,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { User } from '../../database/user.entity';
import { UUID } from 'crypto';

export class CreateUserSessionDTO {
  @IsOptional()
  @IsString()
  ip?: string;

  @IsUUID()
  refreshToken: UUID;

  @IsObject()
  user: User;

  @IsOptional()
  @IsBoolean()
  revoked?: boolean;

  @IsOptional()
  @IsString()
  device?: string;

  @IsOptional()
  @IsString()
  timezone: string;

  @IsOptional()
  @IsDate()
  activeAt: Date;
}
