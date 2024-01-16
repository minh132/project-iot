import { unwrapResult } from "@reduxjs/toolkit";
import { thunkSignIn } from "app/authSlice";
import { LogoBigLight } from "assets/icons/Icons";
import { useFormik } from "formik";
import AppButton from "general/components/AppButton";
import BaseTextField from "general/components/Form/BaseTextField";
import ToastHelper from "general/helpers/ToastHelper";
import UserHelper from "general/helpers/UserHelper";
import Utils from "general/utils/Utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./style.scss";
SignInScreen.propTypes = {};

const sTag = "[SignInScreen]";

function SignInScreen(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            const params = { ...values };
            let inputPassword = params.password;
            params.password = Utils.sha256(inputPassword);
            try {
                const res = unwrapResult(await dispatch(thunkSignIn(params)));
                if (res) {
                    const displayName = UserHelper.getDisplayName(res.account);
                    ToastHelper.showSuccess(`Xin chào, ${displayName}`);
                    navigate("/users");
                }
            } catch (error) {
                console.log(`${sTag} loggin error: ${error.message}`);
                // ToastHelper.showError('Đăng nhập không thành công');
            }
        },
        validationSchema: Yup.object({
            username: Yup.string().trim().required("Bạn chưa nhập tài khoản"),
            password: Yup.string().trim().required("Bạn chưa nhập mật khẩu"),
        }),
    });
    useEffect(() => {
        document.title = "Đăng nhập với vai trò quản trị viên | Sgarden";
    }, []);

    function handleNavigate(url) {
        navigate(url);
    }
    return (
        <div className="SignInScreen min-vh-100">
            <div className="LogoSignIn">
                <LogoBigLight />
            </div>
            <form className="SignInForm" onSubmit={formik.handleSubmit}>
                <div>
                    <h1 style={{ fontWeight: "600", textAlign: "center" }}>
                        Quản trị viên - Đăng nhập
                    </h1>
                    <div>
                        <BaseTextField
                            name="username"
                            placeholder="Nhập tài khoản..."
                            label="Tài khoản"
                            fieldHelper={formik.getFieldHelpers("username")}
                            fieldProps={formik.getFieldProps("username")}
                            fieldMeta={formik.getFieldMeta("username")}
                        />
                    </div>
                    <div>
                        <BaseTextField
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu..."
                            label="Mật khẩu"
                            fieldHelper={formik.getFieldHelpers("password")}
                            fieldProps={formik.getFieldProps("password")}
                            fieldMeta={formik.getFieldMeta("password")}
                        />
                    </div>
                    <AppButton
                        className="btn-blue mt-5 w-100"
                        text="Đăng nhập"
                    />
                </div>
            </form>
        </div>
    );
}

export default SignInScreen;
