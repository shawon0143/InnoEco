// export interface Address {
//     "addressTitle"?: string;
//     "street": string;
//     "zipCode": string;
//     "city": string;
//     "country": string;
// }
export interface Auth {
    "id": string;
    "error": string;
    "loading": boolean;
    "token": string;
    "firstName": string;
    "lastName": string;
    "role": string;
    "address": any;
    "mobile": string;
    "phone": string;
    "imageUrl": string;
    "email": string;
    "userDetailsById": {[id: string]: any};
    "saveUserDataLoading": boolean,
    "saveUserDataError": string,
    "verifyLoading": boolean;
    "verifyError": string;
    "signupLoading": boolean;
    "signupError": string;
    "resendTokenLoading": boolean;
    "resendTokenStatus": string;
    "forgotPasswordStatus": string;
    "resetPasswordStatus": string;
    "userDetailsLoading": boolean;
    "userDetailsError": string;
}
