import { UUID } from 'crypto';

export interface AcessToken {}
export interface RefreshToken {
  sub: UUID;
  jti: UUID;
}
