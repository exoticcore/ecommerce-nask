import { Router } from 'express';
import Routes from '../../../interfaces/routes.interface';
import ScopeController from './scope.controller';
import ValidatorMiddleware from '../../../middleware/validator.middleware';
import { CreateScopeDto } from './dto/scope.create.dto';
import { UpdateScopeDto } from './dto/scope.update.dto';

export default class ScopeRoute implements Routes {
  public path: string = '/scope';
  public router = Router();

  private readonly scope = new ScopeController();
  private readonly validateMiddleware = new ValidatorMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      this.validateMiddleware.validate(CreateScopeDto),
      this.scope.createScope
    );
    this.router.get(`${this.path}`, this.scope.readAllScopes);
    this.router.patch(
      `${this.path}/:scopeId`,
      this.validateMiddleware.validate(UpdateScopeDto),
      this.scope.updateScope
    );
    this.router.delete(`${this.path}/:scopeId`, this.scope.deleteScope);
  }
}
