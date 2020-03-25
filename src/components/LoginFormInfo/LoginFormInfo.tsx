import React from 'react';

const LoginFormInfo = () => {
    return (
        <div style={{ maxWidth: 400 }}>
            <div className="media align-items-center mb-4">
                <div className="d-flex mr-4">
                    <span className="circleIcon rounded-circle">
                        <i className="icons icon-ghost icon" />
                    </span>
                </div>
                <div className="media-body">
                    <p className="mb-0">
                        Watch out for sites or emails that{' '}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="text-danger">
                            pretend to be legitimate
                        </a>{' '}
                        and ask for your ID and password.
                    </p>
                </div>
            </div>
            <div className="media align-items-center mb-4">
                <div className="d-flex mr-4">
                    <span className="circleIcon rounded-circle">
                        <i className="icons icon-flag icon" />
                    </span>
                </div>
                <div className="media-body">
                    <p className="mb-0">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="text-danger">
                            Report suspicious requests
                        </a>{' '}
                        for your ID and password.
                    </p>
                </div>
            </div>
            <div className="media align-items-center">
                <div className="d-flex mr-4">
                    <span className="circleIcon rounded-circle">
                        <i className="icons icon-shield icon" />
                    </span>
                </div>
                <div className="media-body">
                    <p className="mb-0">
                        Learn more about{' '}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="text-danger">
                            how to protect your account and computer
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginFormInfo;
