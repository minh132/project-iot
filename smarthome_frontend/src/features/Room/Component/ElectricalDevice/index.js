import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsOpenControlDeviceModal,
    thunkControlDevice,
} from "features/Device/deviceSlice";
import ToggleSwitchControl from "general/components/ToggleSwitchControl";
import AppButton from "general/components/AppButton";

ElectricalDevice.propTypes = {
    deviceItem: PropTypes.object,
    hideRoomName: PropTypes.bool,
};

ElectricalDevice.defaultProps = {
    deviceItem: null,
    hideRoomName: true,
};

function ElectricalDevice(props) {
    const { deviceItem, hideRoomName } = props;
    const dispatch = useDispatch();
    const [mode, setMode] = useState(deviceItem?.control?.intensity);
    const [controlED, setControlED] = useState(deviceItem?.control?.status);
    const { roomsList } = useSelector((state) => state?.room);
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;

    useEffect(() => {
        setControlED(deviceItem?.control?.status);
        setMode(deviceItem?.control?.intensity);
    }, [deviceItem]);
    useEffect(() => {
        const handleControlED = async () => {
            await dispatch(
                thunkControlDevice({
                    deviceId: deviceItem._id,
                    deviceChannel: deviceItem.deviceChannel,
                    control: {
                        ...deviceItem?.control,
                        status: controlED,
                        intensity: mode,
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
            handleControlED();

        return () => {};
    }, [controlED]);

    useEffect(() => {
        const handleControlEDD = async () => {
            deviceItem?.control?.status &&
                (await dispatch(
                    thunkControlDevice({
                        deviceId: deviceItem._id,
                        deviceChannel: deviceItem.deviceChannel,
                        control: {
                            ...deviceItem?.control,
                            status: true,
                            intensity: mode,
                        },
                        automatic: deviceItem.automatic,
                    })
                ));
        };
        if (
            deviceItem.control.lightAuto === false &&
            deviceItem.control.timerAuto === false
        )
            handleControlEDD();

        return () => {};
    }, [mode]);

    return (
        <div className="ElectricalDevice col-12">
            <div
                className="d-flex my-5 p-2 border-1 rounded-xl"
                style={{
                    backgroundColor: "#F0F4F9",
                }}
            >
                <div className="d-flex flex-column p-5">
                    <div className="ElectricalDevice_Name">
                        {deviceItem?.deviceName}{" "}
                        {!hideRoomName && (
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    color: "#bdbdbd",
                                }}
                            >
                                {" - "}
                                {renderRoomName(deviceItem?.roomId)}
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
                    <div className="ElectricalDevice_Type">
                        <p className="mt-2 mb-1">Chế độ</p>
                        <div>
                            <button
                                className={`${
                                    mode === 800
                                        ? "ButtonPrimary"
                                        : "ButtonCancel"
                                } me-2`}
                                onClick={() => setMode(800)}
                            >
                                1
                            </button>
                            <button
                                className={`${
                                    mode === 4400
                                        ? "ButtonPrimary"
                                        : "ButtonCancel"
                                } me-2`}
                                onClick={() => setMode(4400)}
                            >
                                2
                            </button>
                            <button
                                className={`${
                                    mode === 8000
                                        ? "ButtonPrimary"
                                        : "ButtonCancel"
                                } me-2`}
                                onClick={() => setMode(8000)}
                            >
                                3
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-fill justify-content-end">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center mt-1 mb-3">
                            <AppButton
                                className="border-0 bg-transparent"
                                onClick={() =>
                                    dispatch(
                                        setIsOpenControlDeviceModal({
                                            isOpenModal: true,
                                            deviceItem: deviceItem,
                                        })
                                    )
                                }
                            >
                                <i className="fad fa-cog fs-4 m-0 iconSetting"></i>
                            </AppButton>
                        </div>
                        <ToggleSwitchControl
                            value={controlED}
                            onChange={() => setControlED(!controlED)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElectricalDevice;
