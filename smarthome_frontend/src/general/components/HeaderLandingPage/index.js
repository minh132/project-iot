import { thunkChangePassword, thunkSignOut } from "app/authSlice";
import { LogoDark, LogoSmall, ShowSideBar, ShowSideBarActive } from "assets/icons/Icons";
import UserHelper from "general/helpers/UserHelper";
import Utils from "general/utils/Utils";
import PropTypes from "prop-types";
import Avatar from "../../../assets/images/avatar.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import DialogModal from "../DialogModal";
import BaseTextField from "../Form/BaseTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.scss";
import ToastHelper from "general/helpers/ToastHelper";
import ModalCreateDevice from "features/Device/Components/ModalCreateDevice";

HeaderLandingPage.propTypes = {
    loggedIn: PropTypes.bool,
    showSideBarMobile: PropTypes.bool,
};

HeaderLandingPage.defaultProps = {
    loggedIn: false,
    showSideBarMobile: false,
};

function HeaderLandingPage(props) {
    const { showSideBarMobile } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isChangingPassword, currentAccount } = useSelector(
        (state) => state?.auth
    );
    let [showLogOutModal, setShowLogOutModal] = useState(false);
    let [showModalCreateDevice, setShowModalCreateDevice] = useState(false);
    let [showSideBar, setShowSideBar] = useState(showSideBarMobile);
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);
    const sendData = () => {
        props.parentCallback(showSideBar);
    };
    const handleShowSideBar = () => {
        setShowSideBar(!showSideBar);
        sendData();
    };
    function handleNavigate(url) {
        navigate(url);
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        onSubmit: async (values, { resetForm }) => {
            const params = { ...values };
            let inputPassword = params.password;
            params.password = Utils.sha256(inputPassword);
            delete params?.confirmPassword;
            let hashPassword = Utils.sha256(params.newPassword);
            params.newPassword = hashPassword;
            // console.log(` on submit: ${JSON.stringify(params)}`);
            try {
                const res = await dispatch(thunkChangePassword(params));
                // console.log(res);
                if (res.payload.result === "failed") {
                    ToastHelper.showError(`${res.payload.message}`);
                } else {
                    setShowChangePasswordModal(false);
                    resetForm({ values: "" });
                }
            } catch (error) {
                console.log(` error: ${error.message}`);
            }
        },
        validationSchema: Yup.object({
            password: Yup.string().trim().required("Bạn chưa nhập mật khẩu"),
            newPassword: Yup.string()
                .required("Bạn chưa nhập mật khẩu")
                .min(6, "Mật khẩu phải chứa ít nhất 6 kí tự")
                .matches(/^\S*$/, "Mật khẩu không được chứa khoảng trắng"),
            confirmPassword: Yup.string()
                .required("Bạn chưa xác nhận mật khẩu")
                .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp"),
        }),
    });

    return (
        <div
            className="HeaderLandingPage d-flex align-items-center sticky-top shadow-sm px-5 py-3 ps-5 bg-body"
            style={{ height: "60px" }}
        >
            <div
                className="btnShowSideBar d-flex d-lg-none ms-1 me-3"
                onClick={handleShowSideBar}
            >
                {!showSideBar && <ShowSideBar />}
                {showSideBar && <ShowSideBarActive />}
            </div>
            <NavLink to="/home" className="d-flex d-lg-none align-items-center">
                <LogoDark className="d-none d-sm-block"/>
                <LogoSmall height="100%" className="d-block d-sm-none"/>
            </NavLink>
            <div className="d-none d-md-flex fw-bold fs-4 flex-fill justify-content-start mx-5">
                Xin chào, {currentAccount?.fullname}
            </div>
            <div className="d-flex flex-fill justify-content-end">
                <button
                    className="ButtonPrimary "
                    onClick={() => setShowModalCreateDevice(true)}
                >
                    <i className="far fa-plus text-white me-2"></i>
                    Thêm thiết bị
                </button>
            </div>
            <div className="d-flex">
                <div
                    className="mx-4 my-2"
                    style={{ borderLeft: "2px solid #b5b5c3" }}
                ></div>
                <input type="checkbox" id="dropdownMenu-loggedIn" />
                <label
                    className="m-0"
                    htmlFor="dropdownMenu-loggedIn"
                    id="overlay-button"
                >
                    <img
                        src={
                            currentAccount?.avatar ||
                            UserHelper.getRandomAvatarUrl()
                        }
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = UserHelper.getRandomAvatarUrl();
                        }}
                        style={{
                            height: "40px",
                            width: "40px",
                            objectFit: "cover",
                            marginRight: "1rem",
                            borderRadius: "5px",
                        }}
                        alt="Ảnh đại diện"
                    />
                    <i className="fas fa-sort-down me-2"></i>
                </label>
                <div id="overlay">
                    <ul className="d-flex flex-column justify-content-center align-items-center ps-0 m-0 text-start">
                        <li>
                            <div className="d-flex align-items-center ms-2 py-4">
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
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                    alt="avatar"
                                />
                                <div className="d-flex flex-column ms-3">
                                    <div className="fs-6 fw-bold pt-2">
                                        {currentAccount?.fullname}
                                    </div>
                                    <div className="fs-6 pt-1">
                                        {currentAccount?.email}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink className="dropdownMenuItem" to="/account">
                                <i className="far fa-user-circle mr-4"></i>
                                Thông tin cá nhân
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="dropdownMenuItem"
                                to="/dashboard"
                            >
                                <i className="fas fa-house-user mr-4"></i>
                                Quản lý vườn
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="dropdownMenuItem"
                                onClick={() => setShowChangePasswordModal(true)}
                            >
                                <i className="far fa-unlock-alt mr-4"></i>
                                Đổi mật khẩu
                            </NavLink>
                        </li>
                        <li className="border-bottom-0">
                            <div
                                className="dropdownMenuItem"
                                onClick={() => setShowLogOutModal(true)}
                            >
                                <i className="far fa-sign-out mr-4"></i>
                                Đăng xuất
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <DialogModal
                show={showLogOutModal}
                onClose={() => setShowLogOutModal(false)}
                icon="fad fa-user text-info"
                title="Đăng xuất"
                description="Bạn có chắc chắn muốn đăng xuất?"
                onExecute={async () => {
                    await dispatch(thunkSignOut()).then(() => {
                        UserHelper.signOut();
                    });
                    navigate("/sign-in");
                }}
            />
            <DialogModal
                show={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
                icon="fad fa-user-lock text-info"
                title="Đổi mật khẩu"
                close={false}
                onExecute={formik.handleSubmit}
            >
                <form className="w-100" onSubmit={formik.handleSubmit}>
                    <div>
                        <div>
                            <BaseTextField
                                require={true}
                                type="password"
                                name="password"
                                placeholder="Nhập mật khẩu cũ..."
                                label="Mật khẩu cũ"
                                fieldHelper={formik.getFieldHelpers("password")}
                                fieldProps={formik.getFieldProps("password")}
                                fieldMeta={formik.getFieldMeta("password")}
                            />
                        </div>
                        <div>
                            <BaseTextField
                                require={true}
                                type="password"
                                name="newPassword"
                                placeholder="Nhập mật khẩu mới..."
                                label="Mật khẩu mới"
                                fieldHelper={formik.getFieldHelpers(
                                    "newPassword"
                                )}
                                fieldProps={formik.getFieldProps("newPassword")}
                                fieldMeta={formik.getFieldMeta("newPassword")}
                            />
                        </div>
                        <div>
                            <BaseTextField
                                require={true}
                                type="password"
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu mới..."
                                label="Nhập lại mật khẩu mới"
                                fieldHelper={formik.getFieldHelpers(
                                    "confirmPassword"
                                )}
                                fieldProps={formik.getFieldProps(
                                    "confirmPassword"
                                )}
                                fieldMeta={formik.getFieldMeta(
                                    "confirmPassword"
                                )}
                            />
                        </div>
                    </div>
                    {isChangingPassword && (
                        <div className="d-flex align-items-center justify-content-center m-4">
                            <div>
                                <span>Vui lòng đợi trong ít phút...</span>
                                <span className="spinner spinner-loader spinner-primary"></span>
                            </div>
                        </div>
                    )}
                </form>
            </DialogModal>
            <ModalCreateDevice
                onClose={() => setShowModalCreateDevice(false)}
                show={showModalCreateDevice}
            />
        </div>
    );
}

export default HeaderLandingPage;
