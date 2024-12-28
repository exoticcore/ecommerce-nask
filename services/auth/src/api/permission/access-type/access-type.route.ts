import { Router } from 'express';
import Routes from '../../../interfaces/routes.interface';
import AccessTypeController from './access-type.controller';
import ValidatorMiddleware from '../../../middleware/validator.middleware';
import { CreateAccessTypeDto } from './dto/access-type.create.dto';
import { UpdateAccessTypeDto } from './dto/access-type.update.dto';

export default class AccessTypeRoute implements Routes {
  public readonly path = '/access-type';
  public readonly router = Router();

  private readonly accessType = new AccessTypeController();

  private readonly validateMiddleware = new ValidatorMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validateMiddleware.validate(CreateAccessTypeDto),
      this.accessType.createAccessType
    );
    this.router.get(
      `${this.path}/:serviceId`,
      this.accessType.getAccessTypeByServiceId
    );
    this.router.patch(
      `${this.path}/:accessTypeId`,
      this.validateMiddleware.validate(UpdateAccessTypeDto),
      this.accessType.updateAccessType
    );
    this.router.delete(
      `${this.path}/:accessTypeId`,
      this.accessType.deleteAccessType
    );
  }
}
