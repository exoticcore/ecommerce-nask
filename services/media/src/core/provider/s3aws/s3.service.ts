import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucketName = this.configService.get('S3_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {
    const s3_region = this.configService.get('S3_REGION');

    if (!s3_region) {
      throw new Error('S3_REGION not found in environment variables');
    }

    this.client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async uploadSingleFile({
    buffer,
    mimetype,
    isPublic = true,
    path,
  }: {
    buffer: Buffer;
    mimetype: string;
    isPublic: boolean;
    path?: string;
  }) {
    try {
      const key = path || `media/uploads/${uuidv4()}`;
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${key}`,
        Body: buffer,
        ContentType: mimetype,
        ACL: isPublic ? 'public-read' : 'private',
      });

      await this.client.send(command);

      return {
        url: isPublic
          ? (await this.getFileUrl(key)).url
          : (await this.getPresignedSignedUrl(key)).url,
        key,
        isPublic,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getFileUrl(key: string) {
    return { url: `https://${this.bucketName}.s3.amazonaws.com/${key}` };
  }

  async getPresignedSignedUrl(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 60 * 60 * 24, // 24 hours
      });

      return { url };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getObject(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.client.send(command);

      const object = response;

      return object;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.client.send(command);

      return { message: 'File deleted successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
