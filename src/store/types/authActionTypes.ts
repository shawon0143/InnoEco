import * as actionTypes from '../actions/actionTypes';
import {TUserDetails} from "./knowledge";

export interface AuthStart {
    type: typeof actionTypes.AUTH_START;
}

export interface AuthSuccess {
    type: typeof actionTypes.AUTH_SUCCESS;
    token: string;
    role: string[];
    email: string;
    id: string;
    error: string;
    loading: boolean;
}

export interface AuthFail {
    type: typeof actionTypes.AUTH_FAIL;
    error: string;
    loading: boolean;
}

export interface AuthLogout {
    type: typeof actionTypes.AUTH_LOGOUT;
}

export interface VerifyStart {
    type: typeof actionTypes.VERIFY_START;
}

export interface VerifySuccess {
    type: typeof actionTypes.VERIFY_SUCCESS;
    verifyError: string;
    verifyLoading: boolean;
}

export interface VerifyFail {
    type: typeof actionTypes.VERIFY_FAIL;
    verifyError: string;
    verifyLoading: boolean;
}

export interface ResendTokenStart {
    type: typeof actionTypes.RESEND_TOKEN_START;
}

export interface ResendTokenSuccess {
    type: typeof actionTypes.RESEND_TOKEN_SUCCESS;
    resendTokenStatus: string;
    resendTokenLoading: boolean;
}

export interface ResendTokenFail {
    type: typeof actionTypes.RESEND_TOKEN_FAIL;
    resendTokenStatus: string;
    resendTokenLoading: boolean;
}

export interface SignupStart {
    type: typeof actionTypes.SIGNUP_START;
}

export interface SignupSuccess {
    type: typeof actionTypes.SIGNUP_SUCCESS;
    signupError: string;
    signupLoading: boolean;
}

export interface SignupFail {
    type: typeof actionTypes.SIGNUP_FAIL;
    signupError: string;
    signupLoading: boolean;
}

export interface ResetAuthFlags {
    type: typeof actionTypes.RESET_AUTH_FLAGS;
}

export interface SetForgotPasswordStatus {
    type: typeof actionTypes.SET_FORGOT_PASSWORD_STATUS;
    forgotPasswordStatus: string;
}

export interface SetResetPasswordStatus {
    type: typeof actionTypes.SET_RESET_PASSWORD_STATUS;
    resetPasswordStatus: string;
}

export interface GetUserDetailsStart {
    type: typeof actionTypes.GET_USER_DETAILS_START;
}

export interface GetUserDetailsSuccess {
    type: typeof actionTypes.GET_USER_DETAILS_SUCCESS;
    firstName: string;
    lastName: string;
    address: [{}];
    mobile: string;
    phone: string;
    imageUrl: string;
}

export interface GetUserDetailsFail {
    type: typeof actionTypes.GET_USER_DETAILS_FAIL;
    userDetailsError: string;
}

export interface SaveUserDataStart {
    type: typeof actionTypes.SAVE_USER_DATA_START;
}

export interface SaveUserDataSuccess {
    type: typeof actionTypes.SAVE_USER_DATA_SUCCESS;
}

export interface SaveUserDataFail {
    type: typeof actionTypes.SAVE_USER_DATA_FAIL;
    saveUserDataError: string;
}

export interface LoadUserDetailsById {
    type: typeof actionTypes.LOAD_USER_DETAILS_BY_ID;
    allUser: TUserDetails[]
}

export type AuthActionTypes =
    AuthStart
    | AuthSuccess
    | AuthFail
    | AuthLogout
    | VerifyStart
    | VerifySuccess
    | VerifyFail
    | ResendTokenStart
    | ResendTokenSuccess
    | ResendTokenFail
    | SignupStart
    | SignupSuccess
    | SignupFail
    | ResetAuthFlags
    | SetForgotPasswordStatus
    | SetResetPasswordStatus
    | GetUserDetailsStart
    | GetUserDetailsSuccess
    | GetUserDetailsFail
    | SaveUserDataStart
    | SaveUserDataSuccess
    | SaveUserDataFail
    | LoadUserDetailsById;

export type AuthActions = AuthActionTypes;
