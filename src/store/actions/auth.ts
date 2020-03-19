import * as actionTypes from './actionTypes';
import { AuthActions } from "../types/authActionTypes";
import axios from 'axios';

export const authStart = (): AuthActions => {
    return {
        type: actionTypes.AUTH_START
    }
};
