import { thunkGetAccountInfor } from "app/authSlice";
import { thunkGetGardenData, thunkUpdateGardenData } from "features/Garden/gardenSlice";
import { useFormik } from "formik";
import BaseTextField from "general/components/Form/BaseTextField";
import ToastHelper from "general/helpers/ToastHelper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

InforOfGarden.propTypes = {};

function InforOfGarden(props) {
    const dispatch = useDispatch();
    const { currentGarden, isUpdatingGardenData } = useSelector(
        (state) => state?.garden
    );
    const [isEditMode, setIsEditMode] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
        },
        onSubmit: async (values) => {
            const params = { _id: currentGarden._id, ...values };
            try {
                const res = await dispatch(thunkUpdateGardenData(params));
                if (res) {
                    await dispatch(
                        thunkGetGardenData({ gardenId: currentGarden._id })
                    );
                    ToastHelper.showSuccess("Sửa thông tin thành công");
                    setIsEditMode(false);
                    await dispatch(thunkGetAccountInfor());
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required("Bạn chưa nhập tên"),
            address: Yup.string().trim().required("Bạn chưa nhập địa chỉ"),
        }),
    });

    useEffect(() => {
        if (currentGarden) {
            formik.getFieldHelpers("name").setValue(currentGarden?.name);
            formik.getFieldHelpers("address").setValue(currentGarden?.address);
        }
    }, [currentGarden, isEditMode]);

    return (
        <div className="container-xxl">
            <div className="card card-flush mb-9">
                <div className="card-header d-flex justify-content-between">
                    <div className="font-weight-bolder font-size-h3 text-remaining">
                        Thông tin vườn
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
                                    className="ButtonPrimary px-5 px-sm-8 me-sm-3 mb-3 mb-sm-0"
                                    style={{
                                        backgroundColor: "#13b713",
                                    }}
                                    onClick={formik.handleSubmit}
                                >
                                    {isUpdatingGardenData ? (
                                        <div>Đang lưu...</div>
                                    ) : (
                                        <div>Lưu</div>
                                    )}
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
                            Tên vườn
                        </div>
                        {!isEditMode && (
                            <div className="col-lg-8 pb-1 font-size-lg fw-semibold">
                                {currentGarden?.name}
                            </div>
                        )}
                        {isEditMode && (
                            <div className="col-lg-8 pb-1">
                                <BaseTextField
                                    name="name"
                                    placeholder="Nhập tên vườn..."
                                    fieldHelper={formik.getFieldHelpers("name")}
                                    fieldProps={formik.getFieldProps("name")}
                                    fieldMeta={formik.getFieldMeta("name")}
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
                                {currentGarden?.address}
                            </div>
                        )}
                        {isEditMode && (
                            <div className="col-lg-8 pb-1">
                                <BaseTextField
                                    name="address"
                                    placeholder="Nhập địa chỉ vườn..."
                                    fieldHelper={formik.getFieldHelpers(
                                        "address"
                                    )}
                                    fieldProps={formik.getFieldProps("address")}
                                    fieldMeta={formik.getFieldMeta("address")}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforOfGarden;
