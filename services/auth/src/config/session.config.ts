import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from './redis.config';

declare module 'express-session' {
  export interface SessionData {
    refreshToken: string;
    adminSession: string;
  }
}

const sessionConfig: session.SessionOptions = {
  store: new RedisStore({ client: redis }),
  secret: <string>process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
};

export { sessionConfig };
