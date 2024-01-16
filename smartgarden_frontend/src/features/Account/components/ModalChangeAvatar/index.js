import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AppButton from "general/components/AppButton";
import authApi from "api/authApi";
import { thunkGetAccountInfor } from "app/authSlice";
import ToastHelper from "general/helpers/ToastHelper";
import axios from "axios";

ModalChangeAvatar.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onExecute: PropTypes.func,
};

ModalChangeAvatar.defaultProps = {
    show: null,
    onClose: null,
    onExecute: null,
};

function ModalChangeAvatar(props) {
    // MARK --- Params: ---
    const { show, onClose, onExecute } = props;
    const [editAvatar, setEditAvatar] = useState(null);
    const accountInforAvatar = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // MARK --- Functions: ---

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
    function handleChangeAvatarClick() {
        console.log("handleChange");
        accountInforAvatar.current.click();
    }
    function handleChangeAvatarInput(e) {
        const file = e.target.files[0];

        if (file) {
            file.preview = URL.createObjectURL(file);
            setEditAvatar(file);
            e.target.value = null;
        }
    }
    async function handleEditAvatar() {
        setLoading(true);
        const formData = new FormData();
        if (editAvatar) {
            formData.append("avatar", editAvatar);
            try {
                const res = await authApi.updateProfile(formData);
                const { result } = res;
                if (result === "success") {
                    dispatch(thunkGetAccountInfor());
                    ToastHelper.showSuccess("Cập nhật ảnh đại diện thành công");
                    handleClose();
                } else {
                    ToastHelper.showError("Cập nhật ảnh đại diện thất bại");
                }
            } catch (error) {
                console.log(error.message);
                ToastHelper.showError("Cập nhật ảnh đại diện thất bại");
            }
            setLoading(false);
            setEditAvatar(null);
        }
    }

    // MARK --- Hooks: ---
    useEffect(() => {
        return () => {
            editAvatar && URL.revokeObjectURL(editAvatar.preview);
        };
    }, [editAvatar, show]);

    return (
        <Modal show={show} onHide={handleClose} centered size='md' className='p-0'>
            {/* modal header */}
            <Modal.Header className='d-flex align-items-center justify-content-center'>
                <Modal.Title>Chỉnh sửa ảnh đại diện</Modal.Title>
                {loading && (
                    <div className='ml-4'>
                        <span className='spinner spinner-loader spinner-primary'></span>
                    </div>
                )}
            </Modal.Header>

            {/* modal content */}
            <Modal.Body className='d-flex flex-column align-items-center justify-content-center bg-light py-10'>
                {!editAvatar ? (
                    <AppButton
                        className='btn-grey'
                        text='Tải ảnh lên'
                        beforIcon={<i className='fas fa-plus text-remaining mr-4'></i>}
                        onClick={() => handleChangeAvatarClick()}
                    />
                ) : (
                    <div className='position-relative'>
                        <div className='symbol symbol-120 symbol-lg-150 symbol-fixed'>
                            <img
                                src={editAvatar?.preview}
                                alt='avatar'
                                className='border border-white border-4'
                                style={{
                                    borderRadius: "20px",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <label
                            className='position-absolute btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                            style={{ top: "-6%", right: "-4%" }}
                            onClick={() => setEditAvatar(null)}>
                            <i className='fas fa-times'></i>
                        </label>
                    </div>
                )}
                <input
                    type='file'
                    ref={accountInforAvatar}
                    onChange={handleChangeAvatarInput}
                    style={{ display: "none" }}
                />
            </Modal.Body>
            {/* modal footer */}
            <Modal.Footer className='d-flex flex-row align-items-center justify-content-center'>
                <div className='w-100 d-flex row'>
                    <Button className='font-weight-bold flex-grow-1 col mr-3' variant='secondary' onClick={handleClose}>
                        {`Huỷ`}
                    </Button>
                    <Button
                        className={`font-weight-bold flex-grow-1 col ml-3`}
                        variant='primary'
                        onClick={() => {
                            handleEditAvatar();
                        }}>
                        Lưu thay đổi
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalChangeAvatar;
