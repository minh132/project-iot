import AppData from "general/constants/AppData";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./style.scss";

InputCategoryDevice.propTypes = {
    categoryInput: PropTypes.string,
    handleSelected: PropTypes.func,
};

InputCategoryDevice.defaultProps = {
    categoryInput: "",
    handleSelected: null,
};

function InputCategoryDevice(props) {
    const { categoryInput, handleSelected } = props;
    const [deviceSelected, setDeviceSelected] = useState("");

    useEffect(() => {
        setDeviceSelected("");
        return () => {};
    }, [categoryInput]);

    return (
        <div className="row">
            {categoryInput === "security" &&
                AppData.security.map((device, index) => (
                    <div className="col-12 col-md-6 p-2" key={index}>
                        <div
                            className={`DeviceItem d-flex align-items-center p-2 rounded-xl cursor-pointer ${
                                deviceSelected === device.value &&
                                "DeviceItem_active"
                            }`}
                            onClick={() => {
                                setDeviceSelected(device.value);
                                handleSelected(device);
                            }}
                        >
                            <img
                                src={device.image}
                                style={{ height: "40px", margin: "0.5rem" }}
                                alt=""
                            />
                            <span>{device.text}</span>
                        </div>
                    </div>
                ))}
            {categoryInput === "powerSwitch" &&
                AppData.powerSwitch.map((device, index) => (
                    <div className="col-12 col-md-6 p-2" key={index}>
                        <div
                            className={`DeviceItem d-flex align-items-center p-2 rounded-xl cursor-pointer ${
                                deviceSelected === device.value &&
                                "DeviceItem_active"
                            }`}
                            onClick={() => {
                                setDeviceSelected(device.value);
                                handleSelected(device);
                            }}
                        >
                            <img
                                src={device.image}
                                style={{ height: "40px", margin: "0.5rem" }}
                                alt=""
                            />
                            <span>{device.text}</span>
                        </div>
                    </div>
                ))}
            {categoryInput === "lightEquipment" &&
                AppData.lightEquipment.map((device, index) => (
                    <div className="col-12 col-md-6 p-2" key={index}>
                        <div
                            className={`DeviceItem d-flex align-items-center p-2 rounded-xl cursor-pointer ${
                                deviceSelected === device.value &&
                                "DeviceItem_active"
                            }`}
                            onClick={() => {
                                setDeviceSelected(device.value);
                                handleSelected(device);
                            }}
                        >
                            <img
                                src={device.image}
                                style={{ height: "40px", margin: "0.5rem" }}
                                alt=""
                            />
                            <span>{device.text}</span>
                        </div>
                    </div>
                ))}
            {categoryInput === "sensor" &&
                AppData.sensor.map((device, index) => (
                    <div className="col-12 col-md-6 p-2" key={index}>
                        <div
                            className={`DeviceItem d-flex align-items-center p-2 rounded-xl cursor-pointer ${
                                deviceSelected === device.value &&
                                "DeviceItem_active"
                            }`}
                            onClick={() => {
                                setDeviceSelected(device.value);
                                handleSelected(device);
                            }}
                        >
                            <img
                                src={device.image}
                                style={{ height: "40px", margin: "0.5rem" }}
                                alt=""
                            />
                            <span>{device.text}</span>
                        </div>
                    </div>
                ))}
            {categoryInput === "electricalEquipment" &&
                AppData.electricalEquipment.map((device, index) => (
                    <div className="col-12 col-md-6 p-2" key={index}>
                        <div
                            className={`DeviceItem d-flex align-items-center p-2 rounded-xl cursor-pointer ${
                                deviceSelected === device.value &&
                                "DeviceItem_active"
                            }`}
                            onClick={() => {
                                setDeviceSelected(device.value);
                                handleSelected(device);
                            }}
                        >
                            <img
                                src={device.image}
                                style={{ height: "40px", margin: "0.5rem" }}
                                alt=""
                            />
                            <span>{device.text}</span>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default InputCategoryDevice;
