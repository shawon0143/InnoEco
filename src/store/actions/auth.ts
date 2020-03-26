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
               // dispatch(authSuccess())
           } else {
               console.log(result);
           }
        });
    }
};
