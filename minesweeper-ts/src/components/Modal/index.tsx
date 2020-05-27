import React, { ReactNode } from 'react';
import "./Modal.scss";

interface ModalProps {
    children?: ReactNode;
    title: string;
    subtitle?: string;
    canCancel: boolean;
    canConfirm: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({children, title, canCancel, canConfirm, onCancel, onConfirm, subtitle}) => {
    return (
        <React.Fragment>
            <div className="BackDrop"></div>
            <div className="Modal">
                <header className="ModalHeader">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </header>
                <section className="ModalContent">
                    {children}
                </section>
                <section className="ModalActions">
                    {canCancel && <button onClick={onCancel}>Cancel</button>}
                    {canConfirm && <button onClick={onConfirm}>New Game</button>}
                </section>
            </div>
        </React.Fragment>
    )
}

export default Modal
