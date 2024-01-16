import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import AppResource from "general/constants/AppResource";
import { useFormik } from "formik";
import BaseTextField from "general/components/Form/BaseTextField";
import AppButton from "general/components/AppButton";
import * as Yup from 'yup';
import ToastHelper from "general/helpers/ToastHelper";
import Utils from "general/utils/Utils";
import { useNavigate } from "react-router-dom";
import authApi from "api/authApi";
import PreferenceKeys from "general/constants/PreferenceKey";
import { LogoBigLight } from "assets/icons/Icons";
SignUpScreen.propTypes = {};

const sTag = '[SignUpScreen]'

function SignUpScreen(props) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Trang đăng ký | AUTOWATERING"
     }, []);

    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            const params = {
                ...values
            };
            delete params?.confirmPassword;
            let hashPassword = Utils.sha256(params.password);
            params.password = hashPassword;
            console.log(`${sTag} on submit: ${JSON.stringify(params)}`);
            try {
                const res = await authApi.signUp(params);
                if (res) {
                    localStorage.setItem(PreferenceKeys.savedUsername, values.username);
                    localStorage.setItem(PreferenceKeys.savedPassword, /*values.password*/ '');
                    ToastHelper.showSuccess('Đăng ký tài khoản mới thành công');
                    navigate('/sign-in');
                }
            } catch (err) {
                console.log(`${sTag} sign up account error: ${err.message}`);
            }
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Bạn chưa nhập tài khoản'),
            password: Yup.string().required('Bạn chưa nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự').matches(/^\S*$/, 'Mật khẩu không được chứa khoảng trắng'),
            fullname: Yup.string().required('Bạn chưa nhập họ tên'),
            confirmPassword: Yup.string()
            .required('Bạn chưa xác nhận mật khẩu')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        }),
    });

    function handleNavigate(url){
        navigate(url);
    }
    return (
        <div className="SignUpScreen min-vh-100">
            <div className="LogoSignUp">
            </div>
            <form className="SignUpForm" onSubmit={formik.handleSubmit}>
                        <div>
                            <h1 style={{fontWeight:"600", textAlign:"center"}}>Đăng ký</h1>
                            <div>
                                <BaseTextField 
                                    name='fullname'
                                    placeholder='Nhập Họ tên...'
                                    label='Họ tên'
                                    fieldHelper={formik.getFieldHelpers('fullname')}
                                    fieldProps={formik.getFieldProps('fullname')}
                                    fieldMeta={formik.getFieldMeta('fullname')}
                                />
                            </div>
                            <div>
                                <BaseTextField 
                                    name='username'
                                    placeholder='Nhập tài khoản...'
                                    label='Tài khoản'
                                    fieldHelper={formik.getFieldHelpers('username')}
                                    fieldProps={formik.getFieldProps('username')}
                                    fieldMeta={formik.getFieldMeta('username')}
                                />
                            </div>
                            <div>
                                <BaseTextField 
                                    type="password"
                                    name='password'
                                    placeholder='Nhập mật khẩu...'
                                    label='Mật khẩu'
                                    fieldHelper={formik.getFieldHelpers('password')}
                                    fieldProps={formik.getFieldProps('password')}
                                    fieldMeta={formik.getFieldMeta('password')}
                                />
                            </div>
                            <div>
                                <BaseTextField 
                                    type="password"
                                    name='confirmPassword'
                                    placeholder='Nhập lại mật khẩu...'
                                    label='Nhập lại mật khẩu'
                                    fieldHelper={formik.getFieldHelpers('confirmPassword')}
                                    fieldProps={formik.getFieldProps('confirmPassword')}
                                    fieldMeta={formik.getFieldMeta('confirmPassword')}
                                />
                            </div>
                            <AppButton 
                                className="btn-blue mt-5 w-100"
                                text="Đăng ký"
                            />
                            <div className="text-center mt-5">Bạn đã có tài khoản? <span onClick={()=>handleNavigate('/sign-in')} className="cursor-pointer" style={{color: AppResource.colors.featureColor, textDecoration: "underline"}}>Đăng nhập</span></div>
                        </div>
                   </form>
        </div>
    );
}

export default SignUpScreen;
