import React from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import './SignupForm.scss';

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
    formIsValid: boolean
};

class SignupForm extends React.Component<IProps, IState> {
    state: Readonly<IState> = {
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
                autoFocus: true,
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
                    isNumeric: true
                },
                valid: false,
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
        const updatedSignupFormElement = updateObject(this.state.signupForm[inputIdentifier], {
            value: event.target.value,
            // @ts-ignore
            valid: checkValidity(event.target.value, this.state.signupForm[inputIdentifier].validation),
            touched: true
        });
        const updatedSignupForm = updateObject(this.state.signupForm, {
            [inputIdentifier]: updatedSignupFormElement
        });
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
        // formElementsArray holds all elements of loginForm object in an array
        const formElementsArray = [];
        for (let key in this.state.signupForm) {
            if (this.state.signupForm.hasOwnProperty(key)) {
                formElementsArray.push({
                    id: key,
                    // @ts-ignore
                    config: this.state.signupForm[key]
                });
            }
        }
        /* ======= projecting all form elements from the array we created ============== */

        let formElements = formElementsArray.map(formElement => {
            return (
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    autoFocus={formElement.config.autoFocus}
                    placeholder={formElement.config.placeholder}
                    key={formElement.id}
                />
            );
        });
        /* =================== End of from elements ===================================== */
        return (
            <form onSubmit={this.submitHandler}>
                <div className="signupFormWrapper">
                    <div className="inputElementsWrapper">
                        {formElements}
                        <div/>
                        <div className="d-flex submitRow">
                            <Button btnType="Danger" disabled={!this.state.formIsValid}>Signup</Button>
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
            </form>
        );
    }
}

export default SignupForm;


