import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageUrlUtils {
  private readonly media_domain: string;

  constructor(private readonly configService: ConfigService) {
    this.media_domain = this.configService.get('media_domain');
  }

  public imageUrl(url: string) {
    if (url && !url.startsWith('https://')) {
      return `${this.media_domain ? `${this.media_domain}/image/${url}` : 'http://localhost:3003/api/v1/media/image/'}${url}`;
    }

    return url;
  }
}
