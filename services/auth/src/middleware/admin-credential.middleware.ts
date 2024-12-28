import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import JwtToken from '../utils/jwt-token';
import { Repository } from 'typeorm';
import { Role } from '../database/role.entity';
import { dataSource } from '../config/typeorm.config';

const jwtToken = new JwtToken();

export default class AdminMiddleware {
  private readonly roleRepo: Repository<Role>;

  constructor() {
    this.roleRepo = dataSource.getRepository(Role);
  }

  public async authentication(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.session?.adminSession;
    try {
      if (refreshToken) {
        const { error, tokenInfo } = jwtToken.verifyRefreshToken(refreshToken);
        if (error) {
          return res.status(403).json({ message: 'invalid credentials' });
        }
        res.locals.token = tokenInfo;
        return next();
      }
      return res.status(401).json({ message: 'unauthenticated' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public authorization(permissions?: string[] | null) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const bearerHeader = req.headers?.authorization;
      try {
        if (bearerHeader) {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];

          const { error, tokenInfo }: any =
            jwtToken.verifyAccessToken(bearerToken);

          if (error || !tokenInfo) {
            return res.status(401).json({ message: 'invalid credentials' });
          }
          let isPassed = false;
          if (permissions) {
            tokenInfo.roles.map((role: string) => {
              permissions.map((permission: string) => {
                if (role === permission) {
                  isPassed = true;
                  return;
                }
              });
            });
            if (!isPassed)
              return res.status(403).json({ message: 'forbidden' });
          }
          res.locals.user = tokenInfo;
          return next();
        }

        return res.status(401).json({ message: 'unauthorized' });
      } catch (err) {
        logger.error(err);
        return res.status(500).json({ message: 'internal server error' });
      }
    };
  }
}
