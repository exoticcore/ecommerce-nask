import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'stream';
import { UploadImageDto } from './dto/image.upload.dto';
import { AuthGuard } from '../../../core/guard/auth/auth.guard';
import { PermissionGuard } from '../../../core/guard/permission/permission.guard';
import { Permissions } from '../../../core/guard/permission/permission';
import { Permission } from '../../../core/guard/permission/permission.enum';
import { ImageNameDto } from './dto/image.name.dto';
@Controller('/image')
export class MediaController {
  constructor(private readonly imageService: ImageService) {}

  @Permissions(Permission.ImageRead)
  @UseGuards(AuthGuard, PermissionGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/name')
  async checkName(@Body() body: ImageNameDto) {
    const isAvailable = await this.imageService.checkImageName(body);

    if (!isAvailable)
      throw new HttpException('bad request error', HttpStatus.BAD_REQUEST);

    return true;
  }

  @Permissions(Permission.ImageCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('/multipart')
  async uploadImage(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg|webp)',
        })
        .build({ errorHttpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR }),
    )
    files: Array<Express.Multer.File>,
  ) {
    await this.imageService.uploadMultipartImage(files);

    return { message: 'recieved file' };
  }

  @Permissions(Permission.ImageCreate)
  @UseGuards(AuthGuard, PermissionGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/')
  async uploadSingleMedia(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() body: UploadImageDto,
  ) {
    const result = await this.imageService.uploadImage(file, body);
    console.log(result);

    return { message: 'recieved file' };
  }

  @Permissions(Permission.ImageRead)
  @UseGuards(AuthGuard, PermissionGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async listsImage() {
    const images = await this.imageService.listImage();

    return images;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:file_name')
  async getImage(
    @Res() res: Response,
    @Param('file_name') file_name: string,
    @Query('view') view?: string,
  ) {
    const result = await this.imageService.getImage(file_name, view);

    if (!result)
      throw new HttpException('Bad Request Error', HttpStatus.BAD_REQUEST);

    res.setHeader('content-length', result.ContentLength);
    res.setHeader('content-type', result.ContentType);
    res.setHeader('accept-ranges', result.AcceptRanges);
    res.setHeader('etag', result.ETag);
    res.status(result.$metadata.httpStatusCode);
    return (result.Body as Readable).pipe(res);
  }

  @Permissions(Permission.ImageDelete)
  @UseGuards(AuthGuard, PermissionGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:file_name')
  async deleteAllImageDatabase(@Param('file_name') file_name: string) {
    const deleted = await this.imageService.deleteImage(file_name);
    if (!deleted)
      throw new HttpException('Bad Request Error', HttpStatus.BAD_REQUEST);

    return true;
  }
}
