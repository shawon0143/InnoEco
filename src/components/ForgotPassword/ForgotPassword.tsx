import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkValidity} from "../../shared/utility";
import Button from "../UI/Button/Button";
import './ForgotPassword.scss';
import * as actions from '../../store/actions/index';
import {AppState} from "../../store/configureStore";

interface IProps {
    loginClicked: (formType: string) => void;
}

const ForgotPassword: React.FC<IProps> = (props: IProps) => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const status = useSelector((state: AppState) =>
        state.auth.forgotPasswordStatus
    );
    const dispatch = useDispatch();
    const submitHandler = (event: any) => {
        event.preventDefault();
        if (isValid) {
            dispatch(actions.forgetPassword(email));
        }
    };
    const inputChangeHandler = (event : any) => {
        setIsValid(checkValidity(event.target.value, {isEmail: true, required: true}));
        setEmail(event.target.value);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="forgotPasswordWrapper">
                <div className="inputElementsWrapper">
                    <input
                        type="email"
                        className="InputElement"
                        value={email}
                        onChange={(e) => inputChangeHandler(e)}
                        placeholder='Email address'
                    />
                    <div className="d-flex justify-content-end my-3">
                        <Button btnType="Danger" disabled={false}>
                            Recover Password
                        </Button>
                    </div>
                    {status !== '' && <h6 className='text-primary' style={{fontSize: '0.9rem'}}>{status}</h6>}
                </div>
                <div className="text-center pt-4">
                    <p className="text-muted mb-0">Remember your password?
                        <span className="text-danger ml-1 loginLink"
                              onClick={() => props.loginClicked('login')}>Sign in
                        </span>
                    </p>
                </div>
            </div>
        </form>

    );
};

export default ForgotPassword;
