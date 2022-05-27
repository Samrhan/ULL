export interface RegisterMessage {
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


export interface RegisterCustomerMessage {
  oauth_sub: string,
  lastname: string,
  firstname: string,
  email: string,
}

export interface CheckUser {
  id: string;
}


export interface RegisterProviderRequestBody {
  company_name: string,
  email: string,
  password: string,
  phone: string,
  siren: string
}

export interface LoginProviderRequestBody {
  email: string,
  password: string
}

export interface RequestResetPasswordProviderBody {
  email: string
}

export interface EnactResetPasswordProviderBody {
  new_password: string,
  reset_token: string
}

export interface ChangePasswordProviderBody {
  old_password: string,
  new_password: string
}
