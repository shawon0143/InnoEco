import * as React from "react";

import Backdrop from "../Backdrop/Backdrop";

import './Modal.scss';

interface IProps {
    show: boolean;
    modalClosed: () => void;
}

class Modal extends React.Component<IProps> {
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className='Modal'
                    style={{
                        transform: this.props.show
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                        opacity: this.props.show ? 1 : 0
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;
