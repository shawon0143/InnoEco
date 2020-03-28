import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../store/actions/index";
import {useParams} from "react-router";
import {AppState} from "../../store/configureStore";
import Spinner from "react-bootstrap/Spinner";
import {checkValidity} from "../../shared/utility";

interface IProps {}

const VerifyAccount: React.FC<IProps> = (props: IProps) => {
    const [email, setEmail] = useState( '');
    const [isValid, setIsValid] = useState(false);
    const verifyError = useSelector((state: AppState) => state.auth.verifyError);
    const verifyLoading = useSelector((state: AppState) => state.auth.verifyLoading);
    const resendTokenStatus = useSelector((state: AppState) => state.auth.resendTokenStatus);
    const resendTokenLoading = useSelector((state: AppState) => state.auth.resendTokenLoading);
    const dispatch = useDispatch();
    const { token } = useParams<{ token: string }>();
    useEffect(() => {
        dispatch(actions.verifyMe(token));
    }, [dispatch, token]);

    const resendTokenHandler = () => {
        if (isValid) {
            dispatch(actions.resendVerifyToken(email));
        }
    };

    const inputChangeHandler = (event : any) => {
        setIsValid(checkValidity(event.target.value, {isEmail: true, required: true}));
        setEmail(event.target.value);
    };
    return (
        <div className='container topNavMargin'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {verifyLoading ? (<Spinner animation="border" variant="secondary" />) : (
                        <div className='rounded p-4 p-md-5 mt-3 border text-center'>
                            <h6 className='text-dark'>
                                {verifyError !== '' ? verifyError : 'The account has been verified. Please log in.'}
                            </h6>
                            {verifyError !== '' && verifyError !== 'This user has already been verified.' && (
                                <div>
                                    <input
                                        type="email"
                                        className="InputElement"
                                        value={email}
                                        onChange={(e) => inputChangeHandler(e)}
                                        placeholder='Email address'
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => resendTokenHandler()}
                                        disabled={!isValid}
                                    >
                                        {resendTokenLoading ? (
                                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ): 'Resend Token'}
                                    </button>
                                    {resendTokenStatus !== '' && (
                                        <h6 className="text-success mt-3">{resendTokenStatus}</h6>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
