import {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  beforeEach,
} from '@jest/globals';
import request from 'supertest';
import App from '../../src/app';
import seeding from '../../src/database/seeding';

describe('User e2e testing', () => {
  let cookieCredential: string | string[];
  let accessToken: string;
  const myApp = new App();

  const app = myApp.getServer();
  const redis = myApp.redis;
  const dataSource = myApp.dataSource;

  beforeAll(async () => {
    await redis.connect();
    await dataSource.initialize();
    await seeding();
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
    await redis.flushAll();
    await redis.disconnect();
  });

  describe('Authentication test', () => {
    beforeAll(async () => {});
    describe('Active email', () => {
      const activeEmailPath = '/api/v1/auth/active-email';

      it('should active false if user password is set', async () => {
        const userEmail = 'user@mail.com';
        const res = await request(app).post(activeEmailPath).send({
          email: userEmail,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('isActive');
        expect(res.body.isActive).toEqual(true);
        expect(res.body.email).toBe(userEmail);
      }, 30000);

      it('should active and send verify email if person not found', async () => {
        const userEmail = 'test@mail.com';
        const res = await request(app).post(activeEmailPath).send({
          email: userEmail,
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('isActive');
        expect(res.body.isActive).toEqual(false);
        expect(res.body).toHaveProperty('count');
        expect(res.body.count).toEqual(1);
        expect(res.body.email).toBe(userEmail);
      }, 30000);

      it('should response method is not allowed if count reached to limit', async () => {
        for (let i = 0; i < 5; i++) {
          await request(app).post(activeEmailPath).send({
            email: 'user@example.com',
          });
        }

        const res = await request(app).post(activeEmailPath).send({
          email: 'user@example.com',
        });

        expect(res.statusCode).toBe(405);
        expect(res.body.message).toEqual('method not allowed');
      }, 30000);

      it('should response forbidden if user is blocked', async () => {
        const res = await request(app)
          .post(activeEmailPath)
          .send({ email: 'block@mail.com' });

        expect(res.statusCode).toBe(403);
        expect(res.body.message).toEqual('forbidden');
      }, 30000);

      it('should throw if email not valid', async () => {
        const res = await request(app).post(activeEmailPath).send({
          email: 'user1@example',
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message');
      });
    });

    describe('Verify test', () => {
      let verifyToken: string;
      let verifyPath = `/api/v1/auth/verify/`;

      beforeEach(async () => {
        await request(app)
          .post('/api/v1/auth/active-email')
          .send({ email: 'test1@email.com' });
        const redisField = await redis.get('test1@email.com');
        const { token } = JSON.parse(<string>redisField);
        verifyToken = token;
      }, 30000);

      it('should return accessToken', async () => {
        const res = await request(app)
          .get(verifyPath + verifyToken)
          .send();

        cookieCredential = res.headers['set-cookie'];

        expect(res.statusCode).toEqual(201);
        expect(res.headers).toHaveProperty('set-cookie');
        expect(res.headers['set-cookie'].length).toBeGreaterThan(0);
        expect(res.headers['set-cookie'][1]).toMatch(
          /\bconnect\.sid=.*;\s*HttpOnly\b/
        );
        expect(res.body).toHaveProperty('accessToken');
      });
    });

    describe('Access Token', () => {
      const accessTokenPath = '/api/v1/auth/token';
      it('should return 200', async () => {
        const res = await request(app)
          .get(accessTokenPath)
          .set('Cookie', <string[]>cookieCredential)
          .send();

        accessToken = res.body.accessToken;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('accessToken');
      }, 30000);
    });

    describe('Set Password', () => {
      const setPasswordPath = '/api/v1/auth/set-password';
      it('should return 200', async () => {
        const res = await request(app)
          .post(setPasswordPath)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ password: 'secret', confirmPassword: 'secret' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ message: 'set password successfully' });
      });
    });

    describe('Login test', () => {
      let loginPath = '/api/v1/auth/login';

      it('should return accessToken and signed session cookie', async () => {
        const res = await request(app)
          .post(loginPath)
          .send({ email: 'test1@email.com', password: 'secret' });

        expect(res.statusCode).toEqual(200);
        expect(res.headers['set-cookie'].length).toBeGreaterThan(0);
      });

      it('should throw if email not found', async () => {
        const expectResult = { message: 'unauthorized' };

        const res = await request(app)
          .post(loginPath)
          .send({ email: 'test@mail.com', password: '1234' });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual(expectResult);
      });

      it('should throw if email is not valid', async () => {
        const expectResult = { message: 'bad request error' };

        const res = await request(app)
          .post(loginPath)
          .send({ email: 'test@mail', password: '1234' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expectResult);
      });

      it('should throw if pwd is empty', async () => {
        const expectResult = { message: 'bad request error' };

        const res = await request(app)
          .post(loginPath)
          .send({ email: 'test@mail', password: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expectResult);
      });
    });
  });
});
