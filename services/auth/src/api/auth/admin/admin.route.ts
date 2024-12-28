import { Router } from 'express';
import Routes from '../../../interfaces/routes.interface';
import AdminController from './admin.controller';
import ValidatorMiddleware from '../../../middleware/validator.middleware';
import { LoginDTO } from '../dto/auth.dto';
import AdminMiddleware from '../../../middleware/admin-credential.middleware';

export default class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();

  private readonly adminController = new AdminController();

  private readonly validateMiddleware = new ValidatorMiddleware();
  private readonly adminMiddleware = new AdminMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      this.validateMiddleware.validate(LoginDTO),
      this.adminController.login
    );
    this.router.get(
      `${this.path}/token`,
      this.adminMiddleware.authentication,
      this.adminController.accessToken
    );
    this.router.get(
      `${this.path}/session`,
      this.adminMiddleware.authentication,
      this.adminController.refreshToken
    );
    this.router.get(
      `${this.path}/info`,
      this.adminMiddleware.authorization(),
      this.adminController.adminInfo
    );
    this.router.delete(
      `${this.path}/logout`,
      this.adminMiddleware.authentication,
      this.adminController.logout
    );
  }
}
