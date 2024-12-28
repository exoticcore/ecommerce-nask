import { Global, Module } from '@nestjs/common';
import { PrismaService } from './provider/prisma/prisma.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AmqpService } from './provider/amqp/amqp.service';
import { ModifySlugUtils } from './utils/modify-slug.util';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageUrlUtils } from './utils/image-url.util';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ADMIN_PROTO_PACKAGE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('GRPC_AUTH'),
            package: 'admin',
            protoPath: join(__dirname, '../../../proto/admin.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    PrismaService,
    HttpExceptionFilter,
    AmqpService,
    ModifySlugUtils,
    ImageUrlUtils,
  ],
  exports: [
    PrismaService,
    HttpExceptionFilter,
    AmqpService,
    ModifySlugUtils,
    ImageUrlUtils,
    ClientsModule,
  ],
})
export class CoreModule {}
