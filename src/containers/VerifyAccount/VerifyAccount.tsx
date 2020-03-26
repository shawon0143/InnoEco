import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../store/actions/index";
import {useParams} from "react-router";
import {AppState} from "../../store/configureStore";

interface IProps {

}

const VerifyAccount: React.FC<IProps> = (props: IProps) => {
    const verifyError = useSelector((state: AppState) =>
        state.auth.verifyError
    );
    const dispatch = useDispatch();
    const { token } = useParams<{ token: string }>();
    useEffect(() => {
        dispatch(actions.verifyMe(token));
    }, [dispatch, token]);
    return (
        <div>
            <h4 className='text-into'>
                {verifyError !== '' ? verifyError : 'The account has been verified. Please log in.'}
            </h4>
        </div>
    );
};

export default VerifyAccount;
