import { Logger, OnModuleInit } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { PrismaService } from '../prisma/prisma.service';

export class AmqpService implements OnModuleInit {
  public channelWrapper: ChannelWrapper;
  private readonly prisma: PrismaService;
  private readonly logger = new Logger(AmqpService.name);

  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel();
  }

  async onModuleInit() {
    await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertExchange('catalog_exchange', 'direct', {
        durable: true,
      });
      await channel.assertQueue('order_queue', { durable: true });
      await channel.bindQueue(
        'order_queue',
        'catalog_exchange',
        'order.created',
      );
    });

    await this.catalogConsumer();
  }

  async catalogConsumer() {
    await this.channelWrapper.consume('catalog_queue', async (message) => {
      this.logger.log(message.fields.routingKey);
      const content = message.content.toString();
      const jsonContent = JSON.parse(content);
      console.log(jsonContent);
      this.channelWrapper.ack(message);
    });
  }
}
