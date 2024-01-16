import AirConditioner from "features/Room/Component/AirConditioner";
import Camera from "features/Room/Component/Camera";
import ElectricalDevice from "features/Room/Component/ElectricalDevice";
import Lamp from "features/Room/Component/Lamp";
import PowerSwitch from "features/Room/Component/PowerSwitch";
import Security from "features/Room/Component/Security";
import Sensor from "features/Room/Component/Sensor";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetDevicesListOfGarden } from "../deviceSlice";
import "./style.scss";

DevicesListScreen.propTypes = {};

function DevicesListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentgarden } = useSelector((state) => state?.garden);
    const { devicesListOfgarden, isGettingDevicesList } = useSelector(
        (state) => state?.device
    );

    useEffect(() => {
        document.title = "Trang danh sách thiết bị | AUTOWATERING";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ gardenId: currentgarden._id }));
            await dispatch(
                thunkGetDevicesListOfGarden({ gardenId: currentgarden._id })
            );
        };
        fetchData();
        return () => {};
    }, [currentgarden._id]);

    return (
        <BaseLayout selected="devices-list">
            <div className="container-xxl">
                {isGettingDevicesList ? (
                    <div className="d-flex mt-15 justify-content-center align-items-center">
                        <div
                            className="spinner-border text-primary"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : devicesListOfgarden.length > 0 ? (
                    <div className="rounded-lg">
                        <div className="row">
                            {devicesListOfgarden?.filter(
                                (device) =>
                                    device.deviceType === "Nhiệt độ, độ ẩm" ||
                                    device.deviceType === "Cảm biến ánh sáng" ||
                                    device.deviceType === "Cảm biến khói" ||
                                    device.deviceType === "Cảm biến động tĩnh"
                            ).length > 0 && (
                                <Sensor
                                    hideRoomName={false}
                                    sensorsList={devicesListOfgarden?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Nhiệt độ, độ ẩm" ||
                                            device.deviceType ===
                                                "Cảm biến khói" ||
                                            device.deviceType ===
                                                "Cảm biến ánh sáng" ||
                                            device.deviceType ===
                                                "Cảm biến động tĩnh"
                                    )}
                                />
                            )}
                            {devicesListOfgarden?.filter(
                                (device) =>
                                    device.deviceType === "Bóng đèn" ||
                                    device.deviceType === "Dải đèn" ||
                                    device.deviceType === "Đèn bàn" ||
                                    device.deviceType === "Đèn ngủ"
                            ).length > 0 && (
                                <Lamp
                                    hideRoomName={false}
                                    lampsList={devicesListOfgarden?.filter(
                                        (device) =>
                                            device.deviceType === "Bóng đèn" ||
                                            device.deviceType === "Dải đèn" ||
                                            device.deviceType === "Đèn bàn" ||
                                            device.deviceType === "Đèn ngủ"
                                    )}
                                />
                            )}
                            {devicesListOfgarden?.filter(
                                (device) => device.deviceType === "Camera"
                            ).length > 0 &&
                                devicesListOfgarden
                                    ?.filter(
                                        (device) =>
                                            device.deviceType === "Camera"
                                    )
                                    .map((item) => (
                                        <Camera
                                            key={item._id}
                                            hideRoomName={false}
                                            deviceItem={item}
                                        />
                                    ))}
                            {devicesListOfgarden?.filter(
                                (device) => device.deviceType === "Máy lạnh"
                            ).length > 0 &&
                                devicesListOfgarden
                                    ?.filter(
                                        (device) =>
                                            device.deviceType === "Máy lạnh"
                                    )
                                    .map((item) => (
                                        <AirConditioner
                                            key={item._id}
                                            hideRoomName={false}
                                            deviceItem={item}
                                        />
                                    ))}

                            {devicesListOfgarden?.filter(
                                (device) =>
                                    device.deviceType === "Chuông chống trộm" ||
                                    device.deviceType === "Khóa cửa" ||
                                    device.deviceType === "Két sắt an toàn"
                            ).length > 0 && (
                                <Security
                                    hideRoomName={false}
                                    devicesList={devicesListOfgarden?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Chuông chống trộm" ||
                                            device.deviceType === "Khóa cửa" ||
                                            device.deviceType ===
                                                "Két sắt an toàn"
                                    )}
                                />
                            )}
                            {devicesListOfgarden?.filter(
                                (device) =>
                                    device.deviceType === "Quạt" ||
                                    device.deviceType === "Máy lọc không khí" ||
                                    device.deviceType === "Máy hút ẩm"
                            ).length > 0 && (
                                <div className="col-12 col-md-6">
                                    <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                                        <div className="d-flex m-3">
                                            <div className="Camera_Name me-1">
                                                Thiết bị điện
                                            </div>
                                        </div>
                                        <div className="row">
                                            {devicesListOfgarden
                                                ?.filter(
                                                    (device) =>
                                                        device.deviceType ===
                                                            "Quạt" ||
                                                        device.deviceType ===
                                                            "Máy lọc không khí" ||
                                                        device.deviceType ===
                                                            "Máy hút ẩm"
                                                )
                                                .map((item) => (
                                                    <ElectricalDevice
                                                        key={item._id}
                                                        deviceItem={item}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {devicesListOfgarden?.filter(
                                (device) =>
                                    device.deviceType === "Công tắc" ||
                                    device.deviceType === "Ổ cắm"
                            ).length > 0 && (
                                <PowerSwitch
                                    devicesList={devicesListOfgarden?.filter(
                                        (device) =>
                                            device.deviceType === "Công tắc" ||
                                            device.deviceType === "Ổ cắm"
                                    )}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center fs-4 mt-30">
                        Chưa có thiết bị
                    </div>
                )}
            </div>
        </BaseLayout>
    );
}

export default DevicesListScreen;
