// Original file: proto/admin.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccessToken as _admin_AccessToken, AccessToken__Output as _admin_AccessToken__Output } from '../admin/AccessToken';
import type { TokenInfo as _admin_TokenInfo, TokenInfo__Output as _admin_TokenInfo__Output } from '../admin/TokenInfo';

export interface TokensClient extends grpc.Client {
  verify(argument: _admin_AccessToken, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_admin_TokenInfo__Output>): grpc.ClientUnaryCall;
  verify(argument: _admin_AccessToken, metadata: grpc.Metadata, callback: grpc.requestCallback<_admin_TokenInfo__Output>): grpc.ClientUnaryCall;
  verify(argument: _admin_AccessToken, options: grpc.CallOptions, callback: grpc.requestCallback<_admin_TokenInfo__Output>): grpc.ClientUnaryCall;
  verify(argument: _admin_AccessToken, callback: grpc.requestCallback<_admin_TokenInfo__Output>): grpc.ClientUnaryCall;
  
}

export interface TokensHandlers extends grpc.UntypedServiceImplementation {
  verify: grpc.handleUnaryCall<_admin_AccessToken__Output, _admin_TokenInfo>;
  
}

export interface TokensDefinition extends grpc.ServiceDefinition {
  verify: MethodDefinition<_admin_AccessToken, _admin_TokenInfo, _admin_AccessToken__Output, _admin_TokenInfo__Output>
}
