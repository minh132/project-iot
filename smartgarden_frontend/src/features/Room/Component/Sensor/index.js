import {
    setIsOpenControlDeviceModal,
    updateLightSensorValue,
    updateTemperatureAndHumidity,
} from "features/Device/deviceSlice";
import AppButton from "general/components/AppButton";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import PusherHelper from "general/helpers/PusherHelper";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

Sensor.propTypes = {
    sensorsList: PropTypes.array,
    hideRoomName: PropTypes.bool,
};

Sensor.defaultProps = {
    sensorsList: [],
    hideRoomName: true,
};

function Sensor(props) {
    const dispatch = useDispatch();
    const { sensorsList, hideRoomName } = props;
    // const [temperature, setTemperature] = useState("");
    // const [humidity, setHumidity] = useState("");
    const { roomsList } = useSelector((state) => state?.room);
    const { temperature, humidity, lightSensor } = useSelector(
        (state) => state?.device
    );
    const renderRoomName = (id) =>
        roomsList?.filter((room) => room._id === id)[0]?.roomName;
    PusherHelper.Subscribe("device", "temperature-humidity", (d) => {
        const tempData = d.tempData;
        dispatch(updateTemperatureAndHumidity(tempData));
    });
    PusherHelper.Subscribe("device", "light-sensor", (d) => {
        const lightData = d.lightData;
        dispatch(updateLightSensorValue(lightData));
    });

    // useEffect(() => {
    //     setInterval(() => {
    //         const fetchData = async () => {
    //             const res = await dispatch(
    //                 thunkGetTemperatureAndHumidity({
    //                     deviceId: "6404163f8828ecf1fae97a76",
    //                 })
    //             );
    //             setTemperature(res.payload.data.temperature);
    //             setHumidity(res.payload.data.humidity);
    //         };
    //         fetchData();
    //     }, 10000);

    //     return () => {};
    // }, []);

    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Cảm biến</div>
                </div>
                <div className="row">
                    {sensorsList.map((item, index) =>
                        item.deviceType === "Nhiệt độ, độ ẩm" ? (
                            <Fragment key={index}>
                                <div className="Sensor col-12 col-sm-6 col-md-12 col-lg-6">
                                    <div
                                        className="d-flex my-5 p-2 border-1 rounded-xl"
                                        style={{
                                            backgroundColor: "#F0F4F9",
                                        }}
                                    >
                                        <div className="d-flex flex-column p-5">
                                            <div className="Sensor_Name">
                                                Nhiệt độ:{" "}
                                                {parseFloat(temperature) ||
                                                    "__"}{" "}
                                                °C
                                            </div>
                                            <div className="Sensor_Type">
                                                {!hideRoomName &&
                                                    renderRoomName(item.roomId)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Sensor col-12 col-sm-6 col-md-12 col-lg-6">
                                    <div
                                        className="d-flex my-5 p-2 border-1 rounded-xl"
                                        style={{
                                            backgroundColor: "#F0F4F9",
                                        }}
                                    >
                                        <div className="d-flex flex-column p-5">
                                            <div className="Sensor_Name">
                                                Độ ẩm:{" "}
                                                {parseFloat(humidity) || "__"} %
                                            </div>
                                            <div className="Sensor_Type">
                                                {!hideRoomName &&
                                                    renderRoomName(item.roomId)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : item.deviceType === "Cảm biến ánh sáng" ? (
                            <div
                                className="Sensor col-12 col-sm-6 col-md-12 col-lg-6"
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
                                            className="Sensor_Name"
                                            style={{
                                                color:
                                                    item.control.status &&
                                                    "#fff",
                                            }}
                                        >
                                            Ánh sáng: {lightSensor || "__"}
                                        </div>
                                        <div
                                            className="Sensor_Type"
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
                                    {/* <div className="d-flex flex-fill justify-content-end">
                                        <div className="position-relative">
                                            <AppButton
                                                className="position-absolute border-0"
                                                style={{
                                                    top: "0.5rem",
                                                    right: "0.3rem",
                                                }}
                                                onClick={() =>
                                                    dispatch(
                                                        setIsOpenControlDeviceModal(
                                                            true
                                                        )
                                                    )
                                                }
                                            >
                                                <i className="fad fa-cog fs-4 iconSetting"></i>
                                            </AppButton>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        ) : (
                            <div
                                className="Sensor col-12 col-sm-6 col-md-12 col-lg-6"
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
                                            className="Sensor_Name"
                                            style={{
                                                color:
                                                    item.control.status &&
                                                    "#fff",
                                            }}
                                        >
                                            {item.deviceName}
                                        </div>
                                        <div
                                            className="Sensor_Type"
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
                                        <ToggleSwitchButton deviceItem={item} />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sensor;
