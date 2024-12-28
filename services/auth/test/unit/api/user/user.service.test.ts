import { describe, it, expect, jest } from '@jest/globals';
import UserService from '../../../../src/api/user/user.service';
import { dataSource } from '../../../../src/config/typeorm.config';
import { User } from '../../../../src/api/user/user.entity';
import { Person } from '../../../../src/api/person/person.entity';
import PersonService from '../../../../src/api/person/person.service';

describe('User Service Unit Testing', () => {
  const userService = new UserService();

  const personInfo: Person = {
    id: 1,
    email: 'user@email.com',
    firstName: 'test',
    lastName: 'test',
    phone: null,
    picture: null,
    createdAt: new Date(Date.now()),
  };

  const userInfo: User = {
    id: '1234',
    blocked: false,
    createdAt: new Date(Date.now()),
    isVerified: false,
    password: 'hash',
    person: personInfo,
    updatedAt: new Date(Date.now()),
  };

  describe('get user infomation by person', () => {
    it('should return user infomation', async () => {
      const findUserMock = jest
        .spyOn(dataSource.getRepository(User), 'findOne')
        .mockResolvedValue(userInfo);

      const getUserInfo = await userService.getUserByPerson(personInfo);

      expect(findUserMock).toBeCalledTimes(1);
      expect(getUserInfo).toEqual(userInfo);
    });

    it('should return null', async () => {
      const findUserMock = jest
        .spyOn(dataSource.getRepository(User), 'findOne')
        .mockResolvedValue(null);

      const getUserInfo = await userService.getUserByPerson(personInfo);

      expect(findUserMock).toBeCalledTimes(1);
      expect(getUserInfo).toEqual(null);
    });
  });
});
