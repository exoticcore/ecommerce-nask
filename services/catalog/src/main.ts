import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1/catalog');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: [
      '*',
      'http://localhost:9000',
      'http://localhost:9001',
      'http://localhost:9002',
      'http://localhost:9003',
      'http://localhost:9004',
      'http://localhost:9005',
      'http://localhost:10000',
      'http://admin.nask.live',
    ],
    credentials: true,
  });

  await app.listen(configService.get('PORT') || 3001);
}
bootstrap();
