import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Role } from './role.enum';
import { ClientGrpc } from '@nestjs/microservices';

interface TokensService {
  verify(params: { token: string }): Observable<any>;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKENPROTO_PACKAGE') private client: ClientGrpc,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return false;

    const verifyService = this.client.getService<TokensService>('Tokens');
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

    if (!this.validateRoles(roles, resp.roles))
      throw new HttpException('Unauthorization error', HttpStatus.UNAUTHORIZED);

    return true;
  }

  validateRoles(roles: string[], userRoles: string[]) {
    return roles.some((role) => userRoles.includes(role));
  }
}
