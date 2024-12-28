import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TokensClient as _admin_TokensClient, TokensDefinition as _admin_TokensDefinition } from './admin/Tokens';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  admin: {
    AccessToken: MessageTypeDefinition
    TokenInfo: MessageTypeDefinition
    Tokens: SubtypeConstructor<typeof grpc.Client, _admin_TokensClient> & { service: _admin_TokensDefinition }
  }
}

