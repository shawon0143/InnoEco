import React from 'react';
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

// @ts-ignore
import DateTimePicker from 'react-datetime-picker';

import "./AddEventForm.scss";
import { AppState } from '../../../store/configureStore';
import Input from '../../UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
import { sessionInfo } from '../../../shared/axios';

interface IProps {

}

export interface input {
    elementType: string;
    elementConfig: {
        type: string;
        label: string;
    };
    value: any;
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
    createEventForm: {
        name: input;
        description: input;
    },
    eventDate: Date,
    formIsValid: boolean,
    errorMsg: string,
};

const initialState = {
    createEventForm: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Name*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Name'
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Description*',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            autoFocus: false,
            placeholder: 'Description'
        },
    },
    eventDate: new Date(),
    formIsValid: false,
    errorMsg: ''
}

type Props = LinkDispatchProps & LinkStateProps & IProps;


class AddEventForm extends React.Component<Props, IState> {
    state: Readonly<IState> = initialState;

    inputChangedHandler = (inputValue: any, inputIdentifier: any) => {
        let value = inputValue;

        // @ts-ignore
        const updatedFormElement = updateObject(this.state.createEventForm[inputIdentifier], {
            value: value,
            // @ts-ignore
            valid: checkValidity(value, this.state.createEventForm[inputIdentifier].validation),
            touched: true
        });
        const updatedForm = updateObject(this.state.createEventForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            if (updatedForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
            }
        }
        this.setState({
            createEventForm: updatedForm,
            formIsValid: formIsValid
        });
    };

    onCreateEvent = () => {
        if (this.state.formIsValid) {
            let data = {
                name: this.state.createEventForm.name.value,
                description: this.state.createEventForm.description.value,
                createdBy: sessionInfo().email,
                eventDate: this.state.eventDate
            }
            this.props.onCreateNewEvent(data);
            this.resetForm();
        } else {
            this.setState({errorMsg: 'Please enter name and description of event.'});
        }
    }

    resetForm = () => {
        this.setState(initialState);
    }
    render () {
        return (
            <div className='addEventFormContainer'>
                <div className="inputElementsWrapper border rounded shadow-sm">
                    {/* ============================================= */}
                    {/* ================== name ==================== */}
                    {/* ============================================= */}
                    <Input
                        elementType={this.state.createEventForm.name.elementType}
                        elementConfig={this.state.createEventForm.name.elementConfig}
                        value={this.state.createEventForm.name.value}
                        changed={(event) => this.inputChangedHandler(event.target.value, 'name')}
                        invalid={!this.state.createEventForm.name.valid}
                        shouldValidate={this.state.createEventForm.name.validation}
                        touched={this.state.createEventForm.name.touched}
                        autoFocus={this.state.createEventForm.name.autoFocus}
                        placeholder={this.state.createEventForm.name.placeholder}
                    />
                    {/* ============================================= */}
                    {/* ============== description ================== */}
                    {/* ============================================= */}

                    <Input
                        elementType={this.state.createEventForm.description.elementType}
                        elementConfig={this.state.createEventForm.description.elementConfig}
                        value={this.state.createEventForm.description.value}
                        changed={(event) => this.inputChangedHandler(event.target.value, 'description')}
                        invalid={!this.state.createEventForm.description.valid}
                        shouldValidate={this.state.createEventForm.description.validation}
                        touched={this.state.createEventForm.description.touched}
                        autoFocus={this.state.createEventForm.description.autoFocus}
                        placeholder={this.state.createEventForm.description.placeholder}
                    />
                    <div style={{padding: 10}}>
                        <label className="Label d-block">Date*</label>

                        <DateTimePicker
                            onChange={(date: any) => this.setState({eventDate: date})}
                            value={this.state.eventDate}
                            minDate={new Date()}
                            required={true}
                        />
                        <button
                            className='btn btn-sm btn-primary mt-4 d-block  '
                            onClick={this.onCreateEvent}
                        >
                            Create Event
                        </button>
                        {/* Error message */}
                        <h6 className='text-danger mt-4'>
                            {this.state.errorMsg !== '' ? this.state.errorMsg : ''}
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

interface LinkStateProps {

}
interface LinkDispatchProps {
    onCreateNewEvent: (data: any) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({

});

const mapDispatchToProps = (dispatch: any): LinkDispatchProps => ({
    onCreateNewEvent: (data: any) => dispatch(actions.createNewEvent(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);