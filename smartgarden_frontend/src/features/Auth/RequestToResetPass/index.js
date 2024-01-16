import { unwrapResult } from "@reduxjs/toolkit";
import { thunkRequestToResetPassword } from "app/authSlice";
import { useFormik } from "formik";
import AppButton from "general/components/AppButton";
import BaseTextField from "general/components/Form/BaseTextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import "./style.scss";

RequestToResetPass.propTypes = {};

function RequestToResetPass(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async (values) => {
            const params = { ...values };
            try {
                const res = unwrapResult(
                    await dispatch(thunkRequestToResetPassword(params))
                );
                if (res) {
                    navigate("/sign-in");
                }
            } catch (error) {
                console.log(`error: ${error.message}`);
            }
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .required("Bạn chưa nhập email")
                .email("Email không hợp lệ"),
        }),
    });

    function handleNavigate(url) {
        navigate(url);
    }

    return (
        <div className="RequestToResetPass min-vh-100 bg-light">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    {/* email input */}
                    <div>
                        <BaseTextField
                            name="email"
                            placeholder="Nhập email..."
                            fieldHelper={formik.getFieldHelpers("email")}
                            fieldProps={formik.getFieldProps("email")}
                            fieldMeta={formik.getFieldMeta("email")}
                        />
                    </div>

                    {/* sumbit button */}
                    <AppButton
                        className="btn-orange w-100 mt-5"
                        text="Gửi mã"
                    />
                </div>
            </form>
        </div>
    );
}

export default RequestToResetPass;
