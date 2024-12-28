import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  beforeAll,
} from '@jest/globals';
import AuthService from '../../../../src/api/auth/auth.service';
import PersonService from '../../../../src/api/person/person.service';
import { User } from '../../../../src/api/user/user.entity';
import { Person } from '../../../../src/api/person/person.entity';
import {
  LoginDTO,
  SetPasswordDTO,
  VerifyDTO,
} from '../../../../src/api/auth/auth.dto';
import argon2 from 'argon2';
import UserService from '../../../../src/api/user/user.service';
import SendMail from '../../../../src/utils/nodemailer';
import redis from '../../../../src/config/redis.config';
import { dataSource } from '../../../../src/config/typeorm.config';
import JwtToken from '../../../../src/utils/jwt-token';
import { UserSession } from '../../../../src/api/user-session/user-session.entity';
import UserSessionService from '../../../../src/api/user-session/user-session.service';

describe('Auth Service Unit Testing', () => {
  const authService = new AuthService();
  let personInfo: Person;
  let userInfo: User;
  let sessionInfo: UserSession;

  beforeEach(() => {
    personInfo = {
      id: 1,
      email: 'user@email.com',
      firstName: 'test',
      lastName: 'test',
      phone: null,
      picture: null,
      createdAt: new Date(Date.now()),
    };
    userInfo = {
      id: '1234',
      password: 'hash',
      isVerified: true,
      blocked: false,
      person: personInfo,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    sessionInfo = {
      id: 1,
      ip: '1234',
      revoked: false,
      device: null,
      userAgent: null,
      timezone: null,
      refreshToken: 'refreshTokenId',
      activeAt: new Date(Date.now() + 300000),
      createAt: new Date(Date.now()),
      user: userInfo,
    };
  });

  /* 
  ------------ Active Email Service ------------
  */
  describe('Active email service', () => {
    let redisGetData = {
      token: '1234',
      expriedAt: Date.now() + 15 * 60 * 1000,
      count: 0,
    };
    it('should send an email if email not found at person', async () => {
      const expectResult = { sentEmail: true, count: 1 };

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(null);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(null);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(async () => null);
      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(async () => true);

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(0);
      expect(sendMailMock).toBeCalledTimes(1);
      expect(redisGetMock).toBeCalledTimes(1);
      expect(redisSetMock).toBeCalledTimes(2);
      expect(activeEmailService).toEqual(expectResult);
    });

    it('should send an email if not foud user', async () => {
      const expectResult = { sentEmail: true, count: 1 };

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(null);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(async () => null);
      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(async () => true);

      const redisDelMock = jest
        .spyOn(redis, 'del')
        .mockImplementation(async () => {
          return 1;
        });

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(sendMailMock).toBeCalledTimes(1);
      expect(redisGetMock).toBeCalledTimes(1);
      expect(redisDelMock).toBeCalledTimes(0);
      expect(redisSetMock).toBeCalledTimes(2);
      expect(activeEmailService).toEqual(expectResult);
    });

    it('should send an email if email not verified', async () => {
      const expectResult = { sentEmail: true, count: 1 };
      userInfo.isVerified = false;

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(() => null);

      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(() => true);

      const redisDelMock = jest
        .spyOn(redis, 'del')
        .mockImplementation(async () => {
          return 1;
        });

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(sendMailMock).toBeCalledTimes(1);
      expect(redisGetMock).toBeCalledTimes(1);
      expect(redisDelMock).toBeCalledTimes(0);
      expect(redisSetMock).toBeCalledTimes(2);
      expect(activeEmailService).toEqual(expectResult);
    });

    it('should send an email if password does not set', async () => {
      const expectResult = { sentEmail: true, count: 1 };

      userInfo.password = '';

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(() => null);

      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(() => true);

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(sendMailMock).toBeCalledTimes(1);
      expect(redisGetMock).toBeCalledTimes(1);
      expect(redisSetMock).toBeCalledTimes(2);
      expect(activeEmailService).toEqual(expectResult);
    });

    it('should not send an email if email is blocked', async () => {
      const expectResult = { sentEmail: false, blocked: true };
      userInfo.blocked = true;

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(() => null);

      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(() => true);

      const redisDelMock = jest
        .spyOn(redis, 'del')
        .mockImplementation(async () => {
          return 1;
        });

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(sendMailMock).toBeCalledTimes(0);
      expect(redisGetMock).toBeCalledTimes(0);
      expect(redisDelMock).toBeCalledTimes(0);
      expect(redisSetMock).toBeCalledTimes(0);
      expect(activeEmailService).toEqual(expectResult);
    });

    it('should not send an email if count is more than 5', async () => {
      const expectResult = { sentEmail: false, count: 6 };
      redisGetData.count = 5;
      userInfo.password = '';

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(() => JSON.stringify(redisGetData));

      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(() => true);

      const redisDelMock = jest
        .spyOn(redis, 'del')
        .mockImplementation(async () => {
          return 1;
        });

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(redisGetMock).toBeCalledTimes(1);
      expect(redisDelMock).toBeCalledTimes(1);
      expect(redisSetMock).toBeCalledTimes(0);
      expect(sendMailMock).toBeCalledTimes(0);
      expect(activeEmailService).toEqual(expectResult);
    });

    it('should not send an email if verified and has password', async () => {
      const expectResult = { sentEmail: false };

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const sendMailMock = jest
        .spyOn(SendMail.prototype, 'sendMail')
        .mockResolvedValue('reciever@mail.com');

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(() => JSON.stringify(null));

      const redisSetMock = jest
        .spyOn(redis, 'set')
        .mockImplementation(() => true);

      const activeEmailService = await authService.activeEmail('some@mail.com');

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(sendMailMock).toBeCalledTimes(0);
      expect(redisGetMock).toBeCalledTimes(0);
      expect(redisSetMock).toBeCalledTimes(0);
      expect(activeEmailService).toEqual(expectResult);
    });
  });

  /* 
  ------------ Verify Email Service ------------
  */
  describe('Verify email service', () => {
    const verifyDto: VerifyDTO = {
      token: 'verifyToken',
      ip: '127.0.0.1',
      device: 'Chrome',
      timezone: 'Asia/Bangkok',
    };

    it('should return refreshToken', async () => {
      personInfo.email = 'test@test.com';
      userInfo.isVerified = false;

      const redisGetMock = jest
        .spyOn(redis, 'get')
        .mockImplementation(async () =>
          JSON.stringify({ token: 'token', expiredAt: Date.now() + 1000 })
        );

      const redisDelMock = jest
        .spyOn(redis, 'del')
        .mockImplementation(async () => 1);

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockImplementation(async () => null);

      const savePersonMock = jest
        .spyOn(dataSource.getRepository(Person), 'save')
        .mockImplementation(async () => personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockImplementation(async () => userInfo);

      const saveUserMock = jest
        .spyOn(dataSource.getRepository(User), 'save')
        .mockImplementation(async () => userInfo);

      const verifyUserMock = jest
        .spyOn(UserService.prototype, 'verifyUser')
        .mockImplementation(async () => {
          return { ...userInfo, isVerified: true };
        });

      const refreshTokenMock = jest
        .spyOn(JwtToken.prototype, 'generateRefreshToken')
        .mockImplementation(() => {
          return { refreshToken: 'randomJwtToken', jti: 'u-u-i-d-s' };
        });

      const accessTokenMock = jest
        .spyOn(JwtToken.prototype, 'generateAccessToken')
        .mockImplementation(() => 'encrypted access token');

      const getSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'findOne')
        .mockImplementation(async () => null);

      const saveSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'save')
        .mockImplementation(async () => sessionInfo);

      const createNewSessionMock = jest
        .spyOn(UserSessionService.prototype, 'createNewUserSession')
        .mockImplementation(async () => {
          return {
            activeAt: new Date(),
            createAt: new Date(),
            device: 'uuid',
            id: 3,
            ip: '127.0.0.1',
            refreshToken: 'encrypted token',
            revoked: false,
            timezone: 'bangkok/thailand',
            user: userInfo,
            userAgent: 'something',
          };
        });

      const verifyService = await authService.verify(verifyDto);

      expect(redisGetMock).toBeCalledTimes(2);
      expect(getPersonMock).toBeCalledTimes(1);
      expect(savePersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(redisDelMock).toBeCalledTimes(2);
      expect(verifyUserMock).toBeCalledTimes(1);
      expect(refreshTokenMock).toBeCalledTimes(1);
      expect(accessTokenMock).toBeCalledTimes(1);
      expect(verifyService).toHaveProperty('refreshToken');
      expect(verifyService?.refreshToken).toEqual('randomJwtToken');
      expect(verifyService).toHaveProperty('accessToken');
      expect(verifyService?.accessToken).toEqual('encrypted access token');
    });
  });

  /* 
  ------------ Access Token Service ------------
  */
  describe('Access Token service', () => {
    it('should return access token', async () => {
      const expectResult = { accessToken: 'newAccessToken' };

      const findSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'findOne')
        .mockImplementation(async () => null);

      const jwtAccessMock = jest
        .spyOn(JwtToken.prototype, 'generateAccessToken')
        .mockImplementation(() => 'newAccessToken');

      const accessTokenService = await authService.accessToken(
        'example@mail.com',
        'someuuid'
      );

      expect(findSessionMock).toBeCalledTimes(1);
      expect(jwtAccessMock).toBeCalledTimes(0);
      expect(accessTokenService).toEqual(null);
    });
  });

  /* 
  ------------ Refresh Token Service ------------
  */
  describe('Refresh Token service', () => {
    it('should revoke old session and return new refresh token', async () => {
      const getUserSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'findOne')
        .mockImplementation(async () => sessionInfo);

      const saveSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'save')
        .mockImplementation(async () => sessionInfo);

      // const refreshTokenService = await authService.refreshToken();

      // expect(refreshTokenService).toHaveProperty('refreshToken');
      // expect(getUserSessionMock).toBeCalledTimes(1);
      // expect(saveSessionMock).toBeCalledTimes(2);
    });
  });

  /* 
  ------------ Set Password Service ------------
  */
  describe('Set Password service', () => {
    it('should return true', async () => {
      const setPassword: SetPasswordDTO = {
        email: 'test@mail.com',
        password: 'secret',
      };
      userInfo.password = null;
      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByEmail')
        .mockImplementation(async () => userInfo);

      const saveUserMock = jest
        .spyOn(dataSource.getRepository(User), 'save')
        .mockImplementation(async () => {
          return { ...userInfo, password: setPassword.password };
        });

      const setPasswordService = await authService.setPassword(setPassword);

      expect(getUserMock).toBeCalledTimes(1);
      expect(saveUserMock).toBeCalledTimes(1);
      expect(setPasswordService).toEqual(true);
    });
  });

  /* 
  ------------ Login Service ------------
  */
  describe('Login service', () => {
    it('should return user infomation', async () => {
      const expectResult = userInfo;

      const loginDTO: LoginDTO = {
        email: personInfo.email,
        password: <string>userInfo.password,
      };

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const argonVerifyMock = jest
        .spyOn(argon2, 'verify')
        .mockResolvedValue(true);

      const loginService = await authService.login(loginDTO);

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(argonVerifyMock).toBeCalledTimes(1);
      expect(loginService).toEqual(expectResult);
    });

    it('should return null cause password does not match', async () => {
      const expectResult = null;

      const loginDTO: LoginDTO = {
        email: personInfo.email,
        password: 'random',
      };

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const argonVerifyMock = jest
        .spyOn(argon2, 'verify')
        .mockResolvedValue(false);

      const loginService = await authService.login(loginDTO);

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(argonVerifyMock).toBeCalledTimes(1);
      expect(loginService).toEqual(expectResult);
    });

    it('should return null cause user got blocked', async () => {
      const expectResult = null;

      const loginDTO: LoginDTO = {
        email: personInfo.email,
        password: 'random',
      };
      userInfo.blocked = true;

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const argonVerifyMock = jest
        .spyOn(argon2, 'verify')
        .mockResolvedValue(true);

      const loginService = await authService.login(loginDTO);

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(argonVerifyMock).toBeCalledTimes(0);
      expect(loginService).toEqual(expectResult);
    });

    it('should return null cause user is not verified', async () => {
      const expectResult = null;

      const loginDTO: LoginDTO = {
        email: personInfo.email,
        password: 'random',
      };
      userInfo.isVerified = false;

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const argonVerifyMock = jest
        .spyOn(argon2, 'verify')
        .mockResolvedValue(true);

      const loginService = await authService.login(loginDTO);

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(argonVerifyMock).toBeCalledTimes(0);
      expect(loginService).toEqual(expectResult);
    });

    it('should return null if password not set yet', async () => {
      const expectResult = null;

      const loginDTO: LoginDTO = {
        email: personInfo.email,
        password: 'random',
      };
      userInfo.password = null;

      const getPersonMock = jest
        .spyOn(PersonService.prototype, 'getPersonByEmail')
        .mockResolvedValue(personInfo);

      const getUserMock = jest
        .spyOn(UserService.prototype, 'getUserByPerson')
        .mockResolvedValue(userInfo);

      const argonVerifyMock = jest
        .spyOn(argon2, 'verify')
        .mockResolvedValue(true);

      const loginService = await authService.login(loginDTO);

      expect(getPersonMock).toBeCalledTimes(1);
      expect(getUserMock).toBeCalledTimes(1);
      expect(argonVerifyMock).toBeCalledTimes(0);
      expect(loginService).toEqual(expectResult);
    });
  });
});
