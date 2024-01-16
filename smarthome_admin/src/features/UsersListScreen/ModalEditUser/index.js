import authApi from 'api/authApi';
import { thunkGetUsersList } from 'app/authSlice';
import { useFormik } from 'formik';
import BaseDropdown from 'general/components/Form/BaseDropdown';
import BaseTextField from 'general/components/Form/BaseTextField';
import AppData from 'general/constants/AppData';
import ToastHelper from 'general/helpers/ToastHelper';
import UserHelper from 'general/helpers/UserHelper';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

ModalEditUser.propTypes = {
    userItem: PropTypes.object,
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

ModalEditUser.defaultProps = {
    userItem: null,
    show: false,
    onClose: null,
};

function ModalEditUser(props) {
    // MARK --- Params: ---
    const { show, onClose, userItem } = props;
    const [editAvatar, setEditAvatar] = useState(null);
    const accountInforAvatar = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            _id: '',
            fullname: '',
            gender: '',
            dob: '',
            email: '',
            phone: '',
            address: '',
        },
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                if (editAvatar) {
                    formData.append('avatar', editAvatar);
                }
                setLoading(true);
                const res = await authApi.updateProfile(formData);
                const { result } = res;
                if (result === 'success') {
                    dispatch(thunkGetUsersList({q: ""}));
                    setLoading(false);
                    ToastHelper.showSuccess('Cập nhật thông tin người dùng thành công');
                    setEditAvatar(null);
                    handleClose();
                } else {
                    setLoading(false);
                    setEditAvatar(null);
                    handleClose();
                }
            } catch (error) {
                console.log(error.message);
                ToastHelper.showError('Cập nhật thông tin người dùng thất bại');
            }
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Bạn chưa nhập họ tên'),
        }),
    });

    // MARK --- Functions: ---

    function handleClose() {
        if (onClose) {
            onClose();
        }
    }

    function handleChangeAvatarClick() {
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
    }

    // MARK --- Hooks: ---
    useEffect(() => {
        return () => {
            editAvatar && URL.revokeObjectURL(editAvatar.preview);
        };
    }, [editAvatar, show]);

    useEffect(() => {
        if (userItem) {
            formik.getFieldHelpers('fullname').setValue(userItem?.fullname);
            formik.getFieldHelpers('email').setValue(userItem?.email);
            formik.getFieldHelpers('dob').setValue(userItem?.dob);
            formik.getFieldHelpers('phone').setValue(userItem?.phone);
            formik.getFieldHelpers('gender').setValue(userItem?.gender);
            formik.getFieldHelpers('address').setValue(userItem?.address);
            formik.getFieldHelpers('_id').setValue(userItem?._id);
        }
    }, [userItem]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="p-0">
            {/* modal header */}
            <Modal.Header className="d-flex align-items-center justify-content-center">
                <Modal.Title>Chỉnh sửa ảnh đại diện</Modal.Title>
                {loading && (
                    <div className="ml-4">
                        <span className="spinner spinner-loader spinner-primary"></span>
                    </div>
                )}
            </Modal.Header>

            {/* modal content */}
            <Modal.Body>
                <div className="row align-items-center">
                    <span className="font-weight-bolder col-4 text-end">Ảnh đại diện</span>
                    <div className="col-2"></div>
                    <div className="col-6">
                        <div className="position-relative">
                            <div className="symbol symbol-120 symbol-lg-150 symbol-fixed">
                                <img
                                    src={
                                        editAvatar?.preview ||
                                        userItem?.avatar ||
                                        UserHelper.getRandomAvatarUrl()
                                    }
                                    alt="avatar"
                                    className="border border-white border-4"
                                    style={{
                                        borderRadius: '20px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <label
                                className="position-absolute btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                style={{ top: '-5%', left: '-3%' }}
                                onClick={() => {
                                    if (editAvatar) {
                                        setEditAvatar(null);
                                    } else {
                                        handleChangeAvatarClick();
                                    }
                                }}
                            >
                                <i className={`fas fa-${editAvatar ? 'times' : 'pen'}`}></i>
                            </label>
                        </div>
                        <input
                            type="file"
                            ref={accountInforAvatar}
                            onChange={handleChangeAvatarInput}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="card-body">
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Họ và tên
                                </div>
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="fullname"
                                            placeholder="Nhập tên đầy đủ"
                                            fieldHelper={formik.getFieldHelpers(
                                                "fullname"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "fullname"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "fullname"
                                            )}
                                        />
                                    </div>
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Giới tính
                                </div>
                                    <div className="col-lg-8 pb-1">
                                        <BaseDropdown
                                            options={AppData.genderOptions}
                                            dropdownInitialValue={UserHelper.renderGender(
                                                userItem.gender
                                            )}
                                            name="gender"
                                            fieldHelper={formik.getFieldHelpers(
                                                "gender"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "gender"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "gender"
                                            )}
                                            onValueChanged={(value) => {
                                                formik
                                                    .getFieldHelpers("gender")
                                                    .setValue(value);
                                            }}
                                        />
                                    </div>
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Ngày sinh
                                </div>
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="dob"
                                            type="date"
                                            fieldHelper={formik.getFieldHelpers(
                                                "dob"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "dob"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "dob"
                                            )}
                                        />
                                    </div>
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Email
                                </div>
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="email"
                                            placeholder="Nhập địa chỉ email..."
                                            fieldHelper={formik.getFieldHelpers(
                                                "email"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "email"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "email"
                                            )}
                                        />
                                    </div>
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Địa chỉ
                                </div>
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="address"
                                            placeholder="Nhập địa chỉ..."
                                            fieldHelper={formik.getFieldHelpers(
                                                "address"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "address"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "address"
                                            )}
                                        />
                                    </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Số điện thoại
                                </div>
                                    <div className="col-lg-8 pb-1">
                                        <BaseTextField
                                            name="phone"
                                            placeholder="Nhập số điện thoại..."
                                            fieldHelper={formik.getFieldHelpers(
                                                "phone"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "phone"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "phone"
                                            )}
                                        />
                                    </div>
                            </div>
                        </div>
            </Modal.Body>
            {/* modal footer */}
            <Modal.Footer className="d-flex flex-row align-items-center justify-content-center">
                <div className="w-100 d-flex row">
                    <Button
                        className="font-weight-bold flex-grow-1 col mr-3"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        {`Huỷ`}
                    </Button>
                    <Button
                        className={`font-weight-bold flex-grow-1 col ml-3`}
                        variant="primary"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditUser;
