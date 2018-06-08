export interface IProfile {
    name: string;
    email: string;
    primaryPhone: string;
    secondaryPhone: string;
    address: IAddress;
    headline: string;
    summary: string;
}

export class IAddress {
    city: string;
    state: string;
    zipCode: string;
}