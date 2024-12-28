import { Router } from 'express';
import Routes from '../../../interfaces/routes.interface';
import RoleController from './role.controller';
import ValidatorMiddleware from '../../../middleware/validator.middleware';
import { CreateRoleDto } from './dto/role.create.dto';
import { UpdateRoleDto } from './dto/role.update.dto';

export default class RoleRoute implements Routes {
  public readonly path = '/role';
  public readonly router = Router();

  private readonly role = new RoleController();
  private readonly validatorMiddleware = new ValidatorMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validatorMiddleware.validate(CreateRoleDto),
      this.role.createRole
    );
    this.router.get(`${this.path}`, this.role.readAllRoles);
    this.router.patch(
      `${this.path}/:roleId`,
      this.validatorMiddleware.validate(UpdateRoleDto),
      this.role.updateRole
    );
    this.router.delete(`${this.path}/:roleId`, this.role.deleteRole);
  }
}
