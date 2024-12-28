import { config } from 'dotenv';
config({ path: `.env` });

export const {
  NODE_ENV,
  LOG_FORMAT,
  LOG_DIR,
  PORT,
  DB_PORT,
  ORIGIN,
  COOKIE_SECRET,
  REDIS_PORT,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} = process.env;

const REFRESH_TIME = 30 * 24 * 60 * 60; // 30 Days
const ACCESS_TIME = 15 * 60; // 15 Minutes

export { REFRESH_TIME, ACCESS_TIME };
