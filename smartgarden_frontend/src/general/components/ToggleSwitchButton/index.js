import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";
import { thunkControlDevice } from "features/Device/deviceSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

ToggleSwitchButton.propTypes = {
    deviceItem: PropTypes.object,
};
ToggleSwitchButton.defaultProps = {
    deviceItem: null,
};

function ToggleSwitchButton(props) {
    const { deviceItem } = props;
    const dispatch = useDispatch();
    const [controlDevice, setControlDevice] = useState(false);
    useEffect(() => {
        setControlDevice(deviceItem?.control?.status);
    }, [deviceItem?.control?.status]);
    return (
        <div className="d-flex">
            <label className="switchh my-auto">
                <input
                    type="checkbox"
                    disabled={
                        deviceItem?.control?.lightAuto === true ||
                        deviceItem?.control?.timerAuto === true
                    }
                    checked={controlDevice}
                    onChange={async () => {
                        setControlDevice(!controlDevice);
                        await dispatch(
                            thunkControlDevice({
                                deviceId: deviceItem._id,
                                deviceChannel: deviceItem?.deviceChannel ?? 0,
                                control: {
                                    ...deviceItem?.control,
                                    status: !controlDevice,
                                    intensity: 8000,
                                },
                                automatic: deviceItem.automatic,
                            })
                        );
                    }}
                />
                <span className="sliderr"></span>
            </label>
        </div>
    );
}

export default ToggleSwitchButton;
