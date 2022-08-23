const { Fragment, useState, useEffect } = require("react");
const { Transition } = require("@headlessui/react");
import React, { ReactNode } from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

type ConfirmButton = {
    classes: string
}

interface Props {
    children: ReactNode,
    confirmButton?: ConfirmButton,
    modalIsOpen: boolean,
    onConfirm: () => void,
    closeModal: () => void
}
const CustomModal = ({
    children,
    onConfirm,
    confirmButton,
    closeModal,
    modalIsOpen
}: Props) => {

    return <>
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {children}
                <button onClick={closeModal}>close</button>
                <button className={confirmButton?.classes} onClick={onConfirm}>Confirm</button>
            </Modal>
        </div>
    </>
}

export default CustomModal