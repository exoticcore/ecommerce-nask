import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import ServiceService from './service.service';
import { CreateServiceDto } from './dto/service.create.dto';
import { UpdateServiceDto } from './dto/service.update.dto';

const service = new ServiceService();

export default class ServiceController {
  constructor() {}

  public async createService(req: Request, res: Response) {
    const data: CreateServiceDto = req.body;
    try {
      const created = await service.createService(data);
      if (!created)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(201).json(created);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async getAllServices(req: Request, res: Response) {
    try {
      const services = await service.getAllServices();

      return res.status(200).json(services);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async updateService(req: Request, res: Response) {
    const data: UpdateServiceDto = req.body;
    const serviceId: number = parseInt(req.params.serviceId);
    try {
      const updated = await service.updateService(data, serviceId);

      if (!updated)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(200).json(updated);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async deleteService(req: Request, res: Response) {
    const serviceId = parseInt(req.params.serviceId);
    try {
      const deleted = await service.deleteService(serviceId);

      if (!deleted)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(204).json(deleted);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
