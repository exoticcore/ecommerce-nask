import { Request, Response } from 'express';
import PersonService from './person.service';
import { EmailCheckDTO } from './person.dto';
import { validate } from 'class-validator';
import { logger } from '../../utils/logger';

const personService = new PersonService();

export default class PersonController {
  constructor() {}
}
