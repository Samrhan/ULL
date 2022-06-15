export enum SectionType {
    big = 'big',
    medium = 'medium',
    small = 'small',
    info = 'info',
}

export enum UserType {
    PROVIDER = 'provider',
    CUSTOMER = 'customer',
}

export enum PriceUnit {
    absolute = 'absolute',
    person = 'person',
    stack = 'stack',
}

export enum ProjectState {
    draft = 'draft',
    pending_validation = 'pending_validation',
    replacement = 'replacement',
    pending_payment = 'pending_payment',
    paid = 'paid',
}

export enum ReservationState {
  ADDED = 'added',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PAID = 'paid',
  CUSTOMER_CANCELLED = 'customer_cancelled',
  PROVIDER_CANCELLED = 'provider_cancelled',
}
