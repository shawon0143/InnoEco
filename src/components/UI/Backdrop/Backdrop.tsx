import * as React from "react";
import './Backdrop.scss';

interface IProps {
    clicked: () => void;
    show: boolean;
}

const backdrop: React.FC<IProps> = (props: IProps) =>
    props.show ? (
        <div className='Backdrop' onClick={props.clicked} />
    ) : null;

export default backdrop;
