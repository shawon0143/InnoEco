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
    isVerified: false,
    error: '',
    loading: false,
    token: ''
};

const authStart = (state: Auth, action: any) => {
    return updateObject(state, { error: null, loading: true });
};

const reducer = (state = initialState, action: AuthActions): Auth => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        default:
            return state;
    }
};

export default reducer;
