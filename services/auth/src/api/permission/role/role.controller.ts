import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import RoleService from './role.service';

const roleService = new RoleService();

export default class RoleController {
  constructor() {}

  public async createRole(req: Request, res: Response) {
    const { title } = req.body;
    try {
      const createdRole = await roleService.createRole(title);

      if (!createdRole)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(201).json(createdRole);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async readAllRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.readAllRole();

      return res.status(200).json(roles);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async updateRole(req: Request, res: Response) {
    const id: number = parseInt(req.params.roleId);
    const { title }: { title: string } = req.body;

    try {
      const updated = await roleService.updateRole(id, title);

      if (!updated)
        return res.status(400).json({ message: 'bad request error' });

      return res.status(200).json(updated);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async deleteRole(req: Request, res: Response) {
    const id: number = parseInt(req.params.roleId);

    try {
      const deleted = await roleService.deleteRole(id);
      if (!deleted)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(204).json(deleted);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
