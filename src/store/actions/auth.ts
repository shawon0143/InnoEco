import * as actionTypes from './actionTypes';
import { AuthActions } from "../types/authActionTypes";
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";

export const authStart = (): AuthActions => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token: string): AuthActions => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    error: '',
    loading: false
});

export const authFail = (err: string): AuthActions => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
        loading: false
    };
};

export const auth = (email: string, password: string) => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch(authStart());
        let data = { email: email, password: password };
        callApi('login', data, null, (err: any, result: any) => {
           if (err) {
               console.log(err);
               dispatch(authFail(err))
           } else {
               console.log(result);
               dispatch(authSuccess(result.token));
           }
        });
    }
};

export const verifyStart = (): AuthActions => {
    return {
        type: actionTypes.VERIFY_START
    }
};

export const verifySuccess = (): AuthActions => {
    return {
        type: actionTypes.VERIFY_SUCCESS,
        verifyError: '',
        verifyLoading: false
    }
};

export const verifyFail = (err: string): AuthActions => {
    return {
        type: actionTypes.VERIFY_FAIL,
        verifyError: err,
        verifyLoading: false
    }
};

export const verifyMe = (verifyToken: string) => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch(verifyStart());
        callApi('verifyAccount', null, {token: verifyToken}, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(verifyFail(err));
            } else {
                console.log(result);
                dispatch(verifySuccess());
            }
        });
    }
};
