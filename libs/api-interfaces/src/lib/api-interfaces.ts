import {PriceUnit, SectionType, UserType, ProjectState, ReservationState} from "./api-enums";

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

export interface Address {
    number: string,
    street: string,
    city: string,
    postal_code: string,
    complement?: string
}

export interface CheckUser {
    id: string;
}

export interface EditProviderInfoBody {
    company_name: string,
    company_description: string,
    email: string,
    phone: string,
    area_served: string,
    address: Address,
    profile_picture?: File,
    cover_picture?: File
}

export interface Performance {
    id_performance: string,
    performance_title: string,
    performance_description: string
    price: {
        value: number,
        unit: PriceUnit
    },
    picture: string,
    provider_id ?: string,
    deleted ?: boolean
}

export interface ProviderProfileSection {
  id_section: string,
  type: SectionType,
  section_title: string,
  section_description: string,
  purchasable: boolean,
  content: Performance[],
  preview_amount ?: number, // For "small" sections
  pictures ?: string[] // For "big" sections
}

export interface ProviderProfile {
    id_provider: string,
    company_name: string,
    company_description: string,
    area_served: string,
    cover_picture: string,
    profile_picture: string,
    rating: number,
    services: ProviderProfileSection[]
}

export interface ProviderCompanyInformation {
    company_name: string,
    company_description: string,
    email: string,
    phone: string,
    profile_picture: string,
    cover_picture: string,
    area_served: string,
    address: Address
}

export interface ReorderProviderProfileElement {
  id_section : string,
  id_performances : string[]
}

export type ReorderProviderProfileBody = Array<ReorderProviderProfileElement>

export interface UploadSectionBody {
  type: SectionType,
  section_title: string,
  section_description: string,
  purchasable: string,
  preview_amount? : string,
  pictures?: File[],
}

export interface UpdateSectionBody {
  id_section: string,
  section_title: string,
  section_description: string,
  purchasable: boolean,
  preview_amount? : number,
}

export interface CreatePerformanceBody {
  performance_title: string,
  performance_description: string,
  performance_picture: File,
  price_value: number,
  price_unit: PriceUnit,
  id_section: string,
}

export interface UpdatePerformanceBody {
  performance_id: string,
  performance_title: string,
  performance_description: string,
  performance_picture?: File,
  price_value: number,
  price_unit: PriceUnit,
}

export interface Project {
  project_id: string,
  name: string,
  customer_display_name: string,
  project_date: Date,
  description: string,
  image: string,
  amount_of_people: number,
  state: ProjectState,
  address: Address
}

export interface ReservationIdentifier {
  performance_id: string,
  project_id: string,
}

export interface Reservation {
  project: Project,
  performance : Performance,
  quantity : number,
  state : ReservationState,
  replacement_id ?: number,
  provider_id : string
}

export interface AnswerReservationRequestBody {
  performance_id: string,
  project_id: string,
  accepted: boolean
}
