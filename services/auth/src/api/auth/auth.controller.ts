import { Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, SetPasswordDTO, VerifyDTO } from './dto/auth.dto';
import { validate } from 'class-validator';
import { logger } from '../../utils/logger';
import { ActiveEmailService } from './auth.interface';
import geoip from 'geoip-lite';
import crypto from 'crypto';

const authService = new AuthService();

export default class AuthController {
  constructor() {}

  public async activeEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const activeEmail: ActiveEmailService = await authService.activeEmail(
        email
      );

      if (activeEmail.count) {
        if (activeEmail.count > 5 && !activeEmail.sentEmail)
          return res.status(405).json({ message: 'method not allowed' });

        if (activeEmail.sentEmail) {
          return res.status(201).json({
            isActive: false,
            email: req.body.email,
            countdown: 15,
            count: activeEmail.count,
          });
        }
      }

      if (activeEmail.blocked)
        return res.status(403).json({ message: 'forbidden' });

      return res.status(200).json({ isActive: true, email: req.body.email });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async verify(req: Request, res: Response) {
    try {
      const verifyDto: VerifyDTO = {
        token: req.params.token,
        ip: req.ip,
        device: req.cookies.dvid,
        userAgent: req.headers['user-agent'],
        timezone: geoip.lookup(<string>req.ip)?.timezone,
      };

      const isValidate = await validate(verifyDto);

      if (isValidate.length)
        return res.status(400).json({ message: 'bad request error' });

      const credentials = await authService.verify(verifyDto);

      if (!credentials)
        return res.status(400).json({ message: 'bad request error' });

      req.session.refreshToken = credentials.refreshToken;
      res.cookie('dvid', credentials.dvid, {
        sameSite: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Production',
        maxAge: 5 * 365 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({
        accessToken: credentials.accessToken,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async accessToken(req: Request, res: Response) {
    try {
      const { token } = res.locals;

      if (!token) return res.status(401).json({ message: 'unauthorized' });

      const accessToken = await authService.accessToken(token.jti, token.email);

      if (!accessToken)
        return res.status(401).json({ message: 'unauthorized' });

      return res.status(201).json(accessToken);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      const newCredential = await authService.refreshToken();

      if (!newCredential)
        res.status(400).json({ message: 'bad request error' });

      return res.status(201).json({ refreshToken: 'new refresh token' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async setPassword(req: Request, res: Response) {
    try {
      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword || !password)
        return res.status(400).json({ message: 'bad request error' });

      const setPasswordDTO = new SetPasswordDTO();
      setPasswordDTO.email = res.locals.user.email;
      setPasswordDTO.password = password;
      const isValidate = await validate(setPasswordDTO);
      if (isValidate.length > 0)
        return res.status(400).json({ message: 'bad request error' });

      const user = await authService.setPassword(setPasswordDTO);
      if (!user) return res.status(400).json({ message: 'bad request error' });

      return res.status(201).json({ message: 'set password successfully' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: '' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password, remember } = req.body;
      const loginDTO = new LoginDTO();

      loginDTO.email = email;
      loginDTO.password = password;
      loginDTO.remember = remember;
      const isValidate = await validate(loginDTO);

      if (isValidate.length > 0)
        return res.status(400).json({ message: 'bad request error' });

      const userInfo = await authService.login(loginDTO);
      if (!userInfo) return res.status(401).json({ message: 'unauthorized' });

      if (loginDTO.remember) {
        res.cookie('token', 'refreshToken', {
          signed: true,
          secure: false,
          sameSite: 'strict',
          expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).json({ refreshToken: '' });
      }
      return res.status(200).json({ refreshToken: 'refreshtoken' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  public async googleCallback(req: Request, res: Response) {
    const user: any = req.user;
    const info: any = req.authInfo;

    if (!user) {
      return res.status(400).json({ message: 'bad request error' });
    }

    try {
      const nonce = crypto.randomBytes(16).toString('base64');

      // console.log(user);
      console.log(info);

      // Set the CSP header with the nonce
      res.setHeader(
        'Content-Security-Policy',
        `script-src 'self' 'nonce-${nonce}'`
      );

      res.cookie('token', 'some token');

      // Include the nonce in your inline script
      res.send(`
        <script nonce=${nonce}>
          localStorage.setItem("authStatus", "success");
          window.close();
        </script>
      `);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}
