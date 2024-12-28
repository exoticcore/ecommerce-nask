import { Request, response, Response } from 'express';
import AccessTypeService from './access-type.service';
import { logger } from '../../../utils/logger';
import { CreateAccessTypeDto } from './dto/access-type.create.dto';
import { UpdateAccessTypeDto } from './dto/access-type.update.dto';

const accessTypeService = new AccessTypeService();

export default class AccessTypeController {
  constructor() {}

  public async createAccessType(req: Request, res: Response) {
    const data: CreateAccessTypeDto = req.body;
    try {
      const created = await accessTypeService.createAccessType(data);

      if (!created)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(201).json(created);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async getAccessTypeByServiceId(req: Request, res: Response) {
    const serviceId = parseInt(req.params.serviceId);
    try {
      const accessTypes = await accessTypeService.getAllAccessTypeByService(
        serviceId
      );

      if (!accessTypes)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(200).json(accessTypes);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async updateAccessType(req: Request, res: Response) {
    const data: UpdateAccessTypeDto = req.body;
    const accessTypeId = parseInt(req.params.accessTypeId);
    try {
      const updated = await accessTypeService.updateAccessType(
        data,
        accessTypeId
      );

      if (!updated)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(200).json(updated);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async deleteAccessType(req: Request, res: Response) {
    const accessTypeId = parseInt(req.params.accessTypeId);
    try {
      const deleted = await accessTypeService.deleteAccessType(accessTypeId);

      if (!deleted)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(204).json(deleted);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
