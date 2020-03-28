import React from 'react';
import { connect } from "react-redux";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import './SignupForm.scss';
import {Auth} from "../../store/types/auth";
import {AppState} from "../../store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {AuthActions} from "../../store/types/authActionTypes";
import * as actions from "../../store/actions";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";

interface IProps {
    signinClicked: (formType: string) => void;
}

export interface input {
    elementType: string;
    elementConfig: {
        type: string;
        label: string;
    };
    value: string;
    validation: {
        required?: boolean;
        isEmail?: boolean;
        minLength?: number;
        maxLength?: number;
        isNumeric?: boolean;
        isPhoneOrFaxNumber?: boolean;
        isImageTypeValid?: boolean;
    };
    valid: boolean;
    touched: boolean;
    autoFocus: boolean;
    placeholder: string;
}

type IState = {
    signupForm: {
        firstName: input;
        lastName: input;
        street: input;
        zipCode: input;
        city: input;
        country: input;
        mobile: input;
        phone: input;
        email: input;
        password: input;
    },
    formIsValid: boolean,
    showModal: boolean
};

const initialState = {
    signupForm: {
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'First Name*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Sherlock'
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Last Name*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Holmes'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Street*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: '221b Baker street'
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Zip Code*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'NW1 6XE'
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'City*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'London'
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Country*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'UK'
        },
        mobile: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Mobile*',
            },
            value: '',
            validation: {
                required: true,
                isNumeric: true
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: '12345678'
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Phone',
            },
            value: '',
            validation: {
            },
            valid: true,
            touched: false,
            autoFocus: false,
            placeholder: '12345678'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Email*',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'john@gmail.com'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'Password*',
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 12
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: '*********'
        }
    },
    formIsValid: false,
    showModal: false
};

type Props = LinkDispatchProps & LinkStateProps & IProps;

class SignupForm extends React.Component<Props, IState> {
    state: Readonly<IState> = initialState;

    submitHandler = (event: any) => {
        event.preventDefault();
        const formData: any = {};
        for (let formElementIdentifier in this.state.signupForm) {
            // @ts-ignore
            formData[formElementIdentifier] = this.state.signupForm[formElementIdentifier].value;
        }
        this.props.onSignup(formData);
        this.setState({showModal: true});
    };

    resetForm = () => {
        this.setState(initialState);
    };

    inputChangedHandler = (event: any, inputIdentifier: any) => {
        // @ts-ignore
        const updatedSignupFormElement = updateObject(this.state.signupForm[inputIdentifier], {
            value: event.target.value,
            // @ts-ignore
            valid: checkValidity(event.target.value, this.state.signupForm[inputIdentifier].validation),
            touched: true
        });
        const updatedSignupForm = updateObject(this.state.signupForm, {[inputIdentifier]: updatedSignupFormElement});
        let formIsValid = true;
        for (let inputIdentifier in updatedSignupForm) {
            if (updatedSignupForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
            }
        }
        this.setState({
            signupForm: updatedSignupForm,
            formIsValid: formIsValid
        });
    };
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="signupFormWrapper">
                    <div className="inputElementsWrapper">
                        {/* ======= First Name ====== */}
                        <Input
                            elementType={this.state.signupForm.firstName.elementType}
                            elementConfig={this.state.signupForm.firstName.elementConfig}
                            value={this.state.signupForm.firstName.value}
                            changed={(event) => this.inputChangedHandler(event, 'firstName')}
                            invalid={!this.state.signupForm.firstName.valid}
                            shouldValidate={this.state.signupForm.firstName.validation}
                            touched={this.state.signupForm.firstName.touched}
                            autoFocus={this.state.signupForm.firstName.autoFocus}
                            placeholder={this.state.signupForm.firstName.placeholder}
                        />
                        {/* ======== Last Name ========= */}
                        <Input
                            elementType={this.state.signupForm.lastName.elementType}
                            elementConfig={this.state.signupForm.lastName.elementConfig}
                            value={this.state.signupForm.lastName.value}
                            changed={(event) => this.inputChangedHandler(event, 'lastName')}
                            invalid={!this.state.signupForm.lastName.valid}
                            shouldValidate={this.state.signupForm.lastName.validation}
                            touched={this.state.signupForm.lastName.touched}
                            autoFocus={this.state.signupForm.lastName.autoFocus}
                            placeholder={this.state.signupForm.lastName.placeholder}
                        />
                        {/* ========== Street ========= */}
                        <Input
                            elementType={this.state.signupForm.street.elementType}
                            elementConfig={this.state.signupForm.street.elementConfig}
                            value={this.state.signupForm.street.value}
                            changed={(event) => this.inputChangedHandler(event, 'street')}
                            invalid={!this.state.signupForm.street.valid}
                            shouldValidate={this.state.signupForm.street.validation}
                            touched={this.state.signupForm.street.touched}
                            autoFocus={this.state.signupForm.street.autoFocus}
                            placeholder={this.state.signupForm.street.placeholder}
                        />
                        {/* ========== Zip Code ======== */}
                        <Input
                            elementType={this.state.signupForm.zipCode.elementType}
                            elementConfig={this.state.signupForm.zipCode.elementConfig}
                            value={this.state.signupForm.zipCode.value}
                            changed={(event) => this.inputChangedHandler(event, 'zipCode')}
                            invalid={!this.state.signupForm.zipCode.valid}
                            shouldValidate={this.state.signupForm.zipCode.validation}
                            touched={this.state.signupForm.zipCode.touched}
                            autoFocus={this.state.signupForm.zipCode.autoFocus}
                            placeholder={this.state.signupForm.zipCode.placeholder}
                        />
                        {/* ======== City ============== */}
                        <Input
                            elementType={this.state.signupForm.city.elementType}
                            elementConfig={this.state.signupForm.city.elementConfig}
                            value={this.state.signupForm.city.value}
                            changed={(event) => this.inputChangedHandler(event, 'city')}
                            invalid={!this.state.signupForm.city.valid}
                            shouldValidate={this.state.signupForm.city.validation}
                            touched={this.state.signupForm.city.touched}
                            autoFocus={this.state.signupForm.city.autoFocus}
                            placeholder={this.state.signupForm.city.placeholder}
                        />
                        {/* ======== Country =========== */}
                        <Input
                            elementType={this.state.signupForm.country.elementType}
                            elementConfig={this.state.signupForm.country.elementConfig}
                            value={this.state.signupForm.country.value}
                            changed={(event) => this.inputChangedHandler(event, 'country')}
                            invalid={!this.state.signupForm.country.valid}
                            shouldValidate={this.state.signupForm.country.validation}
                            touched={this.state.signupForm.country.touched}
                            autoFocus={this.state.signupForm.country.autoFocus}
                            placeholder={this.state.signupForm.country.placeholder}
                        />
                        {/* ========= Mobile =========== */}
                        <Input
                            elementType={this.state.signupForm.mobile.elementType}
                            elementConfig={this.state.signupForm.mobile.elementConfig}
                            value={this.state.signupForm.mobile.value}
                            changed={(event) => this.inputChangedHandler(event, 'mobile')}
                            invalid={!this.state.signupForm.mobile.valid}
                            shouldValidate={this.state.signupForm.mobile.validation}
                            touched={this.state.signupForm.mobile.touched}
                            autoFocus={this.state.signupForm.mobile.autoFocus}
                            placeholder={this.state.signupForm.mobile.placeholder}
                        />
                        {/* ========== Phone ============= */}
                        <Input
                            elementType={this.state.signupForm.phone.elementType}
                            elementConfig={this.state.signupForm.phone.elementConfig}
                            value={this.state.signupForm.phone.value}
                            changed={(event) => this.inputChangedHandler(event, 'phone')}
                            invalid={!this.state.signupForm.phone.valid}
                            shouldValidate={this.state.signupForm.phone.validation}
                            touched={this.state.signupForm.phone.touched}
                            autoFocus={this.state.signupForm.phone.autoFocus}
                            placeholder={this.state.signupForm.phone.placeholder}
                        />
                        {/* ========= Email ============== */}
                        <Input
                            elementType={this.state.signupForm.email.elementType}
                            elementConfig={this.state.signupForm.email.elementConfig}
                            value={this.state.signupForm.email.value}
                            changed={(event) => this.inputChangedHandler(event, 'email')}
                            invalid={!this.state.signupForm.email.valid}
                            shouldValidate={this.state.signupForm.email.validation}
                            touched={this.state.signupForm.email.touched}
                            autoFocus={this.state.signupForm.email.autoFocus}
                            placeholder={this.state.signupForm.email.placeholder}
                        />
                        {/* ========= Password ============ */}
                        <Input
                            elementType={this.state.signupForm.password.elementType}
                            elementConfig={this.state.signupForm.password.elementConfig}
                            value={this.state.signupForm.password.value}
                            changed={(event) => this.inputChangedHandler(event, 'password')}
                            invalid={!this.state.signupForm.password.valid}
                            shouldValidate={this.state.signupForm.password.validation}
                            touched={this.state.signupForm.password.touched}
                            autoFocus={this.state.signupForm.password.autoFocus}
                            placeholder={this.state.signupForm.password.placeholder}
                        />
                        <div/> {/* dont delete this */}
                        <div className="d-flex submitRow">
                            <Button
                                btnType="Danger"
                                disabled={!this.state.formIsValid || this.props.signupLoading}
                            >
                                {this.props.signupLoading ? (
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>) : 'Create account'
                                }
                            </Button>

                        </div>
                    </div>
                    <div className="text-center pt-4">
                        <p className="text-muted mb-0">Already have an account?
                            <span className="text-danger ml-1 signinLink"
                                  onClick={() => this.props.signinClicked('login')}>Signin
                            </span>
                        </p>
                    </div>
                </div>
                {/* ================================ */}
                <Modal show={this.state.showModal}
                       modalClosed={() => {console.log('modal closed')}}
                >
                    <div>
                        { this.props.signupLoading ? (<Spinner />) : (
                            this.props.signupError !== '' ? (
                                    <div className='signupResponseWrapper p-4'>
                                        <i className='icons icon-exclamation'/>
                                        <h6 className='m-4 text-center'>{this.props.signupError}</h6>
                                        <button type="button" className="btn btn-dark btn-block" onClick={() => {this.resetForm()}}>OK</button>
                                    </div>
                                ) : (
                                    <div className='signupResponseWrapper p-4'>
                                        <i className='icons icon-envelope-letter'/>
                                        <h6 className='m-4 text-center'>A verification email has been sent to your email. please verify.</h6>
                                        <button type="button" className="btn btn-dark btn-block" onClick={() => {this.resetForm()}}>OK</button>
                                    </div>
                                )
                        )}
                    </div>
                </Modal>
            </form>
        );
    }
}

interface LinkStateProps {
    signupError: Auth['signupError'];
    signupLoading: Auth['signupLoading'];
}

interface LinkDispatchProps {
    onSignup: (data : {[index: string]:any}) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
    signupError: state.auth.signupError,
    signupLoading: state.auth.signupLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AuthActions>): LinkDispatchProps => ({
    onSignup: (data : {[index: string]:any}) => {dispatch(actions.signup(data))},
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);


