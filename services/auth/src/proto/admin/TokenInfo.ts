// Original file: proto/admin.proto


export interface TokenInfo {
  'id'?: (string);
  'givenName'?: (string);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'roles'?: (string)[];
  'permission'?: (string)[];
}

export interface TokenInfo__Output {
  'id': (string);
  'givenName': (string);
  'firstName': (string);
  'lastName': (string);
  'email': (string);
  'roles': (string)[];
  'permission': (string)[];
}
