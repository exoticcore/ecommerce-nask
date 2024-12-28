import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
  ACCESS_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_TIME,
} from '../config/constant.config';
import { UUID } from 'crypto';
import { User } from '../database/user.entity';
import { Employee } from '../api/emp/emp.entity';

export interface refreshToken {
  email: string;
  jti: UUID;
}

export interface accessToken {
  email: string;
  roles: string[];
  image_url?: string | null;
  createdAt: Date;
}

export default class JwtToken {
  private readonly key: crypto.CipherKey;
  private readonly encryptIV: crypto.BinaryLike;
  private readonly encryption_method: string;

  constructor() {
    this.encryption_method = <string>process.env.JWT_ENCRYPT_METHOD;
    this.key = crypto
      .createHash('sha512')
      .update(<string>process.env.JWT_KEY_SECRET)
      .digest('hex')
      .substring(0, 32);
    this.encryptIV = crypto
      .createHash('sha512')
      .update(<string>process.env.JWT_IV_SECRET)
      .digest('hex')
      .substring(0, 16);
  }

  public generateRefreshToken(user: User) {
    const jti = crypto.randomUUID();

    const refreshToken = jwt.sign(
      { email: user.person.email },
      <string>JWT_REFRESH_SECRET,
      {
        expiresIn: REFRESH_TIME,
        jwtid: jti,
      }
    );
    return { refreshToken: this.encryptToken(refreshToken), jti };
  }

  public generateAccessToken(
    user: User,
    roles?: string[],
    image_url?: string | null
  ) {
    const firstName = user.person.firstName || '';
    const lastName = user.person.lastName || '';
    const givenName = firstName + ' ' + lastName;

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.person.email,
        roles: roles || ['user'],
        first_name: firstName,
        last_name: lastName,
        given_name: givenName,
        image_url: image_url || null,
      },
      <string>process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: ACCESS_TIME,
      }
    );

    return this.encryptToken(accessToken);
  }

  public verifyRefreshToken(encryptedToken: string) {
    const token = this.decryptToken(encryptedToken);

    const refreshToken = this.verifyJwt(token, <string>JWT_REFRESH_SECRET);

    return refreshToken;
  }

  public verifyAccessToken(encryptToken: string) {
    const token = this.decryptToken(encryptToken);

    const accessToken = this.verifyJwt(token, <string>JWT_ACCESS_SECRET);

    return accessToken;
  }

  private verifyJwt(token: string, secret: string) {
    let error: string | undefined | null;
    let tokenInfo: any;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        error = err.message;
      } else {
        tokenInfo = decoded;
      }
    });

    return { error, tokenInfo };
  }

  private encryptToken(token: string): string {
    const cipher = crypto.createCipheriv(
      this.encryption_method,
      this.key,
      this.encryptIV
    );
    return Buffer.from(
      cipher.update(token, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64');
  }

  private decryptToken(data: string): string {
    const buff = Buffer.from(data, 'base64');
    const decipher = crypto.createDecipheriv(
      this.encryption_method,
      this.key,
      this.encryptIV
    );
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    );
  }
}
