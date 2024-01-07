import React, { useState } from "react";
import PropTypes from "prop-types";
import BaseLayout from "general/components/BaseLayout";
import Utils from "general/utils/Utils";
import BootstrapTable from "react-bootstrap/Table";
import UserHelper from "general/helpers/UserHelper";
import { useDispatch, useSelector } from "react-redux";
import ModalChangeAvatar from "./components/ModalChangeAvatar";
import { thunkGetHomeData, thunkRefuseJoinHome } from "features/Home/homeSlice";
import { useNavigate } from "react-router-dom";
import { thunkEditProfile, thunkGetAccountInfor } from "app/authSlice";
import BaseTextField from "general/components/Form/BaseTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import BaseDropdown from "general/components/Form/BaseDropdown";
import AppData from "general/constants/AppData";
import ToastHelper from "general/helpers/ToastHelper";

Account.propTypes = {};

function Account(props) {
    // MARK: --- Params ---
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentAccount } = useSelector((state) => state?.auth);
    const [showModalChangeAvatar, setShowModalChangeAvatar] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const homeList = currentAccount?.homeList;
    const ownerList = homeList?.filter((home) => home.status === "owner");
    const requestingList = homeList?.filter(
        (home) => home.status === "requesting"
    );
    useEffect(() => {
        document.title = "Trang cá nhân | AUTOWATERING"
     }, []);

    const formik = useFormik({
        initialValues: {
            fullname: "",
            gender: "",
            dob: "",
            address: "",
            phone: "",
        },
        onSubmit: async (values) => {
            const params = { ...values };
            try {
                const res = await dispatch(thunkEditProfile(params));
                if (res) {
                    ToastHelper.showSuccess("Sửa thông tin thành công");
                    await dispatch(thunkGetAccountInfor());
                    setIsEditMode(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        validationSchema: Yup.object({
            fullname: Yup.string().trim().required("Bạn chưa nhập tên"),
            gender: Yup.string().trim().required("Bạn chưa chọn"),
            dob: Yup.string().trim().required("Bạn chưa nhập ngày sinh"),
            address: Yup.string().trim().required("Bạn chưa nhập địa chỉ"),
            phone: Yup.string().trim().required("Bạn chưa nhập số điện thoại"),
        }),
    });

    useEffect(() => {
        if (currentAccount) {
            formik
                .getFieldHelpers("fullname")
                .setValue(currentAccount?.fullname);
            formik.getFieldHelpers("dob").setValue(currentAccount?.dob);
            formik.getFieldHelpers("phone").setValue(currentAccount?.phone);
            formik.getFieldHelpers("gender").setValue(currentAccount?.gender);
            formik.getFieldHelpers("address").setValue(currentAccount?.address);
        }
    }, [currentAccount, isEditMode]);

    return (
        <BaseLayout>
            <div className="Account flex-column-fluid">
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div
                            className="card-header rounded-top bgi-size-cover h-200px Account_CoverImage"
                            style={{
                                backgroundPosition: "100% 50%",
                                backgroundImage: `url(https://removal.ai/wp-content/uploads/2021/05/image9-1.png)`,
                            }}
                        ></div>
                        <div className="card-body mt-n19">
                            <div className="m-0">
                                <div className="d-flex flex-stack align-items-end pb-4 mt-n19">
                                    <div className=" position-relative">
                                        <div className="symbol symbol-120 symbol-lg-150 symbol-fixed mt-n3">
                                            <img
                                                src={
                                                    currentAccount?.avatar ||
                                                    UserHelper.getRandomAvatarUrl()
                                                }
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        UserHelper.getRandomAvatarUrl();
                                                }}
                                                alt="avatar"
                                                className="border border-white border-4"
                                                style={{
                                                    borderRadius: "20px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <label
                                            className="position-absolute btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                                            style={{ top: "-8%", right: "-4%" }}
                                            onClick={() =>
                                                setShowModalChangeAvatar(true)
                                            }
                                        >
                                            <i className="fas fa-pen"></i>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-weight-bolder font-size-h3 text-remaining">
                                        {currentAccount?.fullname}
                                    </p>
                                    <p className="text-muted">
                                        {currentAccount?.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div className="card-header d-flex justify-content-between">
                            <div className="font-weight-bolder font-size-h3 text-remaining">
                                Thông tin cá nhân
                            </div>
                            <div>
                                {!isEditMode && (
                                    <button
                                        className="ButtonPrimary"
                                        onClick={() => setIsEditMode(true)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                )}
                                {isEditMode && (
                                    <div>
                                        <button
                                            className="ButtonPrimary px-8 me-3"
                                            style={{
                                                backgroundColor: "#13b713",
                                            }}
                                            onClick={formik.handleSubmit}
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            className="ButtonDanger px-8"
                                            onClick={() => setIsEditMode(false)}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Họ và tên
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {currentAccount?.fullname}
                                    </div>
                                )}
                                {isEditMode && (
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
                                )}
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Giới tính
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {currentAccount?.gender}
                                    </div>
                                )}
                                {isEditMode && (
                                    <div className="col-lg-8 pb-1">
                                        <BaseDropdown
                                            options={AppData.genderOptions}
                                            dropdownInitialValue={UserHelper.renderGender(
                                                currentAccount?.gender
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
                                )}
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Ngày sinh
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {Utils.formatDateTime(
                                            currentAccount?.dob,
                                            "DD-MM-YYYY"
                                        )}
                                    </div>
                                )}
                                {isEditMode && (
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
                                )}
                            </div>
                            <div className="row mb-6">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Địa chỉ
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {currentAccount?.address}
                                    </div>
                                )}
                                {isEditMode && (
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
                                )}
                            </div>
                            <div className="row">
                                <div className="col-lg-4 pb-1 font-size-lg fw-semibold text-black-50">
                                    Số điện thoại
                                </div>
                                {!isEditMode && (
                                    <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                        {currentAccount?.phone}
                                    </div>
                                )}
                                {isEditMode && (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div className="card-header">
                            <div className="font-weight-bolder font-size-h3 text-remaining">
                                Danh sách vườn
                            </div>
                            {ownerList?.length > 0 ? (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Tổng cộng: {ownerList?.length} vườn
                                </div>
                            ) : (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Danh sách vườn đang yêu cầu
                                </div>
                            )}
                        </div>
                        <div className="card-body p-0">
                            {ownerList?.length > 0 && (
                                <BootstrapTable className="BootstrapTable" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Vườn</th>
                                            <th>Địa chỉ</th>
                                            <th>Thực hiện</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ownerList?.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.homeName}</td>
                                                <td>{item.homeAddress}</td>
                                                <td>
                                                    <button
                                                        className="ButtonPrimary"
                                                        onClick={async () => {
                                                            await dispatch(
                                                                thunkGetHomeData(
                                                                    {
                                                                        homeId: item._id,
                                                                    }
                                                                )
                                                            );
                                                            navigate("/home");
                                                        }}
                                                    >
                                                        Di chuyển đến
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </BootstrapTable>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                    <div className="card card-flush mb-9">
                        <div className="card-header">
                            <div className="font-weight-bolder font-size-h3 text-remaining">
                                Danh sách vườn đang yêu cầu
                            </div>
                            {requestingList?.length > 0 ? (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Tổng cộng: {requestingList?.length} vườn
                                </div>
                            ) : (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Danh sách trống
                                </div>
                            )}
                        </div>
                        <div className="card-body p-0">
                            {requestingList?.length > 0 && (
                                <BootstrapTable className="BootstrapTable"striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Vườn</th>
                                            <th>Địa chỉ</th>
                                            <th>Thực hiện</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestingList?.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.homeName}</td>
                                                <td>{item.homeAddress}</td>
                                                <td>
                                                    <button
                                                        className="ButtonDanger"
                                                        onClick={async () => {
                                                            await dispatch(
                                                                thunkRefuseJoinHome(
                                                                    {
                                                                        homeId: item._id,
                                                                        accountId:
                                                                            currentAccount._id,
                                                                    }
                                                                )
                                                            );
                                                            await dispatch(
                                                                thunkGetAccountInfor()
                                                            );
                                                        }}
                                                    >
                                                        Hủy yêu cầu
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </BootstrapTable>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalChangeAvatar
                show={showModalChangeAvatar}
                onClose={() => setShowModalChangeAvatar(false)}
            />
        </BaseLayout>
    );
}

export default Account;
