import * as actionTypes from './actionTypes';
import { AuthActions } from "../types/authActionTypes";
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";

// =====================================
// ========= Login account =============
// =====================================
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
               dispatch(authFail(err.message))
           } else {
               // console.log(result);
               dispatch(authSuccess(result.token));
           }
        });
    }
};
// =====================================
// ========= Verify account ============
// =====================================
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
                dispatch(verifyFail(err.message));
            } else {
                // console.log(result);
                dispatch(verifySuccess());
            }
        });
    }
};
// =====================================
// ========= Resend token ==============
// =====================================

export const resendTokenStart = (): AuthActions => {
    return {
        type: actionTypes.RESEND_TOKEN_START
    }
};

export const resendTokenFail = (err: string): AuthActions => {
    return {
        type: actionTypes.RESEND_TOKEN_FAIL,
        resendTokenStatus: err,
        resendTokenLoading: false
    }
};

export const resendTokenSuccess = (msg: string): AuthActions => {
    return {
        type: actionTypes.RESEND_TOKEN_SUCCESS,
        resendTokenStatus: msg,
        resendTokenLoading: false
    }
};

export const resendVerifyToken = (email: string) => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch(resendTokenStart());
        callApi('resendToken', {email: email}, null, (err: any, result: any, status: any) => {
           if (err) {
               console.log(err);
               dispatch(resendTokenFail(err.message));
           } else {
               // console.log(result);
               dispatch(resendTokenSuccess(result.message));

           }
        });
    }
};

// =====================================
// ========= Signup account ============
// =====================================

export const signupStart = (): AuthActions => {
    return {
        type: actionTypes.SIGNUP_START
    }
};

export const signupSuccess = (): AuthActions => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        signupError: '',
        signupLoading: false
    }
};

export const signupFail = (err: string): AuthActions => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        signupError: err,
        signupLoading: false
    }
};

export const signup = (data : {[index: string]:any}) => {
  return (dispatch: Dispatch<AuthActions>) => {
      dispatch(signupStart());
      callApi('signup', data, null, (err: any, result: any, status: any) => {
         if (err)  {
             console.log(err);
             dispatch(signupFail(err.message));
         } else {
             // console.log(result);
             if (status === 201) {
                 dispatch(signupSuccess());
             } else {
                 dispatch(signupFail(result.message));
             }
         }
      });
  }
};

export const setForgotPasswordStatus = (status: string): AuthActions => {
    return {
        type: actionTypes.SET_FORGOT_PASSWORD_STATUS,
        forgotPasswordStatus: status
    }
};

export const forgetPassword = (email: string) => {
  return (dispatch: Dispatch<AuthActions>) => {
    callApi('forgotPassword', {email: email}, null, (err: any, result: any) => {
       if (err) {
           console.log(err);
           dispatch(setForgotPasswordStatus(err.message));
       } else {
           // console.log(result);
           dispatch(setForgotPasswordStatus(result.message));
       }
    });
  }
};

export const setResetPasswordStatus = (status: string): AuthActions => {
    return {
        type: actionTypes.SET_RESET_PASSWORD_STATUS,
        resetPasswordStatus: status
    }
};

export const resetPassword = (password: string, token: string) => {
    return (dispatch: Dispatch<AuthActions>) => {
        callApi('resetPassword', {password: password}, {token: token}, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(setResetPasswordStatus(err.message));
            } else {
                // console.log(result);
                dispatch(setResetPasswordStatus(result.message));
            }
        });
    }
};

export const resetAuthFlags = () => {
  return {
      type: actionTypes.RESET_AUTH_FLAGS
  }
};
