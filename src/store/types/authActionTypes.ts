import * as actionTypes from '../actions/actionTypes';

export interface AuthStart {
    type: typeof actionTypes.AUTH_START;
}

export interface AuthSuccess {
    type: typeof actionTypes.AUTH_SUCCESS;
    token: string;
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

export type AuthActionTypes =
    AuthStart
    | AuthSuccess
    | AuthFail
    | AuthLogout
    | VerifyStart
    | VerifySuccess
    | VerifyFail
    | SignupStart
    | SignupSuccess
    | SignupFail
    | ResetAuthFlags;

export type AuthActions = AuthActionTypes;
