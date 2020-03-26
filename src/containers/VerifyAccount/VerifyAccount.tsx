import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../store/actions/index";
import {useParams} from "react-router";
import {AppState} from "../../store/configureStore";
import Spinner from "react-bootstrap/Spinner";
interface IProps {

}

const VerifyAccount: React.FC<IProps> = (props: IProps) => {
    const verifyError = useSelector((state: AppState) =>
        state.auth.verifyError
    );
    const verifyLoading = useSelector((state: AppState) =>
        state.auth.verifyLoading
    );
    const dispatch = useDispatch();
    const { token } = useParams<{ token: string }>();
    useEffect(() => {
        dispatch(actions.verifyMe(token));
    }, [dispatch, token]);
    return (
        <div className='topNavMargin'>
            <div className="row">
                <div className="col text-center">
                    {verifyLoading ? (<Spinner animation="border" variant="secondary" />) : (
                        <div>
                            <h4 className='text-info'>
                                {verifyError !== '' ? verifyError : 'The account has been verified. Please log in.'}
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
