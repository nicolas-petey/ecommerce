export interface AddressDto {
    idAddress: string;
    idUser: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

export interface CreateAddressDto {
    idUser: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

export interface UpdateAddressDto {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
}