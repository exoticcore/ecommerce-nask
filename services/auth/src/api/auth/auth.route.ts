import { Router } from 'express';
import AuthController from './auth.controller';
import Routes from '../../interfaces/routes.interface';
import ValidatorMiddleware from '../../middleware/validator.middleware';
import CredentialMiddleware from '../../middleware/credential.middleware';
import { ActiveEmailDTO } from './dto/auth.dto';
import AdminRoute from './admin/admin.route';
import passport from 'passport';

export default class AuthRoute implements Routes {
  public readonly path = '';
  public readonly router = Router();

  private readonly auth = new AuthController();
  private readonly credentialMiddleware = new CredentialMiddleware();
  private readonly validatorMiddleware = new ValidatorMiddleware();
  private readonly passport = passport;

  private readonly adminRoute = new AdminRoute();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/active-email`,
      this.validatorMiddleware.validate(ActiveEmailDTO),
      this.auth.activeEmail
    );
    this.router.get(`${this.path}/verify/:token`, this.auth.verify);
    this.router.get(
      `${this.path}/token`,
      this.credentialMiddleware.authentication,
      this.auth.accessToken
    );
    this.router.get(
      `${this.path}/session`,
      this.credentialMiddleware.authentication,
      this.credentialMiddleware.authorization(),
      this.auth.refreshToken
    );
    this.router.post(
      `${this.path}/set-password`,
      this.credentialMiddleware.authorization(),
      this.auth.setPassword
    );
    this.router.post(`${this.path}/login`, this.auth.login);
    this.router.get(
      `${this.path}/google`,
      this.passport.authenticate('google', { scope: ['email', 'profile'] })
    );
    this.router.get(
      `${this.path}/google/callback`,
      this.passport.authenticate('google', {
        failureRedirect: '/',
        session: false,
      }),
      this.auth.googleCallback
    );

    this.router.use(this.adminRoute.router);
  }
}
