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
