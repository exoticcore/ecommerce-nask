import { UUID } from 'crypto';
import { User } from '../../database/user.entity';

export interface CreateUserSession {
  refreshToken: string | UUID;
  device: string | UUID;
  ip?: string | null;
  userAgent?: string | null;
  timezone?: string | null;
  activeAt?: Date | null;
  user: User;
}
