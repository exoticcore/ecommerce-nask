import { Router } from 'express';
import Routes from '../../../interfaces/routes.interface';
import ServiceController from './service.controller';

export default class ServiceRoute implements Routes {
  public readonly path = '/service';
  public readonly router = Router();

  private readonly service = new ServiceController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, this.service.createService);
    this.router.get(`${this.path}`, this.service.getAllServices);
    this.router.patch(`${this.path}/:serviceId`, this.service.updateService);
    this.router.delete(`${this.path}/:serviceId`, this.service.deleteService);
  }
}
