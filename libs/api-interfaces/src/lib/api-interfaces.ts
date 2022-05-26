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

export interface Performance {
  id_performance: string,
  performance_title: string,
  performance_description: string
  price: {
    value: number,
    unit: "absolute" | "person" | "stack"
  },
  picture: string,
}

export enum ProviderSectionType {
  big = "big",
  medium = "medium",
  small = "small",
  info = "info"
}

export interface ProviderProfileSection {
  id_section: string,
  type: ProviderSectionType,
  section_title: string,
  section_description: string,
  content ?: [Performance], // In case of "info" section this property is absent
  preview_amount ?: number, // For "small" sections
  pictures ?: [string] // For "big" sections
}

export interface ProviderProfile {
  id_provider: string,
  company_name: string,
  company_description: string,
  area_served: string,
  cover_picture: string,
  profile_picture: string,
  rating: number,
  services: [ProviderProfileSection]
}
