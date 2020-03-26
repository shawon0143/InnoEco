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

export type AuthActionTypes =
    AuthStart
    | AuthSuccess
    | AuthFail
    | AuthLogout
    | VerifyStart
    | VerifySuccess
    | VerifyFail;

export type AuthActions = AuthActionTypes;
