export interface Address {
    "addressTitle"?: string;
    "street": string;
    "zipCode": string;
    "city": string;
    "country": string;
}
export interface Auth {
    "address": Address[],
    "email": string,
    "firstName": string,
    "lastName": string,
    "password": string,
    "role": string[],
    "mobile": string,
    "phone"?: string,
    "isVerified": boolean,
    "error": string;
    "loading": boolean;
}
