import * as React from "react";
const classes = require('./Backdrop.module.css');

interface IProps {
    clicked: () => void;
    show: boolean;
}

const backdrop: React.FC<IProps> = (props: IProps) =>
    props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked} />
    ) : null;

export default backdrop;
