import { Router } from 'express';
import Routes from '../../interfaces/routes.interface';
import AdminMiddleware from '../../middleware/admin-credential.middleware';
import RoleRoute from './role/role.route';
import ScopeRoute from './scope/scope.route';
import AccessTypeRoute from './access-type/access-type.route';
import ServiceRoute from './service/service.route';
import PermissionController from './permission.controller';

export default class PermissionRoute implements Routes {
  public readonly path = '/permission';
  public readonly router = Router();

  private readonly permission = new PermissionController();

  private readonly roleRoute = new RoleRoute();
  private readonly scopeRoute = new ScopeRoute();
  private readonly serviceRoute = new ServiceRoute();

  private readonly accessTypeRoute = new AccessTypeRoute();
  private readonly adminMiddleware = new AdminMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.permission.createPermission);
    this.router.get(`${this.path}`, this.permission.getAllPermissionByRole);
    this.router.patch(`${this.path}`, this.permission.updatePermission);
    this.router.delete(`${this.path}`, this.permission.deletePermission);

    this.router.use(`${this.path}`, this.roleRoute.router);
    this.router.use(`${this.path}`, this.scopeRoute.router);
    this.router.use(`${this.path}`, this.serviceRoute.router);
    this.router.use(`${this.path}`, this.accessTypeRoute.router);
  }
}
