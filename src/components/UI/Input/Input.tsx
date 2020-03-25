import React from 'react';

import './Input.scss';

interface IProps {
    elementType: string;
    elementConfig: {
        type?: string;
        label: string;
        options?: any[];
    };
    value: string | number;
    changed: (event: any) => void;
    invalid: boolean;
    shouldValidate: {};
    touched: boolean;
    autoFocus: boolean;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
}

const Input: React.FC<IProps> = ( props: IProps ) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                autoFocus={props.autoFocus}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options && props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                autoFocus={props.autoFocus}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.changed} />;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.elementConfig.label}</label>
            {inputElement}
        </div>
    );

};

export default Input;
