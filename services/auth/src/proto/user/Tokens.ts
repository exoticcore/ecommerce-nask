// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccessToken as _user_AccessToken, AccessToken__Output as _user_AccessToken__Output } from '../user/AccessToken';
import type { TokenInfo as _user_TokenInfo, TokenInfo__Output as _user_TokenInfo__Output } from '../user/TokenInfo';

export interface TokensClient extends grpc.Client {
  verify(argument: _user_AccessToken, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_TokenInfo__Output>): grpc.ClientUnaryCall;
  verify(argument: _user_AccessToken, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_TokenInfo__Output>): grpc.ClientUnaryCall;
  verify(argument: _user_AccessToken, options: grpc.CallOptions, callback: grpc.requestCallback<_user_TokenInfo__Output>): grpc.ClientUnaryCall;
  verify(argument: _user_AccessToken, callback: grpc.requestCallback<_user_TokenInfo__Output>): grpc.ClientUnaryCall;
  
}

export interface TokensHandlers extends grpc.UntypedServiceImplementation {
  verify: grpc.handleUnaryCall<_user_AccessToken__Output, _user_TokenInfo>;
  
}

export interface TokensDefinition extends grpc.ServiceDefinition {
  verify: MethodDefinition<_user_AccessToken, _user_TokenInfo, _user_AccessToken__Output, _user_TokenInfo__Output>
}
