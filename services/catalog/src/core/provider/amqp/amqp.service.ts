import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Injectable()
export class AmqpService implements OnModuleInit {
  public channelWrapper: ChannelWrapper;

  constructor(private readonly config: ConfigService) {
    const connection = amqp.connect([this.config.get('AMQP')]);
    this.channelWrapper = connection.createChannel();
  }

  async onModuleInit() {
    await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
      await channel.assertExchange('catalog_exchange', 'direct', {
        durable: true,
      });
      await channel.assertQueue('catalog_queue', { durable: true });
      await channel.bindQueue(
        'catalog_queue',
        'catalog_exchange',
        'catalog.created',
      );
    });
  }
}
