import * as grpc from '@grpc/grpc-js';
import { TokensHandlers } from '../proto/admin/Tokens';
import { AccessToken } from '../proto/admin/AccessToken';
import { TokenInfo } from '../proto/admin/TokenInfo';
import AccessAdmin from '../utils/admin-access';

const accessAdmin = new AccessAdmin();

export const adminGrpc: TokensHandlers = {
  async verify(
    call: grpc.ServerUnaryCall<AccessToken, TokenInfo>,
    callback: grpc.sendUnaryData<TokenInfo>
  ) {
    try {
      const accessToken = call.request.token;
      const accessType = call.request.access;
      if (accessToken) {
        const verifyAccess = await accessAdmin.verifyAccess(
          accessToken,
          accessType
        );

        if (verifyAccess) {
          return callback(null, {
            id: verifyAccess.id,
            givenName: 'given name na ja',
            firstName: verifyAccess.firstName || '',
            lastName: verifyAccess.lastName || '',
            email: verifyAccess.email,
            roles: verifyAccess.roles,
            permission: verifyAccess.permissions,
          });
        }

        return callback({
          code: grpc.status.UNAUTHENTICATED,
          message: 'unauthenticated error',
        });
      }
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: 'unauthenticated error',
      });
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        message: 'internal server error',
      });
    }
  },
};
