export interface RegisterMessage {
  idProvider: string,
  password: string,
  email: string,
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
