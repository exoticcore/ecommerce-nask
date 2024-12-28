import { Global, Module } from '@nestjs/common';
import { AmqpService } from './provider/amqp/amqp.service';
import { PrismaService } from './provider/prisma/prisma.service';

@Global()
@Module({
  providers: [AmqpService, PrismaService],
  exports: [AmqpService, PrismaService],
})
export class CoreModule {}
