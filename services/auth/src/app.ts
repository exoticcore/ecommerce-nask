import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs, { access } from 'fs';
import YAML from 'yaml';

import {
  COOKIE_SECRET,
  DB_PORT,
  LOG_FORMAT,
  NODE_ENV,
  PORT,
  REDIS_PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from './config/constant.config';

import { sessionConfig } from './config/session.config';
import { logger } from './utils/logger';
import { dataSource } from './config/typeorm.config';
import Routes from './interfaces/routes.interface';
import AuthRoute from './api/auth/auth.route';
import redis from './config/redis.config';
import { DataSource } from 'typeorm';
import AdminSetting from './middleware/admin-setting.middleware.ts';
import PermissionRoute from './api/permission/permission.route';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import path from 'path';
import { ProtoGrpcType } from './proto/admin';
import { adminGrpc } from './grpc/verify-admin';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public dataSource: DataSource;
  public redis: typeof redis;
  private readonly adminDefault = new AdminSetting();

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.dataSource = dataSource;
    this.redis = redis;

    this.initializeGooglePassport();
    this.initializeMiddlewares();
    this.initializeRoutes([new AuthRoute(), new PermissionRoute()]);
    this.initializeSwagger();
    this.initializeGrpc();
  }

  public async listen() {
    this.app.listen(this.port, async () => {
      await this.connectToDatabase();
      await this.connectToRedis();
      await this.adminDefault.InitailizeAdminDefaultSetting();

      logger.info(`====================================`);
      logger.info(`========= ENV: ${this.env} =========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`====================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await this.dataSource.initialize();
      logger.info(`connected to database on port ${DB_PORT}`);
    } catch (err) {
      logger.error(err);
    }
  }

  private async connectToRedis() {
    try {
      await this.redis.connect();
      logger.info(`connect to redis on port ${REDIS_PORT}`);
    } catch (err) {
      logger.error(err);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT || 'combined'));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(COOKIE_SECRET));
    this.app.use(session(sessionConfig));
    this.app.use(passport.initialize());
    this.app.disable('x-powered-by');
  }

  private initializeGooglePassport() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: <string>GOOGLE_CLIENT_ID,
          clientSecret: <string>GOOGLE_CLIENT_SECRET,
          callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
          passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile: any, cb) => {
          cb(null, profile, { test: 'test na ja' });
        }
      )
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1/auth', route.router);
    });
  }

  private initializeSwagger() {
    const file = fs.readFileSync('swagger.yaml', 'utf8');
    const swaggerDocument = YAML.parse(file);
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  private initializeGrpc() {
    const adminDefinition = protoLoader.loadSync(
      path.join(__dirname, '../proto/admin.proto')
    );
    const protoAdmin = grpc.loadPackageDefinition(
      adminDefinition
    ) as unknown as ProtoGrpcType;

    const server = new grpc.Server();
    server.addService(protoAdmin.admin.Tokens.service, adminGrpc);
    server.bindAsync(
      '0.0.0.0:50051',
      grpc.ServerCredentials.createInsecure(),
      () => {
        logger.info('grpc is running on port: 50051');
      }
    );
  }
}
