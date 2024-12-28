import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import ScopeService from './scope.service';
import { CreateScopeDto } from './dto/scope.create.dto';
import { UpdateScopeDto } from './dto/scope.update.dto';

const scopeService = new ScopeService();

export default class ScopeController {
  constructor() {}

  async createScope(req: Request, res: Response) {
    const data: CreateScopeDto = req.body;
    try {
      const created = await scopeService.createScope(data);
      if (!created)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(201).json(created);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async readAllScopes(req: Request, res: Response) {
    try {
      const scopes = await scopeService.readAllScopes();

      return res.status(200).json(scopes);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async updateScope(req: Request, res: Response) {
    const data: UpdateScopeDto = req.body;
    const scopeId: number = parseInt(req.params.scopeId);
    try {
      const updated = await scopeService.updateScope(data, scopeId);
      if (!updated)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(200).json(updated);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async deleteScope(req: Request, res: Response) {
    const scopeId: number = parseInt(req.params.scopeId);
    try {
      const deleted = await scopeService.deleteScope(scopeId);
      if (!deleted)
        return res.status(401).json({ message: 'bad request error' });

      return res.status(204).json(deleted);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
