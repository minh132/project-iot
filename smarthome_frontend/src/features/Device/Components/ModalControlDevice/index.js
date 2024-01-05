import {
    setIsOpenControlDeviceModal,
    thunkControlDevice,
} from "features/Device/deviceSlice";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ToggleSwitchControl from "general/components/ToggleSwitchControl";
import { parseInt, set } from "lodash";
import AppData from "general/constants/AppData";
import { useEffect } from "react";

ModalControlDevice.propTypes = {
    tab: PropTypes.string,
    deviceItem: PropTypes.object,
};

ModalControlDevice.defaultProps = {};

function ModalControlDevice(props) {
    const { tab, deviceItem } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [controlDevice, setControlDevice] = useState({});
    const { isOpenControlDeviceModal, devicesListOfHome } = useSelector(
        (state) => state?.device
    );
    const [isTab, setIsTab] = useState(tab || "light-sensor");

    useEffect(() => {
        setControlDevice(deviceItem);
    }, [deviceItem, tab]);
    // console.log(controlDevice);
    // MARK: --- Functions ---
    function handleClose() {
        dispatch(
            setIsOpenControlDeviceModal({ isOpenModal: false, deviceItem: {} })
        );
    }
    return (
        <div className="ModalControlDevice">
            <Modal
                className=""
                show={isOpenControlDeviceModal}
                size="lg"
                onHide={handleClose}
                centered
                onExited={() => {}}
            >
                {/* header */}
                <Modal.Header className="px-5 py-5 d-flex align-items-center justify-content-center position-relative">
                    <Modal.Title className="">
                        Điều khiển thiết bị tự động
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
                        <div className="row">
                            <div className="col-6">
                                <div
                                    className={`TabControl p-3 text-center fs-4 fw-bold shadow-sm rounded-sm cursor-pointer w-100 ${
                                        isTab === "light-sensor" &&
                                        "TabControl_active"
                                    }`}
                                    onClick={() => setIsTab("light-sensor")}
                                >
                                    Cảm biến ánh sáng
                                </div>
                            </div>
                            <div className="col-6">
                                <div
                                    className={`TabControl p-3 text-center fs-4 fw-bold shadow-sm rounded-sm cursor-pointer w-100 ${
                                        isTab === "timer" && "TabControl_active"
                                    }`}
                                    onClick={() => setIsTab("timer")}
                                >
                                    Hẹn giờ
                                </div>
                            </div>
                        </div>
                        {(controlDevice?.deviceType === "Bóng đèn" ||
                            controlDevice?.deviceType === "Dải đèn" ||
                            controlDevice?.deviceType === "Đèn bàn" ||
                            controlDevice?.deviceType === "Đèn ngủ") && (
                            <div className="d-flex mt-5 p-4 p-lg-6 border-1 bg-white shadow-sm rounded">
                                <div className="d-flex flex-column">
                                    <div className="fs-5 fw-bold">
                                        {controlDevice?.deviceName} - Thiết bị{" "}
                                        {controlDevice?.deviceChannel}
                                    </div>

                                    {isTab === "light-sensor" ? (
                                        <div className="d-flex mt-3 align-items-center">
                                            <div className="fs-6 me-3">
                                                Giá trị cường độ ánh sáng:
                                            </div>
                                            <input
                                                type="number"
                                                disabled={
                                                    controlDevice?.control
                                                        ?.lightAuto
                                                }
                                                value={
                                                    controlDevice?.automatic
                                                        ?.lightValue
                                                }
                                                min={300}
                                                max={4095}
                                                onChange={(e) =>
                                                    setControlDevice({
                                                        ...controlDevice,
                                                        automatic: {
                                                            ...controlDevice.automatic,
                                                            lightValue:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column mt-3 align-items-start">
                                            <div className="fs-6 me-3">
                                                Tự động trong khoảng:
                                            </div>
                                            <div className="mt-3">
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        controlDevice?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        controlDevice.automatic
                                                            ?.hourFrom ?? 0
                                                    }
                                                    min={0}
                                                    max={23}
                                                    onChange={(e) =>
                                                        setControlDevice({
                                                            ...controlDevice,
                                                            automatic: {
                                                                ...controlDevice.automatic,
                                                                hourFrom:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                />{" "}
                                                :{" "}
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        controlDevice?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        controlDevice.automatic
                                                            ?.minuteFrom ?? 0
                                                    }
                                                    min={0}
                                                    max={59}
                                                    onChange={(e) =>
                                                        setControlDevice({
                                                            ...controlDevice,
                                                            automatic: {
                                                                ...controlDevice.automatic,
                                                                minuteFrom:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                />
                                                {"   "}-{">"}
                                                {"   "}
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        controlDevice?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        controlDevice.automatic
                                                            ?.hourTo ?? 0
                                                    }
                                                    min={0}
                                                    max={23}
                                                    onChange={(e) =>
                                                        setControlDevice({
                                                            ...controlDevice,
                                                            automatic: {
                                                                ...controlDevice.automatic,
                                                                hourTo: e.target
                                                                    .value,
                                                            },
                                                        })
                                                    }
                                                />{" "}
                                                :{" "}
                                                <input
                                                    style={{ width: "3rem" }}
                                                    type="number"
                                                    disabled={
                                                        controlDevice?.control
                                                            ?.timerAuto
                                                    }
                                                    value={
                                                        controlDevice.automatic
                                                            ?.minuteTo ?? 0
                                                    }
                                                    min={0}
                                                    max={59}
                                                    onChange={(e) =>
                                                        setControlDevice({
                                                            ...controlDevice,
                                                            automatic: {
                                                                ...controlDevice.automatic,
                                                                minuteTo:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchControl
                                        value={
                                            isTab === "light-sensor"
                                                ? controlDevice?.control
                                                      ?.lightAuto
                                                : controlDevice?.control
                                                      ?.timerAuto
                                        }
                                        onChange={() => {
                                            if (isTab === "light-sensor") {
                                                setControlDevice({
                                                    ...controlDevice,
                                                    control: {
                                                        ...controlDevice.control,
                                                        lightAuto:
                                                            !controlDevice
                                                                ?.control
                                                                ?.lightAuto,
                                                        timerAuto: false,
                                                    },
                                                });
                                                dispatch(
                                                    thunkControlDevice({
                                                        deviceId:
                                                            controlDevice._id,
                                                        deviceChannel:
                                                            controlDevice.deviceChannel,
                                                        control: {
                                                            ...controlDevice.control,
                                                            intensity: 8000,
                                                            lightAuto:
                                                                !controlDevice
                                                                    ?.control
                                                                    ?.lightAuto,
                                                            timerAuto: false,
                                                        },
                                                        automatic: {
                                                            ...controlDevice?.automatic,
                                                            lightValue:
                                                                parseInt(
                                                                    controlDevice
                                                                        .automatic
                                                                        ?.lightValue
                                                                ),
                                                        },
                                                    })
                                                );
                                            } else {
                                                setControlDevice({
                                                    ...controlDevice,
                                                    control: {
                                                        ...controlDevice.control,
                                                        timerAuto:
                                                            !controlDevice
                                                                ?.control
                                                                ?.timerAuto,
                                                        lightAuto: false,
                                                    },
                                                });
                                                dispatch(
                                                    thunkControlDevice({
                                                        deviceId:
                                                            controlDevice?._id,
                                                        deviceChannel:
                                                            controlDevice?.deviceChannel,
                                                        control: {
                                                            ...controlDevice?.control,
                                                            intensity: 8000,
                                                            lightAuto: false,
                                                            timerAuto:
                                                                !controlDevice
                                                                    ?.control
                                                                    ?.timerAuto,
                                                        },
                                                        automatic: {
                                                            ...controlDevice?.automatic,
                                                            hourFrom: parseInt(
                                                                controlDevice
                                                                    .automatic
                                                                    ?.hourFrom
                                                            ),
                                                            minuteFrom:
                                                                parseInt(
                                                                    controlDevice
                                                                        .automatic
                                                                        ?.minuteFrom
                                                                ),
                                                            hourTo: parseInt(
                                                                controlDevice
                                                                    .automatic
                                                                    ?.hourTo
                                                            ),
                                                            minuteTo: parseInt(
                                                                controlDevice
                                                                    .automatic
                                                                    ?.minuteTo
                                                            ),
                                                        },
                                                    })
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        {controlDevice?.deviceType === "Máy lạnh" && (
                            <div className="d-flex mt-5 p-4 p-lg-6 border-1 bg-white shadow-sm rounded">
                                <div className="d-flex flex-column">
                                    <div className="fs-5 fw-bold">
                                        {controlDevice?.deviceName} - Thiết bị{" "}
                                        {controlDevice?.deviceChannel}
                                    </div>

                                    {isTab === "light-sensor" ? (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-8 fs-6">
                                                    Điều chỉnh nhiệt độ (°C):
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        style={{
                                                            width: "6.3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.lightAuto ||
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            ((controlDevice
                                                                ?.control
                                                                ?.intensity -
                                                                800) /
                                                                7200) *
                                                                16 +
                                                                16 ?? 22
                                                        }
                                                        min={16}
                                                        max={32}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                control: {
                                                                    ...controlDevice.control,
                                                                    intensity:
                                                                        ((parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) -
                                                                            16) /
                                                                            16) *
                                                                            7200 +
                                                                        800,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className="fs-6 col-8">
                                                    Giá trị cường độ ánh sáng:
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.lightAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                .automatic
                                                                ?.lightValue ??
                                                            4095
                                                        }
                                                        min={300}
                                                        max={4095}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.automatic,
                                                                    lightValue:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-8 fs-6">
                                                    Điều chỉnh nhiệt độ (°C):
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        style={{
                                                            width: "6.3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.lightAuto ||
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            ((controlDevice
                                                                ?.control
                                                                ?.intensity -
                                                                800) /
                                                                7200) *
                                                                16 +
                                                                16 ?? 22
                                                        }
                                                        min={16}
                                                        max={32}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                control: {
                                                                    ...controlDevice.control,
                                                                    intensity:
                                                                        ((parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) -
                                                                            16) /
                                                                            16) *
                                                                            7200 +
                                                                        800,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column mt-3 align-items-start">
                                                <div className="fs-6 me-3">
                                                    Tự động trong khoảng:
                                                </div>
                                                <div className="mt-3">
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                .automatic
                                                                ?.hourFrom ?? 0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.hourFrom,
                                                                    lightValue:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                .automatic
                                                                ?.minuteFrom ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.minuteFrom,
                                                                    lightValue:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />
                                                    {"   "}-{">"}
                                                    {"   "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                .automatic
                                                                ?.hourTo ?? 0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.hourTo,
                                                                    lightValue:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                .automatic
                                                                ?.minuteTo ?? 0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.minuteTo,
                                                                    lightValue:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchControl
                                        value={
                                            isTab === "light-sensor"
                                                ? controlDevice?.control
                                                      ?.lightAuto
                                                : controlDevice?.control
                                                      ?.timerAuto
                                        }
                                        onChange={() => {
                                            if (isTab === "light-sensor") {
                                                setControlDevice({
                                                    ...controlDevice,
                                                    control: {
                                                        ...controlDevice.control,
                                                        lightAuto:
                                                            !controlDevice
                                                                ?.control
                                                                ?.lightAuto,
                                                        timerAuto: false,
                                                    },
                                                });
                                                dispatch(
                                                    thunkControlDevice({
                                                        deviceId:
                                                            controlDevice?._id,
                                                        deviceChannel:
                                                            controlDevice?.deviceChannel,
                                                        control: {
                                                            ...controlDevice?.control,
                                                            intensity:
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity,
                                                            lightAuto:
                                                                !controlDevice
                                                                    ?.control
                                                                    ?.lightAuto,
                                                            timerAuto: false,
                                                        },
                                                        automatic: {
                                                            ...controlDevice?.automatic,
                                                            lightValue:
                                                                parseInt(
                                                                    controlDevice
                                                                        ?.automatic
                                                                        ?.lightValue
                                                                ),
                                                        },
                                                    })
                                                );
                                            } else {
                                                setControlDevice({
                                                    ...controlDevice,
                                                    control: {
                                                        ...controlDevice.control,
                                                        timerAuto:
                                                            !controlDevice
                                                                ?.control
                                                                ?.timerAuto,
                                                        lightAuto: false,
                                                    },
                                                });
                                                dispatch(
                                                    thunkControlDevice({
                                                        deviceId:
                                                            controlDevice?._id,
                                                        control: {
                                                            ...controlDevice?.control,
                                                            intensity:
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity,
                                                            lightAuto: false,
                                                            timerAuto:
                                                                !controlDevice
                                                                    ?.control
                                                                    ?.timerAuto,
                                                        },
                                                        automatic: {
                                                            ...controlDevice?.automatic,
                                                            hourFrom: parseInt(
                                                                controlDevice
                                                                    ?.automatic
                                                                    ?.hourFrom
                                                            ),
                                                            minuteFrom:
                                                                parseInt(
                                                                    controlDevice
                                                                        ?.automatic
                                                                        ?.minuteFrom
                                                                ),
                                                            hourTo: parseInt(
                                                                controlDevice
                                                                    ?.automatic
                                                                    ?.hourTo
                                                            ),
                                                            minuteTo: parseInt(
                                                                controlDevice
                                                                    ?.automatic
                                                                    ?.minuteTo
                                                            ),
                                                        },
                                                    })
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        {controlDevice?.deviceType === "Quạt" && (
                            <div className="d-flex mt-5 p-4 p-lg-6 border-1 bg-white shadow-sm rounded">
                                <div className="d-flex flex-column">
                                    <div className="fs-5 fw-bold">
                                        {controlDevice?.deviceName} - Thiết bị{" "}
                                        {controlDevice?.deviceChannel}
                                    </div>

                                    {isTab === "light-sensor" ? (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-6 fs-6">
                                                    Chọn chế độ:
                                                </div>
                                                <div className="col-6">
                                                    <div>
                                                        <div
                                                            className={`d-inline-flex cursor-pointer ${
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity ===
                                                                800
                                                                    ? "ButtonPrimary"
                                                                    : "ButtonCancel"
                                                            } me-2 px-3 py-2`}
                                                            onClick={() =>
                                                                setControlDevice(
                                                                    {
                                                                        ...controlDevice,
                                                                        control:
                                                                            {
                                                                                ...controlDevice.control,
                                                                                intensity: 800,
                                                                            },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            1
                                                        </div>
                                                        <div
                                                            className={`d-inline-flex cursor-pointer ${
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity ===
                                                                4400
                                                                    ? "ButtonPrimary"
                                                                    : "ButtonCancel"
                                                            } me-2 px-3 py-2`}
                                                            onClick={() =>
                                                                setControlDevice(
                                                                    {
                                                                        ...controlDevice,
                                                                        control:
                                                                            {
                                                                                ...controlDevice.control,
                                                                                intensity: 4400,
                                                                            },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            2
                                                        </div>
                                                        <div
                                                            className={`d-inline-flex cursor-pointer ${
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity ===
                                                                8000
                                                                    ? "ButtonPrimary"
                                                                    : "ButtonCancel"
                                                            } me-2 px-3 py-2`}
                                                            onClick={() =>
                                                                setControlDevice(
                                                                    {
                                                                        ...controlDevice,
                                                                        control:
                                                                            {
                                                                                ...controlDevice.control,
                                                                                intensity: 8000,
                                                                            },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            3
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className="fs-6 col-8">
                                                    Giá trị cường độ ánh sáng:
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.lightAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                ?.automatic
                                                                ?.lightValue ??
                                                            4095
                                                        }
                                                        min={300}
                                                        max={4095}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.automatic,
                                                                    lightValue:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="row d-flex mt-3 align-items-center">
                                                <div className=" col-5 fs-6">
                                                    Chọn chế độ:
                                                </div>
                                                <div className="col-7">
                                                    <div>
                                                        <div
                                                            className={`d-inline-flex cursor-pointer ${
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity ===
                                                                800
                                                                    ? "ButtonPrimary"
                                                                    : "ButtonCancel"
                                                            } me-2 px-3 py-2`}
                                                            onClick={() =>
                                                                setControlDevice(
                                                                    {
                                                                        ...controlDevice,
                                                                        control:
                                                                            {
                                                                                ...controlDevice.control,
                                                                                intensity: 800,
                                                                            },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            1
                                                        </div>
                                                        <div
                                                            className={`d-inline-flex cursor-pointer ${
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity ===
                                                                4400
                                                                    ? "ButtonPrimary"
                                                                    : "ButtonCancel"
                                                            } me-2 px-3 py-2`}
                                                            onClick={() =>
                                                                setControlDevice(
                                                                    {
                                                                        ...controlDevice,
                                                                        control:
                                                                            {
                                                                                ...controlDevice.control,
                                                                                intensity: 4400,
                                                                            },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            2
                                                        </div>
                                                        <div
                                                            className={`d-inline-flex cursor-pointer ${
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity ===
                                                                8000
                                                                    ? "ButtonPrimary"
                                                                    : "ButtonCancel"
                                                            } me-2 px-3 py-2`}
                                                            onClick={() =>
                                                                setControlDevice(
                                                                    {
                                                                        ...controlDevice,
                                                                        control:
                                                                            {
                                                                                ...controlDevice.control,
                                                                                intensity: 8000,
                                                                            },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            3
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column mt-3 align-items-start">
                                                <div className="fs-6 me-3">
                                                    Tự động trong khoảng:
                                                </div>
                                                <div className="mt-3">
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                ?.automatic
                                                                ?.hourFrom ?? 0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.automatic,
                                                                    hourFrom:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                ?.automatic
                                                                ?.minuteFrom ??
                                                            0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.automatic,
                                                                    minuteFrom:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />
                                                    {"   "}-{">"}
                                                    {"   "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                ?.automatic
                                                                ?.hourTo ?? 0
                                                        }
                                                        min={0}
                                                        max={23}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.automatic,
                                                                    hourTo: e
                                                                        .target
                                                                        .value,
                                                                },
                                                            })
                                                        }
                                                    />{" "}
                                                    :{" "}
                                                    <input
                                                        style={{
                                                            width: "3rem",
                                                        }}
                                                        type="number"
                                                        disabled={
                                                            controlDevice
                                                                ?.control
                                                                ?.timerAuto
                                                        }
                                                        value={
                                                            controlDevice
                                                                ?.automatic
                                                                ?.minuteTo ?? 0
                                                        }
                                                        min={0}
                                                        max={59}
                                                        onChange={(e) =>
                                                            setControlDevice({
                                                                ...controlDevice,
                                                                automatic: {
                                                                    ...controlDevice.automatic,
                                                                    minuteTo:
                                                                        e.target
                                                                            .value,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchControl
                                        value={
                                            isTab === "light-sensor"
                                                ? controlDevice?.control
                                                      ?.lightAuto
                                                : controlDevice?.control
                                                      ?.timerAuto
                                        }
                                        onChange={() => {
                                            if (isTab === "light-sensor") {
                                                setControlDevice({
                                                    ...controlDevice,
                                                    control: {
                                                        ...controlDevice.control,
                                                        lightAuto:
                                                            !controlDevice
                                                                ?.control
                                                                ?.lightAuto,
                                                        timerAuto: false,
                                                    },
                                                });
                                                dispatch(
                                                    thunkControlDevice({
                                                        deviceId:
                                                            controlDevice?._id,
                                                        deviceChannel:
                                                            controlDevice?.deviceChannel,
                                                        control: {
                                                            ...controlDevice?.control,
                                                            intensity:
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity,
                                                            lightAuto:
                                                                !controlDevice
                                                                    ?.control
                                                                    ?.lightAuto,
                                                            timerAuto: false,
                                                        },
                                                        automatic: {
                                                            ...controlDevice?.automatic,
                                                            lightValue:
                                                                parseInt(
                                                                    controlDevice
                                                                        ?.automatic
                                                                        ?.lightValue
                                                                ),
                                                        },
                                                    })
                                                );
                                            } else {
                                                setControlDevice({
                                                    ...controlDevice,
                                                    control: {
                                                        ...controlDevice.control,
                                                        timerAuto:
                                                            !controlDevice
                                                                ?.control
                                                                ?.timerAuto,
                                                        lightAuto: false,
                                                    },
                                                });
                                                dispatch(
                                                    thunkControlDevice({
                                                        deviceId:
                                                            controlDevice?._id,
                                                        deviceChannel:
                                                            controlDevice?.deviceChannel,
                                                        control: {
                                                            ...controlDevice?.control,
                                                            intensity:
                                                                controlDevice
                                                                    ?.control
                                                                    ?.intensity,
                                                            lightAuto: false,
                                                            timerAuto:
                                                                !controlDevice
                                                                    ?.control
                                                                    ?.timerAuto,
                                                        },
                                                        automatic: {
                                                            ...controlDevice?.automatic,
                                                            hourFrom: parseInt(
                                                                controlDevice
                                                                    ?.automatic
                                                                    ?.hourFrom
                                                            ),
                                                            minuteFrom:
                                                                parseInt(
                                                                    controlDevice
                                                                        ?.automatic
                                                                        ?.minuteFrom
                                                                ),
                                                            hourTo: parseInt(
                                                                controlDevice
                                                                    ?.automatic
                                                                    ?.hourTo
                                                            ),
                                                            minuteTo: parseInt(
                                                                controlDevice
                                                                    ?.automatic
                                                                    ?.minuteTo
                                                            ),
                                                        },
                                                    })
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
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
                            {`Đóng`}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalControlDevice;
