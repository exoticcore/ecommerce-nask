import { Request, Response } from 'express';
import AdminService from './admin.service';
import { NODE_ENV } from '../../../config/constant.config';
import { logger } from '../../../utils/logger';

const adminService = new AdminService();

export default class AdminController {
  constructor() {}

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const credentials = await adminService.login({ email, password }, req);
      if (!credentials)
        return res.status(401).json({ message: 'unauthorized' });

      req.session.adminSession = credentials.refreshToken;
      res.cookie('dvad', credentials.dvid, {
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        signed: false,
        maxAge: 5 * 365 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        accessToken: credentials?.accessToken,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async refreshToken(req: Request, res: Response) {
    const { token } = res.locals;
    try {
      const newSession = await adminService.refreshToken(
        { jti: token.jti, dvad: token.dvad },
        req
      );
      if (!newSession)
        return res.status(400).json({ message: 'bad request error' });

      req.session.adminSession = newSession.refreshToken;
      return res.status(201).json({ message: 'created refresh token' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async accessToken(req: Request, res: Response) {
    const { token } = res.locals;
    try {
      const acToken = await adminService.accessToken({
        jti: token.jti,
        dvad: req.cookies.dvad,
      });
      if (!acToken) return res.status(401).json({ message: 'unauthenticated' });
      return res.status(201).json({ accessToken: acToken.accessToken });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async adminInfo(req: Request, res: Response) {
    const { user } = res.locals;
    try {
      return res.status(200).json({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        given_name: user.given_name,
        roles: user.roles,
        image_url: user.image_url,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async logout(req: Request, res: Response) {
    const { token } = res.locals;
    try {
      const revoked = await adminService.logout({
        dvad: req.cookies.dvad,
        jti: token.jti,
      });

      if (!revoked)
        return res.status(400).json({ message: 'bad request error' });

      req.session.destroy;
      return res.status(204).json({ message: 'no content' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
