import { Injectable } from '@nestjs/common';
import { S3Service } from '../../../core/provider/s3aws/s3.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { UploadImageDto } from './dto/image.upload.dto';
import { v4 as uuidv4 } from 'uuid';
import { extension } from 'mime-types';
import * as sharp from 'sharp';
import { ImageNameDto } from './dto/image.name.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageEntity: Repository<Image>,
    private readonly s3Service: S3Service,
  ) {}

  async uploadImage(file: Express.Multer.File, data: UploadImageDto) {
    const file_type = extension(file.mimetype);
    const image_name = await this.checkAndRenameImage(data.name, file_type);
    const path = `media/image/${uuidv4()}`;
    const file_name = `${image_name}`;
    const key = `${path}/${file_name}`;
    const sizes = [0.8, 0.5, 0.2];

    let large_name: string;
    let medium_name: string;
    let small_name: string;

    sizes.map(async (size, i) => {
      const { buffer, width, height } = await this.resizeImage(file, size);
      let size_file_name: string;

      switch (i) {
        case 0:
          large_name = 'large';
          size_file_name = 'large';
          break;
        case 1:
          medium_name = 'medium';
          size_file_name = 'medium';
          break;
        case 2:
          small_name = 'small';
          size_file_name = 'small';
          break;
        default:
          size_file_name = `${width}x${height}`;
      }

      await this.s3Service.uploadSingleFile({
        buffer: await buffer,
        mimetype: file.mimetype,
        isPublic: true,
        path: `${path}/${size_file_name}.${file_type}`,
      });
    });
    const url = await this.s3Service.uploadSingleFile({
      buffer: file.buffer,
      mimetype: file.mimetype,
      isPublic: true,
      path: `${key}`,
    });
    console.log(url);

    const created = this.imageEntity.create({
      name: image_name,
      detail: data.detail,
      description: data.description,
      path: path,
      filetype: file.mimetype,
      large_name: `${large_name}.${file_type}`,
      medium_name: `${medium_name}.${file_type}`,
      small_name: `${small_name}.${file_type}`,
    });

    const saved = await this.imageEntity.save(created);

    return saved;
  }

  async uploadMultipartImage(files: Array<Express.Multer.File>) {
    files.map(async (file) => {
      const url = await this.s3Service.uploadSingleFile({
        buffer: file.buffer,
        mimetype: file.mimetype,
        isPublic: true,
      });
      console.log(url);

      const created = this.imageEntity.create({
        name: 'test name',
        description: 'test description',
        detail: 'test detail',
        isPublic: true,
        path: `/test/path/file.png`,
        created_by: 'test user',
      });

      const saved = await this.imageEntity.save(created);

      console.log(saved);

      const find = await this.imageEntity.find();
      console.log(find);
    });

    return true;
  }

  async listImage() {
    const images = await this.imageEntity.find();

    return images;
  }

  async getImage(image_name: string, view?: string) {
    const isImage = await this.imageEntity.findOne({
      where: { name: image_name },
    });

    if (!isImage) return false;

    if (view && isImage.small_name) {
      return await this.s3Service.getObject(
        `${isImage.path}/${isImage.small_name}`,
      );
    }
    const object = await this.s3Service.getObject(
      `${isImage.path}/${isImage.name}`,
    );

    return object;
  }

  async checkImageName(data: ImageNameDto) {
    const file_type = extension(data.file_type);
    const file_name = `${data.image_name}.${file_type}`;
    console.log(file_name);
    const isImage = await this.imageEntity.findOne({
      where: { name: file_name },
    });

    if (!isImage) return true;

    return false;
  }

  public async deleteImage(image_name: string) {
    const isImage = await this.imageEntity.findOne({
      where: { name: image_name },
    });
    if (!isImage) return null;

    const s3_message = await this.s3Service.deleteFile(isImage.path);
    console.log(s3_message);
    const deleted = await this.imageEntity.delete({ id: isImage.id });

    return deleted;
  }

  private async checkAndRenameImage(image_name: string, file_type: string) {
    const isImage = await this.imageEntity.findOne({
      where: { name: `${image_name}.${file_type}` },
    });

    if (!isImage) return `${image_name}.${file_type}`;

    let new_name: string;
    let i: number = 1;
    let pass: boolean = false;
    while (!pass) {
      new_name = `${image_name}${i}.${file_type}`;
      const checkName = await this.imageEntity.findOne({
        where: { name: new_name },
      });

      if (checkName) {
        i++;
      } else {
        pass = true;
      }
    }

    return new_name;
  }

  private async resizeImage(file: Express.Multer.File, scale: number) {
    const image = sharp(file.buffer);
    const metadata = await image.metadata();
    const new_width = Math.round(metadata.width * scale);
    const new_height = Math.round(metadata.height * scale);

    const new_image = sharp(file.buffer)
      .resize({
        width: new_width,
        height: new_height,
      })
      .toBuffer();

    return { buffer: new_image, width: new_width, height: new_height };
  }
}
