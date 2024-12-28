import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TokensClient as _user_TokensClient, TokensDefinition as _user_TokensDefinition } from './user/Tokens';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    AccessToken: MessageTypeDefinition
    TokenInfo: MessageTypeDefinition
    Tokens: SubtypeConstructor<typeof grpc.Client, _user_TokensClient> & { service: _user_TokensDefinition }
  }
}

