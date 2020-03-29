import React, {useState} from 'react';
import {checkValidity} from "../../shared/utility";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../store/actions/index"
import {AppState} from "../../store/configureStore";
import {useParams} from "react-router";

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState( '');
    const [isValid, setIsValid] = useState(false);
    const status = useSelector((state: AppState) => state.auth.resetPasswordStatus );
    const dispatch = useDispatch();
    const { token } = useParams<{ token: string }>();
    const inputChangeHandler = (event : any) => {
        setIsValid(checkValidity(event.target.value, {required: true, minLength: 4, maxLength: 12}));
        setPassword(event.target.value);
    };
    const resetPassword = () => {
        if (isValid) {
            dispatch(actions.resetPassword(password, token));
        }
    };
    return (
        <div className='container topNavMargin'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className='rounded p-4 p-md-5 mt-3 border text-center'>
                        <i className='icons icon-lock text-info' style={{fontSize: 30}}/>
                        <h3 className='font-weight-bold mb-5'>Reset Password</h3>
                        <input
                            type="password"
                            className="InputElement"
                            value={password}
                            onChange={(e) => inputChangeHandler(e)}
                            placeholder='New Password'
                        />
                        <button
                            type="button"
                            className="btn btn-danger mt-3"
                            onClick={() => resetPassword()}
                        >
                            Reset Password
                        </button>
                        {status !== '' && <h6 className='text-primary mt-3' style={{fontSize: '0.9rem'}}>{status}</h6>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
