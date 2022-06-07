export enum SectionType {
    BIG = 'big',
    MEDIUM = 'medium',
    SMALL = 'small',
    INFO = 'info',
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
  PAYED = 'payed',
  CUSTOMER_CANCELLED = 'customer_cancelled',
  PROVIDER_CANCELLED = 'provider_cancelled',
}
