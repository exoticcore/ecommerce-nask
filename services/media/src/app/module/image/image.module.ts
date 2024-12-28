import { Module } from '@nestjs/common';
import { MediaController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [MediaController],
  providers: [ImageService],
})
export class ImageModule {}
