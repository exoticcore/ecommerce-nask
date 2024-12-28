import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.setGlobalPrefix('api/v1/media');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: [
      'http://localhost:9000',
      'http://localhost:9001',
      'http://localhost:9002',
      'http://localhost:9003',
      'http://localhost:9004',
      'http://localhost:9005',
      'http://admin.nask.live',
    ],
    credentials: true,
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT') || 3003);
}
bootstrap();
