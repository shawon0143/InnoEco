import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from "../../components/SignupForm/SignupForm";

import './Auth.scss';
import LoginFormInfo from "../../components/LoginFormInfo/LoginFormInfo";

const Auth: React.FC = () => {
    const [showForm, setShowForm] = useState('login');
    const [isMobile, setIsMobile] = useState(false);
    const formViewChange = (formType: string) => {
        setShowForm(formType);
    };
    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 600);
        }, false);
    },[]);
    return (
        <div className="authContainer">
            <div className="container mainBoxWrapper">
                <div style={{ position: 'relative' }}>
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <div className="">
                                <h2 className="h1 mb-3">Sign in to InnoEco</h2>
                                <p>
                                    By signing in you will be authorized to
                                    access the `InnoEco` platform and its
                                    services. Use is subject to but not limited
                                    to the policies and guidelines listed below
                                    in{' '}
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a href="#" className="text-danger">
                                        Policies and guidelines
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-lg-5 order-md-2 signInFormWrapper" style={!isMobile ? {position: 'absolute'} : {}}>
                            {/* Login Form */}
                            {showForm === 'login' && <LoginForm createAccountClicked={(formType) => formViewChange(formType)}/>}
                            {/* Sign up Form */}
                            {showForm === 'signup' && <SignupForm signinClicked={(formType) => formViewChange(formType)}/>}
                            {/* Password reset Form */}

                            <hr className="hiddenLine" style={isMobile ? {display: 'block'} : {display: 'none'}} />
                        </div>
                        <div className="col-md-6 order-md-1 mb-5">
                            {/* Static Info */}
                            <LoginFormInfo/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;