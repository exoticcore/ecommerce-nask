import { describe, it, jest, expect } from '@jest/globals';
import UserSessionService from '../../../../src/api/user-session/user-session.service';
import { dataSource } from '../../../../src/config/typeorm.config';
import { UserSession } from '../../../../src/api/user-session/user-session.entity';

describe('User Session Service Unit testing', () => {
  const userSession = new UserSessionService();
  const sessionInfo: UserSession = {
    id: 1,
    refreshToken: '',
    device: 'eiei',
    userAgent: null,
    timezone: null,
    revoked: false,
    ip: '127.0.0.1',
    activeAt: new Date(Date.now() + 300000),
    createAt: new Date(),
    user: {
      id: '',
      password: '',
      isVerified: true,
      blocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      person: {
        id: 5,
        firstName: '',
        lastName: '',
        email: 'example@mail.com',
        phone: '0696996969',
        picture: null,
        createdAt: new Date(),
      },
    },
  };
  describe('Find User Sesssion By JTI', () => {
    it('should return null', async () => {
      const findUserSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'findOne')
        .mockImplementation(async () => null);

      const getUserSessionByJTI =
        await new UserSessionService().getUserSessionByJti('uuid_jti');

      expect(findUserSessionMock).toBeCalledTimes(1);
      expect(getUserSessionByJTI).toEqual(null);
    });

    it('should return user session info', async () => {
      const findUserSessionMock = jest
        .spyOn(dataSource.getRepository(UserSession), 'findOne')
        .mockImplementation(async () => {
          return sessionInfo;
        });

      const getUserSessionByJTI = await userSession.getUserSessionByJti(
        'uuid_jti'
      );

      expect(findUserSessionMock).toBeCalledTimes(1);
      expect(getUserSessionByJTI).toEqual(sessionInfo);
    });
  });

  // describe('Create new Session', () => {
  //   it('should return session info', async () => {
  //     const findSessionMock = jest
  //       .spyOn(userSession, 'getUserSessionByJti')
  //       .mockImplementation(async () => null);

  //     const createSessionMock = jest
  //       .spyOn(dataSource.getRepository(UserSession), 'save')
  //       .mockImplementation(async () => sessionInfo);

  //     const createSessionService = await userSession.createNewUserSession(
  //       sessionInfo
  //     );

  //     expect(createSessionService).toEqual(sessionInfo);
  //     expect(findSessionMock).toBeCalledTimes(1);
  //     expect(createSessionMock).toBeCalledTimes(1);
  //   });
  // });
});
