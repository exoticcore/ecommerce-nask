import { describe, it, beforeEach, jest, expect } from '@jest/globals';
import httpMock from 'node-mocks-http';
import AuthController from '../../../../src/api/auth/auth.controller';
import AuthService from '../../../../src/api/auth/auth.service';
import geoip from 'geoip-lite';

describe('Auth Controller Unit Test', () => {
  let authController: AuthController;
  let req = httpMock.createRequest();
  let res = httpMock.createResponse();
  const email = 'user@email.com';

  beforeEach(() => {
    authController = new AuthController();
    res = httpMock.createResponse();
  });

  describe('Active Email Controller', () => {
    beforeEach(() => {
      req = httpMock.createRequest({ body: { email } });
    });
    it('should return http status code 200 with jsonbody isActive and email', async () => {
      const expectResult = { isActive: true, email };
      const authServiceMock = jest
        .spyOn(AuthService.prototype, 'activeEmail')
        .mockImplementation(async () => {
          return { sentEmail: true };
        });

      await authController.activeEmail(req, res);

      expect(authServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(200);
      expect(res._getJSONData().email).toEqual(email);
      expect(res._getJSONData()).toEqual(expectResult);
    });

    it('should return http status code 201 with jsonbody isActive, email, countdown, limit', async () => {
      const expectResult = { isActive: false, email, countdown: 15, count: 1 };
      const authServiceMock = jest
        .spyOn(AuthService.prototype, 'activeEmail')
        .mockImplementation(async () => {
          return { sentEmail: true, count: 1 };
        });
      await authController.activeEmail(req, res);

      expect(authServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(201);
      expect(res._getJSONData()).toEqual(expectResult);
    });

    it('should return http status code 405 with jsonbody message', async () => {
      const expectResult = { message: 'method not allowed' };
      const authServiceMock = jest
        .spyOn(AuthService.prototype, 'activeEmail')
        .mockImplementation(async () => {
          return { sentEmail: false, count: 6 };
        });

      await authController.activeEmail(req, res);

      expect(authServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(405);
      expect(res._getJSONData()).toEqual(expectResult);
    });

    it('should return http status code 403 with message', async () => {
      const expectResult = { message: 'forbidden' };
      const authServiceMock = jest
        .spyOn(AuthService.prototype, 'activeEmail')
        .mockImplementation(async () => {
          return { sentEmail: false, blocked: true };
        });

      await authController.activeEmail(req, res);

      expect(authServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(403);
      expect(res._getJSONData()).toEqual(expectResult);
    });

    it('should return http status code 500 with jsonbody message', async () => {
      const expectResult = { message: 'internal server error' };
      const authServiceMock = jest
        .spyOn(AuthService.prototype, 'activeEmail')
        .mockRejectedValue(null);

      await authController.activeEmail(req, res);

      expect(authServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(500);
      expect(res._getJSONData()).toEqual(expectResult);
    });
  });

  describe('Verify Controller', () => {
    it('should response 200 with json', async () => {
      req = httpMock.createRequest({
        params: { token: '1234' },
        ip: '127.0.0.1',
        session: {
          refreshToken: 'eiei',
        },
      });

      const geoipMock = jest
        .spyOn(geoip, 'lookup')
        .mockImplementation(() => null);

      const verifyMock = jest
        .spyOn(AuthService.prototype, 'verify')
        .mockImplementation(async () => {
          return {
            accessToken: 'accessToken',
            refreshToken: 'randomJwtToken',
            dvid: 'deviceID',
          };
        });

      await authController.verify(req, res);

      expect(verifyMock).toBeCalledTimes(1);
      expect(geoipMock).toBeCalledTimes(1);
      expect(res._getJSONData()).toHaveProperty('accessToken');
      expect(res._getJSONData().accessToken).toEqual('accessToken');
      expect(res.statusCode).toEqual(201);
    });
  });

  /*
  
  -------------- Access Token Controller -----------------

  */
  describe('Access Token Controller', () => {
    it('should response 201 with access token', async () => {
      req = httpMock.createRequest();
      res = httpMock.createResponse({
        locals: { token: { email: 'example@mail.com', jti: 'uuid' } },
      });

      const accessTokenServiceMock = jest
        .spyOn(AuthService.prototype, 'accessToken')
        .mockImplementation(async () => {
          return { accessToken: 'newAccessToken' };
        });

      await authController.accessToken(req, res);

      expect(accessTokenServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(201);
      expect(res._getJSONData()).toHaveProperty('accessToken');
    });
  });

  /*
  
  -------------- Refresh Token Controller -----------------

  */
  describe('Refresh Token Controller', () => {
    it('should response 201 with new refresh token', async () => {
      const refreshTokenServiceMock = jest
        .spyOn(AuthService.prototype, 'refreshToken')
        .mockImplementation(async () => {
          return { refreshToken: 'new refresh token' };
        });

      await authController.refreshToken(req, res);

      expect(refreshTokenServiceMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(201);
      expect(res._getJSONData()).toHaveProperty('refreshToken');
    });
  });

  /*
  
  -------------- Set Password Controller -----------------

  */
  describe('Set Password Controller', () => {
    it('should return 200', async () => {
      req = httpMock.createRequest({
        body: { password: 'secret', confirmPassword: 'secret' },
      });

      res = httpMock.createResponse({
        locals: { user: { email: 'test@email.com' } },
      });

      const setPasswordMock = jest
        .spyOn(AuthService.prototype, 'setPassword')
        .mockImplementation(async () => {
          return true;
        });

      await authController.setPassword(req, res);

      expect(setPasswordMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(201);
    });
  });

  /*
  
  -------------- Set Password Controller -----------------

  */
  describe('Login Controller', () => {
    beforeEach(() => {
      req = httpMock.createRequest({
        body: { email: 'user@email.com', password: '1234' },
      });
    });

    it('should response 401 with message', async () => {
      const expectResult = { message: 'unauthorized' };

      const loginAuthMock = jest
        .spyOn(AuthService.prototype, 'login')
        .mockImplementation(async () => {
          return null;
        });

      await authController.login(req, res);

      expect(loginAuthMock).toBeCalledTimes(1);
      expect(res.statusCode).toEqual(401);
      expect(res._getJSONData()).toEqual(expectResult);
    });

    it('should response 401 with message', async () => {
      const expectResult = { message: 'unauthorized' };
    });
  });
});
