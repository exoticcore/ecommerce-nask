import { Global, Module } from '@nestjs/common';
import { S3Service } from './provider/s3aws/s3.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mongodb',
    //     host: 'localhost',
    //     port: 27017,
    //     username: 'root',
    //     password: 'example',
    //     database: 'media',
    //     authSource: 'admin',
    //     entities: [__dirname + '/**/*.entity.{ts,js}'],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: 'localhost',
    //   port: 27017,
    //   username: 'root',
    //   password: 'example',
    //   database: 'media',
    //   authSource: 'admin',
    //   entities: [__dirname + '../../**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    ClientsModule.registerAsync([
      {
        name: 'ADMIN_PROTO_PACKAGE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('GRPC_AUTH'),
            package: 'admin',
            protoPath: join(__dirname, '../../proto/admin.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [S3Service],
  exports: [S3Service, ClientsModule],
})
export class CoreModule {}
