import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import AppResource from "general/constants/AppResource";

DialogModal.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.bool,
    onClose: PropTypes.func,
    icon: PropTypes.string,
    description: PropTypes.string,
    onExecute: PropTypes.func,
    title: PropTypes.string,
};

DialogModal.defaultProps = {
    show: null,
    close: true,
    onClose: null,
    icon: "",
    description: "",
    onExecute: null,
    title: "",
};

function DialogModal(props) {
    const { show, close, onClose, icon, description, onExecute, title } = props;
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }
    function handleExecute() {
        if (onExecute) {
            onExecute();
        }
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size='md'
            className='p-0'>
            {/* modal header */}
            <Modal.Header className='d-flex align-items-center justify-content-center'>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            {/* modal content */}
            <Modal.Body className='d-flex flex-column align-items-center justify-content-center bg-light py-0'>
                {icon ? (
                    <i className={`${icon} fa-6x py-5 my-2`} style={{color:AppResource.colors.featureColor}}></i>
                ) : (
                    <img
                        className='py-5 my-2'
                        src={AppResource.icons.icTrash}
                        alt='delete icon'
                    />
                )}
                <p className='text-center font-weight-bold'>{description}</p>
                {props.children}
            </Modal.Body>
            {/* modal footer */}
            <Modal.Footer className='d-flex flex-row align-items-center justify-content-center'>
                <div className='w-100 d-flex row'>
                    <Button
                        className='font-weight-bold flex-grow-1 col mr-3'
                        variant='secondary'
                        onClick={handleClose}>
                        {`Huỷ`}
                    </Button>
                    <Button
                        className={`font-weight-bold flex-grow-1 col ml-3`}
                        variant='info'
                        onClick={() => {
                            close && handleClose();
                            handleExecute();
                        }}>
                        Xác nhận
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DialogModal;
