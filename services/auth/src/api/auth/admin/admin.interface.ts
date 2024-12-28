import { UUID } from 'crypto';

export interface IRefreshToken {
  jti: string | UUID;
  dvad: string | UUID;
}
