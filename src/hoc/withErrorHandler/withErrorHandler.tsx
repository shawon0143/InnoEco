import * as React from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return (props: any) => {
        const [error, setError] = React.useState(null);

        const reqInterceptor = axios.interceptors.request.use((req: any) => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(
            (res: any) => res,
            (err: any) => {
                setError(err);
            }
        );

        React.useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };


        let errorMsg = (
            <div style={{minHeight: '20vh', background: 'white'}}>
                <div className="wrapper-message">
                    <i className="icons icon-exclamation" />
                    <h5>Oh no!</h5>
                    <small>
                        {
                        // @ts-ignore
                        error ? error.message : null
                        }
                    </small>
                </div>
            </div>
        );

        return (
            <React.Fragment>
                <Modal show={error !== null} modalClosed={errorConfirmedHandler}>
                    {error ? errorMsg : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;
