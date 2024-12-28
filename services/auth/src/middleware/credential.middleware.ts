import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import JwtToken from '../utils/jwt-token';

const jwtToken = new JwtToken();

export default class CredentialMiddleware {
  public async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken =
        req.session?.refreshToken || req.signedCookies?.token;

      if (refreshToken) {
        const { error, tokenInfo } = jwtToken.verifyRefreshToken(refreshToken);
        if (error)
          return res.status(403).json({ message: 'invalid credentials' });

        res.locals.token = tokenInfo;
        return next();
      }

      return res.status(401).json({ message: 'unauthorized' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public authorization(permissions?: string[] | null) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bearerHeader = req.headers?.authorization;
        if (bearerHeader) {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];

          const { error, tokenInfo }: any =
            jwtToken.verifyAccessToken(bearerToken);

          if (error || !tokenInfo || (!tokenInfo.roles && !tokenInfo.scopes)) {
            return res.status(401).json({ message: 'invalid credentials' });
          }

          if (permissions) {
            let isPassed = false;
            tokenInfo.roles.map((scope: string) => {
              permissions.map((permission: string) => {
                if (scope === permission) {
                  isPassed = true;
                  return;
                }
              });
            });
            if (!isPassed)
              return res.status(403).json({ message: 'forbidden' });
            res.locals.user = tokenInfo;
            return next();
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
