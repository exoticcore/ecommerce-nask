import { it, describe, expect, beforeAll, jest } from '@jest/globals';
import PersonService from '../../../../src/api/person/person.service';
import { Person } from '../../../../src/api/person/person.entity';
import { dataSource } from '../../../../src/config/typeorm.config';

describe('Person Service Unit Testing', () => {
  const personService = new PersonService();
  const personInfo: Person = {
    id: 1,
    email: 'user@email.com',
    firstName: 'test',
    lastName: 'test',
    phone: null,
    picture: null,
    createdAt: new Date(Date.now()),
  };

  describe('Get Person By Email', () => {
    it('should return Person Infomaion', async () => {
      const ormMock = jest
        .spyOn(dataSource.getRepository(Person), 'findOne')
        .mockResolvedValue(personInfo);

      const getPersonInfo = await personService.getPersonByEmail(
        personInfo.email
      );

      expect(ormMock).toBeCalledTimes(1);
      expect(getPersonInfo).toEqual(personInfo);
    });

    it('should return null', async () => {
      const ormPersonMock = jest
        .spyOn(dataSource.getRepository(Person), 'findOne')
        .mockResolvedValue(null);

      const getPersonInfo = await personService.getPersonByEmail(
        personInfo.email
      );

      expect(ormPersonMock).toBeCalledTimes(1);
      expect(getPersonInfo).toBeNull();
    });
  });

  describe('Create Person Service', () => {
    it('should create person', async () => {
      const createPersonMock = jest
        .spyOn(dataSource.getRepository(Person), 'save')
        .mockImplementation(async () => personInfo);

      const createPerson = await personService.createPerson(personInfo);

      expect(createPersonMock).toBeCalledTimes(1);
      expect(createPerson).toEqual(personInfo);
    });
  });
});
