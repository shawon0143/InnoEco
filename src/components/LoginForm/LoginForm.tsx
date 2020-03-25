import React from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {updateObject, checkValidity} from "../../shared/utility";
import "./LoginForm.scss";

interface IProps {
    createAccountClicked: (formType: string) => void;
}
export interface input {
    elementType: string;
    elementConfig: {
        type: string;
        label: string;
    }
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
    loginForm: {
        userEmail: input,
        password: input
    },
    formIsValid: boolean
}

class LoginForm extends React.Component<IProps, IState> {
    state: Readonly<IState> = {
        // loginForm object is used for form definition  and form validation
        loginForm: {
            userEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                autoFocus: true,
                placeholder: 'john@gmail.com'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                autoFocus: false,
                placeholder: '*********'
            }
        },
        formIsValid: false
    };

    submitHandler = (event: any) => {
        event.preventDefault();
    };

    inputChangedHandler = (event: any, inputIdentifier: any) => {
        // @ts-ignore
        const updatedLoginFormElement = updateObject(this.state.loginForm[inputIdentifier], {
            value: event.target.value,
            // @ts-ignore
            valid: checkValidity(event.target.value, this.state.loginForm[inputIdentifier].validation),
            touched: true
        });
        const updatedLoginForm = updateObject(this.state.loginForm, {
            [inputIdentifier]: updatedLoginFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            if (updatedLoginForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
            }
        }
        this.setState({
            loginForm: updatedLoginForm,
            formIsValid: formIsValid
        });
    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="loginFormWrapper">
                    <div className="inputElementsWrapper">
                        <Input
                            elementType={this.state.loginForm.userEmail.elementType}
                            elementConfig={this.state.loginForm.userEmail.elementConfig}
                            value={this.state.loginForm.userEmail.value}
                            changed={(event) => this.inputChangedHandler(event, 'userEmail')}
                            invalid={!this.state.loginForm.userEmail.valid}
                            shouldValidate={this.state.loginForm.userEmail.validation}
                            touched={this.state.loginForm.userEmail.touched}
                            autoFocus={this.state.loginForm.userEmail.autoFocus}
                            placeholder={this.state.loginForm.userEmail.placeholder}
                        />
                        <Input
                            elementType={this.state.loginForm.password.elementType}
                            elementConfig={this.state.loginForm.password.elementConfig}
                            value={this.state.loginForm.password.value}
                            changed={(event) => this.inputChangedHandler(event, 'password')}
                            invalid={!this.state.loginForm.password.valid}
                            shouldValidate={this.state.loginForm.password.validation}
                            touched={this.state.loginForm.password.touched}
                            autoFocus={this.state.loginForm.password.autoFocus}
                            placeholder={this.state.loginForm.password.placeholder}

                        />
                        <div className="d-flex justify-content-between align-items-center submitRow">
                            <span className="text-muted forgotPasswordLink">Forgot Password?</span>
                            <Button btnType="Danger" disabled={!this.state.formIsValid}>Signin</Button>
                        </div>
                    </div>
                    <div className="text-center pt-4">
                        <p className="text-muted mb-0">Do not have an account?
                            <span className="text-danger ml-1 createAccountLink"
                                  onClick={() => this.props.createAccountClicked('signup')}>Create Account
                            </span>
                        </p>
                    </div>
                </div>

            </form>
        );
    }


};

export default LoginForm;
