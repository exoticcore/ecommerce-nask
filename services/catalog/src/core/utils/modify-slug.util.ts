import { Injectable } from '@nestjs/common';

@Injectable()
export class ModifySlugUtils {
  constructor() {}

  public modifySlug(slug: string) {
    const lowerCase = slug.toLowerCase();
    const newSlug = lowerCase.split(' ').join('-');

    return newSlug;
  }
}
