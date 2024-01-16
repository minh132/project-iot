import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchControl from "general/components/ToggleSwitchControl";
import { useState } from "react";
import {
    CircularInput,
    CircularTrack,
    CircularProgress,
    CircularThumb,
} from "react-circular-input";
import AppButton from "general/components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsOpenControlDeviceModal,
    thunkControlDevice,
} from "features/Device/deviceSlice";

AirConditioner.propTypes = {
    deviceItem: PropTypes.object,
    hideRoomName: PropTypes.bool,
};

AirConditioner.defaultProps = {
    deviceItem: null,
    hideRoomName: true,
};

function AirConditioner(props) {
    const { deviceItem, hideRoomName } = props;
    const dispatch = useDispatch();
    const { roomsList } = useSelector((state) => state?.room);
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;
    const [controlAC, setControlAC] = useState(deviceItem?.control?.status);
    const [controlAutoAC, setControlAutoAC] = useState(false);
    const [value, setValue] = useState(
        (deviceItem?.control?.intensity - 800) / 7200
    );
    const stepValue = (v) => Math.round(v * 16) / 16;

    useEffect(() => {
        setControlAC(deviceItem?.control?.status);
        setValue((deviceItem?.control?.intensity - 800) / 7200);
    }, [deviceItem]);

    useEffect(() => {
        const handleControlAC = async () => {
            await dispatch(
                thunkControlDevice({
                    deviceId: deviceItem._id,
                    deviceChannel: deviceItem.deviceChannel,
                    control: {
                        ...deviceItem.control,
                        status: controlAC,
                        intensity: value * 7200 + 800,
                        lightAuto: false,
                        timerAuto: false,
                    },
                    automatic: deviceItem.automatic,
                })
            );
        };
        if (
            deviceItem.control.lightAuto === false &&
            deviceItem.control.timerAuto === false
        )
            handleControlAC();
        return () => {};
    }, [controlAC]);

    useEffect(() => {
        const handleControlA = async () => {
            deviceItem?.control?.status &&
                (await dispatch(
                    thunkControlDevice({
                        deviceId: deviceItem._id,
                        deviceChannel: deviceItem.deviceChannel,
                        control: {
                            ...deviceItem.control,
                            status: true,
                            intensity: value * 7200 + 800,
                        },
                        automatic: deviceItem.automatic,
                    })
                ));
        };
        handleControlA();

        return () => {};
    }, [value]);

    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">
                        {deviceItem?.deviceName}
                        {!hideRoomName && (
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    color: "#bdbdbd",
                                }}
                            >
                                {" - "}
                                {renderRoomName(deviceItem.roomId)}
                            </span>
                        )}
                        {deviceItem?.control?.lightAuto && (
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    color: "#d10000",
                                    fontStyle: "italic",
                                }}
                            >
                                {" - "}
                                Tự động bật ( Cường độ ánh sáng {">"}{" "}
                                {deviceItem?.automatic?.lightValue} )
                            </span>
                        )}
                        {deviceItem?.control?.timerAuto && (
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    color: "#d10000",
                                    fontStyle: "italic",
                                }}
                            >
                                {" - "}
                                Tự động ( Từ{" "}
                                {deviceItem?.automatic?.hourFrom < 10
                                    ? "0" + deviceItem?.automatic?.hourFrom
                                    : deviceItem?.automatic?.hourFrom}
                                :
                                {deviceItem?.automatic?.minuteFrom < 10
                                    ? "0" + deviceItem?.automatic?.minuteFrom
                                    : deviceItem?.automatic?.minuteFrom}{" "}
                                -{">"}{" "}
                                {deviceItem?.automatic?.hourTo < 10
                                    ? "0" + deviceItem?.automatic?.hourTo
                                    : deviceItem?.automatic?.hourTo}
                                :
                                {deviceItem?.automatic?.minuteTo < 10
                                    ? "0" + deviceItem?.automatic?.minuteTo
                                    : deviceItem?.automatic?.minuteTo}{" "}
                                hàng ngày )
                            </span>
                        )}
                    </div>
                </div>
                <div className="AirConditioner row">
                    <div className="col-12 col-lg-6">
                        <div className="d-flex my-5 p-2 border-1 rounded-xl">
                            <div className="d-flex flex-column flex-fill justify-content-center align-items-center">
                                <CircularInput
                                    value={stepValue(value)}
                                    onChange={(v) => setValue(stepValue(v))}
                                >
                                    <CircularTrack
                                        stroke="#ececec"
                                        strokeWidth="30"
                                    />
                                    <CircularProgress strokeWidth="30" />
                                    <CircularThumb
                                        r="20"
                                        fill="white"
                                        stroke="rgb(61, 153, 255)"
                                        strokeWidth="8"
                                    />
                                    <text
                                        x={100}
                                        y={100}
                                        textAnchor="middle"
                                        dx="-0.5rem"
                                        dy="1.5rem"
                                        fontWeight="bold"
                                        fontSize="4rem"
                                    >
                                        {stepValue(value) * 16 + 16}
                                    </text>
                                    <text
                                        x={100}
                                        y={100}
                                        textAnchor="start"
                                        dx="1.75rem"
                                        dy="-0.5rem"
                                        fontWeight="bold"
                                        fontSize="2rem"
                                    >
                                        °C
                                    </text>
                                </CircularInput>
                                <div className="mt-5 d-flex w-100 justify-content-between">
                                    <AppButton
                                        className={`rounded-lg px-5 ButtonPrimary${
                                            value === 0 ? "-disabled" : ""
                                        }`}
                                        disabled={value === 0}
                                        onClick={() => setValue(value - 0.0625)}
                                    >
                                        -
                                    </AppButton>
                                    <AppButton
                                        className={`rounded-lg px-5 ButtonPrimary${
                                            value === 1 ? "-disabled" : ""
                                        }`}
                                        disabled={value === 1}
                                        onClick={() => setValue(value + 0.0625)}
                                    >
                                        +
                                    </AppButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="">
                            <div
                                className="d-flex my-5 p-2 border-1 rounded-xl"
                                style={{
                                    backgroundColor: controlAC
                                        ? "#3D99FF"
                                        : "#F0F4F9",
                                }}
                            >
                                <div className="d-flex flex-column p-5">
                                    <div
                                        className="AirConditioner_Name"
                                        style={{ color: controlAC && "#fff" }}
                                    >
                                        Điều khiển
                                    </div>
                                    <div
                                        className="AirConditioner_Type"
                                        style={{
                                            color: controlAC && "#dfdfdf",
                                        }}
                                    >
                                        Điều hòa
                                    </div>
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex justify-content-center mt-1 mb-3">
                                            <AppButton
                                                className="border-0 bg-transparent"
                                                onClick={() =>
                                                    dispatch(
                                                        setIsOpenControlDeviceModal(
                                                            {
                                                                isOpenModal: true,
                                                                deviceItem:
                                                                    deviceItem,
                                                            }
                                                        )
                                                    )
                                                }
                                            >
                                                <i className="fad fa-cog fs-4 m-0 iconSetting"></i>
                                            </AppButton>
                                        </div>
                                        <ToggleSwitchControl
                                            // value={item.control.status}
                                            value={controlAC}
                                            onChange={() =>
                                                setControlAC(!controlAC)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AirConditioner;
