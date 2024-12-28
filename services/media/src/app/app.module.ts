import { Module } from '@nestjs/common';
import { ImageModule } from './module/image/image.module';
import { CoreModule } from '../core/core.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'root',
      password: 'example',
      database: 'media',
      authSource: 'admin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ImageModule,
    CoreModule,
  ],
})
export class AppModule {}
