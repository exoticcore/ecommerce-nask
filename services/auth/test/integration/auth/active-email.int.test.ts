import { describe, it, beforeEach, jest, expect } from '@jest/globals';
import httpMock from 'node-mocks-http';
import AuthController from '../../../src/api/auth/auth.controller';
import AuthService from '../../../src/api/auth/auth.service';
import { dataSource } from '../../../src/config/typeorm.config';
import { Person } from '../../../src/api/person/person.entity';
import { User } from '../../../src/api/user/user.entity';
import argon2 from 'argon2';
import SendMail from '../../../src/utils/nodemailer';

describe('Auth Integration Testing', () => {
  let authController: AuthController;
  let authService: AuthService;
  let req = httpMock.createRequest();
  let res = httpMock.createResponse();
  let personInfo: Person;
  let userInfo: User;

  beforeEach(() => {
    authController = new AuthController();
    authService = new AuthService();
    res = httpMock.createResponse();

    personInfo = {
      id: 1,
      email: 'test@email.com',
      firstName: 'test',
      lastName: 'test',
      phone: null,
      picture: null,
      createdAt: new Date(Date.now()),
    };
    userInfo = {
      id: '1234',
      blocked: false,
      createdAt: new Date(Date.now()),
      isVerified: true,
      password: 'hash',
      person: personInfo,
      updatedAt: new Date(Date.now()),
    };
  });

  describe('Active email Group', () => {
    it('should response status code 200 with json', async () => {});

    it('should response status code 201 with json', async () => {});

    it('should response status code 400 with json', async () => {});

    it('should response status code 500 with internal server error message', async () => {});

    it('should response status code 500 with internal server error message', async () => {});
  });

  //   describe('Login Group', () => {
  //     it('should response status code 200 with user infomation', async () => {
  //       req = httpMock.createRequest({
  //         body: { email: 'test@mail.com', password: '1234' },
  //       });

  //       userInfo.password = await argon2.hash('1234');

  //       const getPersonRepoMock = jest
  //         .spyOn(dataSource.getRepository(Person), 'findOneBy')
  //         .mockImplementation(async () => personInfo);

  //       const getUserRepoMock = jest
  //         .spyOn(dataSource.getRepository(User), 'findOneBy')
  //         .mockImplementation(async () => userInfo);

  //       await authController.login(req, res);

  //       expect(getPersonRepoMock).toBeCalledTimes(1);
  //       expect(getUserRepoMock).toBeCalledTimes(1);
  //       expect(res.statusCode).toEqual(200);
  //       expect(res._getJSONData()).toEqual({ refreshToken: 'refreshtoken' });
  //     });

  //     it('should response status code 400 with error message', async () => {
  //       const expectResult = { message: 'bad request error' };
  //       req = httpMock.createRequest({
  //         body: { email: 'test@mail', password: '1234' },
  //       });

  //       userInfo.password = await argon2.hash('1234');

  //       const getPersonRepoMock = jest
  //         .spyOn(dataSource.getRepository(Person), 'findOneBy')
  //         .mockImplementation(async () => personInfo);

  //       const getUserRepoMock = jest
  //         .spyOn(dataSource.getRepository(User), 'findOneBy')
  //         .mockImplementation(async () => userInfo);

  //       await authController.login(req, res);

  //       expect(getPersonRepoMock).toBeCalledTimes(0);
  //       expect(getUserRepoMock).toBeCalledTimes(0);
  //       expect(res.statusCode).toEqual(400);
  //       expect(res._getJSONData()).toEqual(expectResult);
  //     });

  //     it('should response status code 401 with error message', async () => {
  //       const expectResult = { message: 'unauthorized' };
  //       req = httpMock.createRequest({
  //         body: { email: 'test@mail.com', password: 'random' },
  //       });

  //       userInfo.password = await argon2.hash('1234');

  //       const getPersonRepoMock = jest
  //         .spyOn(dataSource.getRepository(Person), 'findOneBy')
  //         .mockImplementation(async () => personInfo);

  //       const getUserRepoMock = jest
  //         .spyOn(dataSource.getRepository(User), 'findOneBy')
  //         .mockImplementation(async () => userInfo);

  //       await authController.login(req, res);

  //       expect(getPersonRepoMock).toBeCalledTimes(1);
  //       expect(getUserRepoMock).toBeCalledTimes(1);
  //       expect(res.statusCode).toEqual(401);
  //       expect(res._getJSONData()).toEqual(expectResult);
  //     });

  //     it('should response status code 500 with error message', async () => {
  //       const expectResult = { message: 'internal server error' };
  //       req = httpMock.createRequest({
  //         body: { email: 'test@mail.com', password: 'random' },
  //       });

  //       userInfo.password = await argon2.hash('1234');

  //       const getPersonRepoMock = jest
  //         .spyOn(dataSource.getRepository(Person), 'findOneBy')
  //         .mockRejectedValue(async () => personInfo);

  //       const getUserRepoMock = jest
  //         .spyOn(dataSource.getRepository(User), 'findOneBy')
  //         .mockImplementation(async () => userInfo);

  //       await authController.login(req, res);

  //       expect(getPersonRepoMock).toBeCalledTimes(1);
  //       expect(getUserRepoMock).toBeCalledTimes(0);
  //       expect(res.statusCode).toEqual(500);
  //       expect(res._getJSONData()).toEqual(expectResult);
  //     });

  //     it('should response status code 500 with error message', async () => {
  //       const expectResult = { message: 'internal server error' };
  //       req = httpMock.createRequest({
  //         body: { email: 'test@mail.com', password: 'random' },
  //       });

  //       userInfo.password = await argon2.hash('1234');

  //       const getPersonRepoMock = jest
  //         .spyOn(dataSource.getRepository(Person), 'findOneBy')
  //         .mockImplementation(async () => personInfo);

  //       const getUserRepoMock = jest
  //         .spyOn(dataSource.getRepository(User), 'findOneBy')
  //         .mockRejectedValue(async () => userInfo);

  //       await authController.login(req, res);

  //       expect(getPersonRepoMock).toBeCalledTimes(1);
  //       expect(getUserRepoMock).toBeCalledTimes(1);
  //       expect(res.statusCode).toEqual(500);
  //       expect(res._getJSONData()).toEqual(expectResult);
  //     });
  //   });
});
