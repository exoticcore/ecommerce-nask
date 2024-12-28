import { describe, it, jest, beforeEach, expect } from '@jest/globals';
import crypto from 'crypto';
import JwtToken from '../../../src/utils/jwt-token';
import jwt from 'jsonwebtoken';
import { User } from '../../../src/api/user/user.entity';

describe('JWT Token Unit Testing', () => {
  let jwtToken: JwtToken;
  const personInfo = {
    id: 1,
    email: 'user@email.com',
    firstName: 'test',
    lastName: 'test',
    phone: null,
    picture: null,
    createdAt: new Date(Date.now()),
  };
  const userInfo = {
    id: '1234',
    password: 'hash',
    isVerified: true,
    blocked: false,
    person: personInfo,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
  beforeEach(async () => {
    jwtToken = new JwtToken();
  });
  describe('Generate refresh token', () => {
    it('should return string', async () => {
      const encryptTokenMock = jest
        .spyOn(JwtToken.prototype as any, 'encryptToken')
        .mockImplementation(() => 'encrypted_token');

      const refreshToken = jwtToken.generateRefreshToken(userInfo);

      expect(encryptTokenMock).toBeCalledTimes(1);
      expect(refreshToken).toHaveProperty('refreshToken');
      expect(refreshToken).toHaveProperty('jti');
    });
  });

  describe('Generate access token', () => {
    it('should return string', async () => {
      const encryptTokenMock = jest
        .spyOn(JwtToken.prototype as any, 'encryptToken')
        .mockImplementation(() => 'encrypted_token');

      const accessToken = jwtToken.generateAccessToken(userInfo);

      expect(encryptTokenMock).toBeCalledTimes(1);
      expect(typeof accessToken).toEqual('string');
      expect(accessToken).toEqual('encrypted_token');
    });
  });

  describe('Verify refresh token', () => {
    it('should return data', async () => {
      const decryptTokenMock = jest
        .spyOn(JwtToken.prototype as any, 'decryptToken')
        .mockImplementation(() => 'decrypted_token');

      const verifyJwtMock = jest
        .spyOn(JwtToken.prototype as any, 'verifyJwt')
        .mockImplementation(() => {
          return { error: undefined, tokenInfo: { email: 'example@test.com' } };
        });

      const verifyToken = jwtToken.verifyRefreshToken('my_token');

      expect(decryptTokenMock).toBeCalledTimes(1);
      expect(verifyJwtMock).toBeCalledTimes(1);
      expect(verifyToken).toEqual({
        error: undefined,
        tokenInfo: { email: 'example@test.com' },
      });
    });
  });

  describe('Verify access token', () => {
    it('should return data', async () => {
      const decryptTokenMock = jest
        .spyOn(JwtToken.prototype as any, 'decryptToken')
        .mockImplementation(() => 'decrypted_token');

      const verifyJwtMock = jest
        .spyOn(JwtToken.prototype as any, 'verifyJwt')
        .mockImplementation(() => {
          return {
            error: undefined,
            tokenInfo: { id: '1234', email: 'example@test.com' },
          };
        });

      const verifyToken = jwtToken.verifyAccessToken('encrypted_token');

      expect(decryptTokenMock).toBeCalledTimes(1);
      expect(verifyJwtMock).toBeCalledTimes(1);
      expect(verifyToken).toEqual({
        error: undefined,
        tokenInfo: { id: '1234', email: 'example@test.com' },
      });
    });
  });
});
