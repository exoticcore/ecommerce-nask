import { Request, Response } from 'express';
import PermissionService from './permission.service';
import { logger } from '../../utils/logger';

const permissionService = new PermissionService();

export default class PermissionController {
  constructor() {}

  public async createPermission(req: Request, res: Response) {
    try {
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async getAllPermissionByRole(req: Request, res: Response) {
    try {
      const permissions = await permissionService.getPermissionByRole();

      return res.status(200).json(permissions);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async updatePermission(req: Request, res: Response) {
    try {
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async deletePermission(req: Request, res: Response) {
    try {
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
