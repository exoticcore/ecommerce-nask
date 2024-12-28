import { DataSource } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE, NODE_ENV } =
  process.env;

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(<string>process.env.DB_PORT) || 5437,
  username: DB_USER || 'postgres',
  password: DB_PASS || 'mysecretpwd',
  database: DB_DATABASE || 'authentication',
  synchronize: true,
  logging: NODE_ENV === 'production',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
});
