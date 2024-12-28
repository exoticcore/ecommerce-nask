import { Logger, OnModuleInit } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

export class ShippingConsumer implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ShippingConsumer.name);

  constructor() {
    const connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = connection.createChannel();
  }

  async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.consume('order_queue', async (message) => {
          this.logger.log(message.fields);
          this.logger.log(message.properties);
          this.logger.log(message.content);
          channel.ack(message);
        });
      });
      this.logger.log(
        'Shipping Consumer service started and listening for messages.',
      );
    } catch (err) {
      this.logger.error('Error starting the shipping consumer', err);
    }
  }
}
