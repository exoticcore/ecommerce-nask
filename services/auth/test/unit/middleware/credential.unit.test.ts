import { describe, it, jest, beforeEach, expect } from '@jest/globals';
import httpMock from 'node-mocks-http';
import JwtToken from '../../../src/utils/jwt-token';
import { NextFunction } from 'express';
import CredentialMiddleware from '../../../src/middleware/credential.middleware';

describe('Credential Middleware Unit Testing', () => {
  let req = httpMock.createRequest();
  let res = httpMock.createResponse();
  const next = jest.fn() as unknown as NextFunction;
  const authMiddleware = new CredentialMiddleware();

  beforeEach(() => {
    req = httpMock.createRequest();
  });

  describe('Authentication middleware', () => {
    it('should passed away to next function', async () => {
      req = httpMock.createRequest({
        session: { refreshToken: 'encrypted refresh token' },
      });

      const verifyRefreshMock = jest
        .spyOn(JwtToken.prototype, 'verifyRefreshToken')
        .mockImplementation(() => {
          return { error: undefined, tokenInfo: { email: 'example@test.com' } };
        });

      await authMiddleware.authentication(req, res, next);

      expect(verifyRefreshMock).toBeCalledTimes(1);
      expect(res.locals.token).toEqual({ email: 'example@test.com' });
      expect(next).toBeCalledTimes(1);
    });

    it('should unauthorized', async () => {
      const verifyRefreshMock = jest
        .spyOn(JwtToken.prototype, 'verifyRefreshToken')
        .mockImplementation(() => {
          return { error: 'some error', tokenInfo: undefined };
        });

      await authMiddleware.authentication(req, res, next);

      expect(verifyRefreshMock).toBeCalledTimes(0);
      expect(next).toBeCalledTimes(0);
      expect(res.statusCode).toEqual(401);
      expect(res._getJSONData()).toEqual({ message: 'unauthorized' });
    });
  });

  describe('Authorization middleware', () => {
    const authorization = authMiddleware.authorization([
      'admin',
      'manager',
      'user',
    ]);

    const tokenInfo = {
      email: 'example@mail.com',
      givenName: '',
      firstName: '',
      verifiedAt: new Date(Date.now()),
      roles: ['user'],
    };
    it('should reponse 401', async () => {
      const verifyAccessMock = jest
        .spyOn(JwtToken.prototype, 'verifyAccessToken')
        .mockImplementation(() => {
          return { error: undefined, tokenInfo: '' };
        });

      await authorization(req, res, next);

      expect(verifyAccessMock).toBeCalledTimes(0);
      expect(next).toBeCalledTimes(0);
      expect(res.statusCode).toEqual(401);
    });
  });
});
