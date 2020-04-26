import * as actionTypes from './actionTypes';
import {AuthActions} from "../types/authActionTypes";
import {callApi} from "../../shared/axios";
import {Dispatch} from "redux";
import configureStore from "../configureStore";
const { store } = configureStore();



// =====================================
// ========= Login account =============
// =====================================
export const authStart = (): AuthActions => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (data: any, email: string): AuthActions => ({
    type: actionTypes.AUTH_SUCCESS,
    token: data.token,
    role: data.role,
    email: email,
    id: data._id,
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

export const authLogout = (): AuthActions => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    return {
        type: actionTypes.AUTH_LOGOUT
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
               console.log(result);
               localStorage.setItem('token', result.token);
               localStorage.setItem('role', JSON.stringify(result.role));
               localStorage.setItem('email', email);
               localStorage.setItem('id', result._id);
               dispatch(authSuccess(result, email));
           }
        });
    }
};

// ===============================================
// ========= get user account details ============
// ===============================================

export const getUserDetailsStart = (): AuthActions => {
    return {
        type: actionTypes.GET_USER_DETAILS_START
    }
};

export const getUserDetailsSuccess = (data: any): AuthActions => {
    return {
        type: actionTypes.GET_USER_DETAILS_SUCCESS,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        mobile: data.mobile,
        phone: data.phone,
        imageUrl: data.imageUrl
    }
};

export const getUserDetailsFail = (err: string):AuthActions => {
    return {
        type: actionTypes.GET_USER_DETAILS_FAIL,
        userDetailsError: err
    }
};

export const getUserByEmail = () => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch(getUserDetailsStart());
        callApi('getUserDetails', null, {email: store.getState().auth.email},(err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(getUserDetailsFail(err));
            } else {
                // console.log(result);
                dispatch(getUserDetailsSuccess(result.user));
            }
        })

    }
};

// array or singleId
export const getUserById = (idList: string[]) => {
    return new Promise<any>( async (resolve, reject) => {
        await callApi('getUserByIdList', {idList: idList}, null, (err: any, result: any) => {
            if (err) {
                console.log(err);
                reject();
            } else {
                // console.log(result);
                resolve(result);
            }
        });
    });
};
// ========================================
// ========== Update user data ============
// ========================================

export const saveUserData = (dataObject: any) => {
    return (dispatch: Dispatch<AuthActions>) => {
        dispatch(saveUserDataStart());
        callApi('updateUser', dataObject, {email: store.getState().auth.email}, (err: any, result: any) => {
            if (err) {
                console.log(err);
                dispatch(saveUserDataFail(err.message));
            } else {
                dispatch(saveUserDataSuccess());
            }
        });
    };
};

export const saveUserDataStart = (): AuthActions => {
    return {
        type: actionTypes.SAVE_USER_DATA_START
    };
};

export const saveUserDataSuccess = (): AuthActions => {
    return {
        type: actionTypes.SAVE_USER_DATA_SUCCESS
    }
};

export const saveUserDataFail = (err: any): AuthActions => {
    return {
        type: actionTypes.SAVE_USER_DATA_FAIL,
        saveUserDataError: err
    }
};

export const deleteFile = (fileName: string) => {
    return () => {
        callApi('deleteFile', null, {fileName: fileName}, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
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

export const authCheckState = () => {
    return (dispatch: Dispatch<AuthActions>) => {
        const token = localStorage.getItem('token');
        if (token === '' || !token) {
            dispatch(authLogout());
        }
        else {
            const token = localStorage.getItem('token');
            const role: any = JSON.parse(localStorage.getItem('role') || "[]");
            const email = localStorage.getItem('email') || "";
            const id = localStorage.getItem('id') || "";
            let roleArray = [];
            for (let key in role) {
                if (role.hasOwnProperty(key)) {
                    roleArray.push(role[key]);
                }
            }
            let data = {
                token: token,
                role: roleArray,
                _id: id
            };
            dispatch(authSuccess(data, email));
        }
    };
};


export const loadUserDetailsById = (allUser: any): AuthActions => ({
    type: actionTypes.LOAD_USER_DETAILS_BY_ID,
    allUser: allUser
});
