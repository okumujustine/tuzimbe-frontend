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
                <div className="w-full">
                    {children}
                </div>
                <button
                    className="my-6 text-white bg-red-700 hover:bg-red-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                    onClick={closeModal}>close</button>
                <button className={confirmButton?.classes} onClick={onConfirm}>Confirm</button>
            </Modal>
        </div>
    </>
}

export default CustomModal