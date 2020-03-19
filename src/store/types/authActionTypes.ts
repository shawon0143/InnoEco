import * as actionTypes from '../actions/actionTypes';

export interface AuthStart {
    type: typeof actionTypes.AUTH_START;
}

export interface AuthSuccess {
    type: typeof actionTypes.AUTH_SUCCESS;
    userName: string;
    sessionToken: string;
    userLevel: string;
}

export interface AuthFail {
    type: typeof actionTypes.AUTH_FAIL;
    error: string;
}

export interface AuthLogout {
    type: typeof actionTypes.AUTH_LOGOUT;
}

export type AuthActionTypes = AuthStart | AuthSuccess | AuthFail | AuthLogout;

export type AuthActions = AuthActionTypes;
