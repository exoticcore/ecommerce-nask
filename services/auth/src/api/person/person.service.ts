import { dataSource } from '@config/typeorm.config';
import { Person } from './person.entity';
import { logger } from '../../utils/logger';
import { CreatePerosonDTO } from './person.dto';

export default class PersonService {
  constructor() {}

  public async getPersonByEmail(emailDto: string): Promise<Person | null> {
    const person = await dataSource
      .getRepository(Person)
      .findOne({ where: { email: emailDto } });

    return person;
  }

  public async createPerson(createPersonDTO: CreatePerosonDTO) {
    return await dataSource.getRepository(Person).save({ ...createPersonDTO });
  }
}
