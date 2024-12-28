import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientGrpc } from '@nestjs/microservices';
import { Permission } from './permission.enum';
import { VerifyAdminService } from '../../../interface/verify-admin.grpc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('ADMIN_PROTO_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  async canActivate(context: ExecutionContext) {
    const permissions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    if (!permissions) return false;

    const verifyService = this.client.getService<VerifyAdminService>('Tokens');
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ');

    const resp: any = await lastValueFrom(
      verifyService.verify({
        token: token[1],
      }),
    ).catch(() => {
      return false;
    });

    if (!resp.roles || !resp.id) return false;

    if (!this.validatePermission(permissions, resp.permission))
      throw new HttpException('Unauthorization error', HttpStatus.UNAUTHORIZED);

    return true;
  }

  validatePermission(permissions: string[], amdinPermission: string[]) {
    return permissions.some((permission) =>
      amdinPermission.includes(permission),
    );
  }
}
