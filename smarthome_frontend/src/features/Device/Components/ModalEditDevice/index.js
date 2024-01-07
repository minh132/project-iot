import {
    thunkGetDevicesListOfHome,
    thunkUpdateDeviceData,
} from "features/Device/deviceSlice";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import { useFormik } from "formik";
import BaseDropdown from "general/components/Form/BaseDropdown";
import BaseTextField from "general/components/Form/BaseTextField";
import ToastHelper from "general/helpers/ToastHelper";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

ModalEditDevice.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    deviceItem: PropTypes.object,
};

ModalEditDevice.defaultProps = {
    show: false,
    onClose: null,
    deviceItem: {},
};

function ModalEditDevice(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // MARK: --- Params ---
    const { show, onClose, deviceItem } = props;
    const [showing, setShowing] = useState(true);

    const { currentHome } = useSelector((state) => state?.home);
    const { isUpdatingDevice } = useSelector((state) => state?.device);
    const { roomsList } = useSelector((state) => state?.room);
    const currentRoomName = roomsList?.filter(
        (room) => room?._id === deviceItem?.roomId
    ).roomName;

    const roomOptions = [];
    for (let i = 0; i < roomsList?.length; i++) {
        roomOptions.push({
            value: roomsList[i]._id,
            text: roomsList[i].roomName,
        });
    }

    const formik = useFormik({
        initialValues: {
            newName: "",
            newRoomId: "",
        },
        onSubmit: async (values) => {
            const params = { deviceId: deviceItem._id, ...values };
            try {
                const res = await dispatch(thunkUpdateDeviceData(params));
                if (res.payload.result === "success") {
                    handleClose();
                    formik.handleReset();
                    ToastHelper.showSuccess(
                        "Sửa thông tin thiết bị thành công"
                    );
                    await dispatch(
                        thunkGetDevicesListOfHome({ homeId: currentHome._id })
                    );
                    await dispatch(
                        thunkGetRoomsList({ homeId: currentHome._id })
                    );
                }
            } catch (err) {
                console.log(`${err.message}`);
            }
        },
        validationSchema: Yup.object({
            newName: Yup.string().trim().required("Bạn chưa nhập tên thiết bị"),
        }),
    });

    useEffect(() => {
        if (deviceItem) {
            formik
                .getFieldHelpers("deviceType")
                .setValue(deviceItem?.deviceType);
            formik.getFieldHelpers("newName").setValue(deviceItem?.deviceName);
            formik.getFieldHelpers("newRoomId").setValue(deviceItem?.roomId);
        }
    }, [deviceItem]);

    // MARK: --- Functions ---
    function handleClose() {
        if (onClose) {
            onClose();
        }
    }
    return (
        <div className="ModalEditDevice">
            <Modal
                className=""
                show={show && showing}
                size="lg"
                onHide={handleClose}
                centered
                onExited={() => {}}
            >
                {/* header */}
                <Modal.Header className="px-5 py-5 d-flex align-items-center justify-content-center position-relative">
                    <Modal.Title className="">
                        Chỉnh sửa thông tin thiết bị
                    </Modal.Title>
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
                                        Loại thiết bị
                                    </div>
                                    <div>
                                        <BaseTextField
                                            disabled={true}
                                            name="deviceType"
                                            fieldHelper={formik.getFieldHelpers(
                                                "deviceType"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "deviceType"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "deviceType"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div className="fs-5 fw-bold mb-3">
                                        Tên thiết bị
                                    </div>
                                    <div>
                                        <BaseTextField
                                            require={true}
                                            name="newName"
                                            placeholder="Nhập tên thiết bị mới..."
                                            fieldHelper={formik.getFieldHelpers(
                                                "newName"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "newName"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "newName"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-column mt-5 p-7 p-lg-10 border-1 bg-white shadow-sm rounded">
                                    <div className="fs-5 fw-bold mb-3">
                                        Chọn khu
                                    </div>
                                    <div>
                                        <BaseDropdown
                                            options={roomOptions}
                                            dropdownInitialValue={
                                                currentRoomName
                                            }
                                            name="newRoomId"
                                            fieldHelpers={formik.getFieldHelpers(
                                                "newRoomId"
                                            )}
                                            fieldMeta={formik.getFieldMeta(
                                                "newRoomId"
                                            )}
                                            fieldProps={formik.getFieldProps(
                                                "newRoomId"
                                            )}
                                            onValueChanged={(value) => {
                                                formik
                                                    .getFieldHelpers(
                                                        "newRoomId"
                                                    )
                                                    .setValue(value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
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
                            {isUpdatingDevice ? (
                                <div className="my-auto">
                                    <span className="spinner spinner-loader spinner-white"></span>
                                </div>
                            ) : (
                                <div>Lưu lại</div>
                            )}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalEditDevice;
