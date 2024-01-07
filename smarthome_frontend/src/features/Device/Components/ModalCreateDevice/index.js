import {
    thunkCreateDevice,
    thunkGetDevicesListOfHome,
} from "features/Device/deviceSlice";
import { thunkGetRoomData, thunkGetRoomsList } from "features/Room/roomSlice";
import { useFormik } from "formik";
import BaseDropdown from "general/components/Form/BaseDropdown";
import BaseTextField from "general/components/Form/BaseTextField";
import AppData from "general/constants/AppData";
import AppResource from "general/constants/AppResource";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputCategoryDevice from "../InputCategoryDevice";
import "./style.scss";

ModalCreateDevice.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

ModalCreateDevice.defaultProps = {
    show: false,
    onClose: null,
};

function ModalCreateDevice(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // MARK: --- Params ---
    const { show, onClose } = props;
    const [showing, setShowing] = useState(true);
    const [category, setCategory] = useState("");
    const [device, setDevice] = useState(null);

    const { isCreatingDevice } = useSelector((state) => state?.device);
    const { currentHome } = useSelector((state) => state?.home);

    const roomOptions = [];
    for (let i = 0; i < currentHome?.roomsList?.length; i++) {
        roomOptions.push({
            value: currentHome?.roomsList[i]._id,
            text: currentHome?.roomsList[i].roomName,
        });
    }

    const onSelected = (value) => {
        setDevice(value);
    };

    const formik = useFormik({
        initialValues: {
            deviceName: "",
            deviceType: "",
            roomId: "",
            deviceChannel: "",
        },
        onSubmit: async (values) => {
            const params = {
                ...values,
                deviceChannel: parseInt(values.deviceChannel),
            };
            try {
                const res = await dispatch(thunkCreateDevice(params));
                if (res.payload.result === "failed") {
                    ToastHelper.showError(`${res.payload.message}`);
                } else {
                    ToastHelper.showSuccess("Thêm thiết bị mới thành công");
                    handleClose();
                    setCategory("");
                    formik.handleReset();
                    await dispatch(
                        thunkGetDevicesListOfHome({ homeId: currentHome._id })
                    );
                    await dispatch(
                        thunkGetRoomsList({ homeId: currentHome._id })
                    );
                }
            } catch (error) {
                console.log(` error: ${error.message}`);
            }
        },
        validationSchema: Yup.object({
            deviceName: Yup.string()
                .trim()
                .required("Bạn chưa nhập tên thiết bị mới"),
            roomId: Yup.string().trim().required("Bạn chưa chọn khu"),
        }),
    });

    useEffect(() => {
        if (device) {
            formik.getFieldHelpers("deviceType").setValue(device?.value);
            formik.getFieldHelpers("deviceName").setValue(device?.text);
        }
    }, [device]);

    // MARK: --- Functions ---
    function handleClose() {
        if (onClose) {
            onClose();
            setCategory("");
        }
    }
    return (
        <div className="ModalCreateDevice">
            <Modal
                className=""
                show={show && showing}
                size="lg"
                onHide={handleClose}
                centered
            >
                {/* header */}
                <Modal.Header className="px-5 py-5 d-flex align-items-center justify-content-center position-relative">
                    <Modal.Title className="">Thêm thiết bị mới</Modal.Title>
                    <div
                        className="btn btn-xs btn-icon btn-light btn-hover-secondary cursor-pointer position-absolute right-0 mr-5"
                        onClick={handleClose}
                    >
                        <i className="far fa-times"></i>
                    </div>
                </Modal.Header>
                {/* body */}
                <Modal.Body className="bg-light">
                    <form className="w-100">
                        <div>
                            <div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div className="fs-5 fw-bold mb-3">
                                        Danh mục
                                    </div>
                                    <div>
                                        <BaseDropdown
                                            options={AppData.categoryOptions}
                                            name="category"
                                            fieldHelpers={formik.getFieldHelpers(
                                                "category"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "category"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "category"
                                            )}
                                            onValueChanged={(value) => {
                                                setCategory(value);
                                                setDevice(null);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {category.length > 0 && (
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                            <div className="fs-5 fw-bold mb-3">
                                                Loại thiết bị
                                            </div>
                                            <InputCategoryDevice
                                                categoryInput={category}
                                                handleSelected={onSelected}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                            <div className="fs-5 fw-bold mb-3">
                                                Thiết bị mới
                                            </div>
                                            {device ? (
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <img
                                                        src={device.image}
                                                        alt="Ảnh thiết bị mới"
                                                        style={{
                                                            height: "100px",
                                                            width: "auto",
                                                            border: "1px solid #b5b5b5",
                                                            borderRadius: "5px",
                                                        }}
                                                    />
                                                    <div className="w-100 mt-5">
                                                        <BaseTextField
                                                            name="deviceName"
                                                            require={true}
                                                            type="text"
                                                            label="Tên thiết bị"
                                                            fieldHelper={formik.getFieldHelpers(
                                                                "deviceName"
                                                            )}
                                                            fieldProps={formik.getFieldProps(
                                                                "deviceName"
                                                            )}
                                                            fieldMeta={formik.getFieldMeta(
                                                                "deviceName"
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <img
                                                        src={
                                                            AppResource.images
                                                                .imgNoDevice
                                                        }
                                                        alt=""
                                                        style={{
                                                            height: "100px",
                                                            width: "auto",
                                                            borderRadius: "5px",
                                                        }}
                                                    />
                                                    <div className="w-100 mt-5 text-center">
                                                        Chưa chọn thiết bị mới
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div className="fs-5 fw-bold mb-3">
                                        Chọn khu
                                    </div>
                                    <div>
                                        <BaseDropdown
                                            options={roomOptions}
                                            name="roomId"
                                            fieldHelpers={formik.getFieldHelpers(
                                                "roomId"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "roomId"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "roomId"
                                            )}
                                            onValueChanged={(value) => {
                                                formik
                                                    .getFieldHelpers("roomId")
                                                    .setValue(value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {(category === "lightEquipment" ||
                                category === "electricalEquipment") && (
                                <div>
                                    <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                        <div className="fs-5 fw-bold mb-3">
                                            Ghép nối với
                                        </div>
                                        <div>
                                            <BaseDropdown
                                                options={AppData.channelOptions}
                                                name="deviceChannel"
                                                fieldHelpers={formik.getFieldHelpers(
                                                    "deviceChannel"
                                                )}
                                                fieldMeta={formik.getFieldMeta(
                                                    "deviceChannel"
                                                )}
                                                fieldProps={formik.getFieldProps(
                                                    "deviceChannel"
                                                )}
                                                onValueChanged={(value) => {
                                                    formik
                                                        .getFieldHelpers(
                                                            "deviceChannel"
                                                        )
                                                        .setValue(value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                {/* footer */}
                <Modal.Footer>
                    <div className="w-100 d-flex row">
                        <Button
                            className="font-weight-bold flex-grow-1 col mr-3 AppButton"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            {`Huỷ`}
                        </Button>
                        <Button
                            className={`font-weight-bold flex-grow-1 col ml-3 AppButton`}
                            variant="primary"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            {isCreatingDevice ? (
                                <div className="my-auto">
                                    <span className="spinner spinner-loader spinner-white"></span>
                                </div>
                            ) : (
                                <div>Thêm thiết bị</div>
                            )}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalCreateDevice;
