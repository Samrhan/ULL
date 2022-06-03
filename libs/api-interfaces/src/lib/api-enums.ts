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
