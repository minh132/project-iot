import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsOpenControlDeviceModal,
    thunkControlDevice,
} from "features/Device/deviceSlice";
import AppButton from "general/components/AppButton";

Lamp.propTypes = {
    lampsList: PropTypes.array,
    hideRoomName: PropTypes.bool,
};

Lamp.defaultProps = {
    lampsList: [],
    hideRoomName: true,
};

function Lamp(props) {
    const { lampsList, hideRoomName } = props;
    const dispatch = useDispatch();
    const { roomsList } = useSelector((state) => state?.room);
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;
    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Thiết bị bơm nước</div>
                </div>
                <div className="row">
                    {lampsList.map((item, index) => (
                        <div
                            className={
                                item?.control?.lightAuto ||
                                item?.control?.timerAuto
                                    ? "col-12"
                                    : "Lamp col-12 col-sm-6 col-md-12 col-lg-6"
                            }
                            key={index}
                        >
                            <div
                                className="d-flex my-5 p-2 border-1 rounded-xl"
                                style={{
                                    backgroundColor: item.control.status
                                        ? "#3D99FF"
                                        : "#F0F4F9",
                                }}
                            >
                                <div className="d-flex flex-column p-5">
                                    <div
                                        className="Lamp_Name"
                                        style={{
                                            color:
                                                item.control.status && "#fff",
                                        }}
                                    >
                                        {item.deviceName}
                                        {item?.control?.lightAuto && (
                                            <span
                                                style={{
                                                    fontSize: "0.85rem",
                                                    fontWeight: "500",
                                                    color: "#d10000",
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                {" - "}
                                                Tự động bật ( Cường độ ánh sáng{" "}
                                                {">"}{" "}
                                                {item?.automatic?.lightValue} )
                                            </span>
                                        )}
                                        {item?.control?.timerAuto && (
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
                                                {item?.automatic?.hourFrom < 10
                                                    ? "0" +
                                                      item?.automatic?.hourFrom
                                                    : item?.automatic?.hourFrom}
                                                :
                                                {item?.automatic?.minuteFrom <
                                                10
                                                    ? "0" +
                                                      item?.automatic
                                                          ?.minuteFrom
                                                    : item?.automatic
                                                          ?.minuteFrom}{" "}
                                                -{">"}{" "}
                                                {item?.automatic?.hourTo < 10
                                                    ? "0" +
                                                      item?.automatic?.hourTo
                                                    : item?.automatic?.hourTo}
                                                :
                                                {item?.automatic?.minuteTo < 10
                                                    ? "0" +
                                                      item?.automatic?.minuteTo
                                                    : item?.automatic
                                                          ?.minuteTo}{" "}
                                                hàng ngày )
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className="Lamp_Type"
                                        style={{
                                            color:
                                                item.control.status &&
                                                "#dfdfdf",
                                        }}
                                    >
                                        {hideRoomName
                                            ? item.deviceType
                                            : renderRoomName(item.roomId)}
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
                                                                    item,
                                                            }
                                                        )
                                                    )
                                                }
                                            >
                                                <i className="fad fa-cog fs-4 m-0 iconSetting"></i>
                                            </AppButton>
                                        </div>
                                        <ToggleSwitchButton deviceItem={item} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Lamp;
