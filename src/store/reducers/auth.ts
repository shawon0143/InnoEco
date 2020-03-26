import { Auth } from '../types/auth';
import { AuthActions } from '../types/authActionTypes';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState: Auth = {
    address: [],
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: [],
    phone: '',
    mobile: '',
    error: '',
    loading: false,
    token: '',
    verifyLoading: false,
    verifyError: ''
};

const authStart = (state: Auth, action: any) => {
    return updateObject(state, { error: '', loading: true });
};

const authSuccess = (state: Auth, action: any) => {
    return updateObject(state, {
        token: action.token,
        error: '',
        loading: false,
    });
};

const authFail = (state: Auth, action: any) => {
    return updateObject(state, { error: action.error, loading: false });
};

const verifyStart = (state: Auth, action: any) => {
    return updateObject(state, { verifyError: '', verifyLoading: true });
};

const verifySuccess = (state: Auth, action: any) => {
    return updateObject(state, {verifyError: '', verifyLoading: false});
};

const verifyFail = (state: Auth, action: any) => {
    return updateObject(state, {verifyError: action.error, verifyLoading: false });
};
const reducer = (state = initialState, action: AuthActions): Auth => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.VERIFY_START: return verifyStart(state, action);
        case actionTypes.VERIFY_SUCCESS: return verifySuccess(state, action);
        case actionTypes.VERIFY_FAIL: return verifyFail(state, action);
        default:
            return state;
    }
};

export default reducer;
