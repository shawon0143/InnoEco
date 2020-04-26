import { Auth } from '../types/auth';
import { AuthActions } from '../types/authActionTypes';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import {TUserDetails} from "../types/knowledge";

const initialState: Auth = {
    id: '',
    error: '',
    loading: false,
    token: '',
    firstName: '',
    lastName: '',
    role: '',
    address: [],
    mobile: '',
    phone: '',
    email: '',
    userDetailsById: {},
    imageUrl: '',
    saveUserDataLoading: false,
    saveUserDataError: '',
    verifyLoading: false,
    verifyError: '',
    signupLoading: false,
    signupError: '',
    resendTokenLoading: false,
    resendTokenStatus: '',
    forgotPasswordStatus: '',
    resetPasswordStatus: '',
    userDetailsLoading: false,
    userDetailsError: ''
};

const authStart = (state: Auth, action: any) => {
    return updateObject(state, { error: '', loading: true });
};

const authSuccess = (state: Auth, action: any) => {
    return updateObject(state, {
        token: action.token,
        role: action.role,
        email: action.email,
        id: action.id,
        error: '',
        loading: false,
    });
};

const authFail = (state: Auth, action: any) => {
    return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state: Auth, action: any) => {
    return updateObject(state, {token: '', firstName: '', lastName: '', role: '', address: []});
};

const verifyStart = (state: Auth, action: any) => {
    return updateObject(state, { verifyError: '', verifyLoading: true });
};

const verifySuccess = (state: Auth, action: any) => {
    return updateObject(state, {verifyError: '', verifyLoading: false});
};

const verifyFail = (state: Auth, action: any) => {
    return updateObject(state, {verifyError: action.verifyError, verifyLoading: false });
};

const resendTokenStart = (state: Auth, action: any) => {
    return updateObject(state, {resendTokenStatus: '', resendTokenLoading: true});
};

const resendTokenSuccess = (state: Auth, action: any) => {
    return updateObject(state, {resendTokenStatus: action.resendTokenStatus, resendTokenLoading: false});
};

const resendTokenFail = (state: Auth, action: any) => {
    return updateObject(state, {resendTokenStatus: action.resendTokenStatus, resendTokenLoading: false});
};

const signupStart = (state: Auth, action: any) => {
    return updateObject(state, {signupError: '', signupLoading: true});
};

const signupSuccess = (state: Auth, action: any) => {
    return updateObject(state, {signupError: '', signupLoading: false});
};

const signupFail = (state: Auth, action: any) => {
    return updateObject(state, {signupError: action.signupError, signupLoading: false});
};

const resetAuthFlags = (state: Auth, action: any) => {
    return updateObject(state, {
        signupError: '',
        verifyError: '',
        loading: false,
        error: '',
        resendTokenStatus: '',
        forgotPasswordStatus: '',
        resetPasswordStatus: ''});
};

const setForgotPasswordStatus = (state: Auth, action: any) => {
    return updateObject(state, {forgotPasswordStatus: action.forgotPasswordStatus});
};

const setResetPasswordStatus = (state: Auth, action: any) => {
    return updateObject(state, {resetPasswordStatus: action.resetPasswordStatus})
};

const getUserDetailsStart = (state: Auth, action: any) => {
    return updateObject(state, { userDetailsError: '', userDetailsLoading: true });
};

const getUserDetailsSuccess = (state: Auth, action: any) => {
    return updateObject(state, {
        userDetailsError: '',
        userDetailsLoading: false,
        firstName: action.firstName,
        lastName: action.lastName,
        address: action.address,
        mobile: action.mobile,
        phone: action.phone,
        imageUrl: action.imageUrl
    })
};

const saveUserDataStart = (state: Auth, action: any) => {
    return updateObject(state, {saveUserDataError: '', saveUserDataLoading: true});
};
const saveUserDataSuccess = (state: Auth, action: any) => {
    return updateObject(state, {saveUserDataError: '', saveUserDataLoading: false});
};

const saveUserDataFail = (state: Auth, action: any) => {
    return updateObject(state, {saveUserDataError: action.saveUserDataError, saveUserDataLoading: false})
};

const loadUserDetailsById = (state: Auth, action: any) => {
    // console.log(action.allUser);
    let allUserNew: { [id: string]: TUserDetails } = {};
    for (let i = 0; i < action.allUser.user.length; i++) {
        allUserNew[action.allUser.user[i]._id] = Object.assign({}, action.allUser.user[i]);
    }
    return updateObject(state, {userDetailsById: allUserNew});
};

const reducer = (state = initialState, action: AuthActions): Auth => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.VERIFY_START: return verifyStart(state, action);
        case actionTypes.VERIFY_SUCCESS: return verifySuccess(state, action);
        case actionTypes.VERIFY_FAIL: return verifyFail(state, action);
        case actionTypes.RESEND_TOKEN_START: return resendTokenStart(state, action);
        case actionTypes.RESEND_TOKEN_SUCCESS: return resendTokenSuccess(state, action);
        case actionTypes.RESEND_TOKEN_FAIL: return resendTokenFail(state, action);
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.RESET_AUTH_FLAGS: return resetAuthFlags(state, action);
        case actionTypes.SET_FORGOT_PASSWORD_STATUS: return setForgotPasswordStatus(state, action);
        case actionTypes.SET_RESET_PASSWORD_STATUS: return setResetPasswordStatus(state, action);
        case actionTypes.GET_USER_DETAILS_START: return getUserDetailsStart(state, action);
        case actionTypes.GET_USER_DETAILS_SUCCESS: return getUserDetailsSuccess(state, action);
        case actionTypes.SAVE_USER_DATA_START: return saveUserDataStart(state, action);
        case actionTypes.SAVE_USER_DATA_SUCCESS: return saveUserDataSuccess(state, action);
        case actionTypes.SAVE_USER_DATA_FAIL: return saveUserDataFail(state, action);
        case actionTypes.LOAD_USER_DETAILS_BY_ID: return loadUserDetailsById(state, action);
        default:
            return state;
    }
};

export default reducer;
