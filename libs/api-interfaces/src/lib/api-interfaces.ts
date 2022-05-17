export interface RegisterProviderMessage {
  idProvider: string,
  password: string,
  email: string,
}

export interface RegisterCustomerMessage {
  oauth_sub: string,
  lastname: string,
  firstname: string,
  email: string,
}

export interface CheckUser {
  id: string;
}

export enum UserType {
  PROVIDER = 'provider',
  CUSTOMER = 'customer',
}

export interface JwtUser {
  id: string,
  userType: UserType,
  jti?: string,
}

export interface MinimalFile {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: Buffer,
  size: number
}

