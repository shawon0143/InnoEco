import React from 'react';

import './Button.scss';

interface IProps {
    disabled: boolean;
    btnType: string;
    clicked?: () => void;
    children?: any;
}

const button: React.FC<IProps> = (props: IProps) => (
    <button
        disabled={props.disabled}
        className={['Button', [props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;
