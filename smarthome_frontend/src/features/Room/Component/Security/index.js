import { thunkControlDevice } from "features/Device/deviceSlice";
import ToggleSwitchButton from "general/components/ToggleSwitchButton";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

Security.propTypes = {
    hideRoomName: PropTypes.bool,
    devicesList: PropTypes.array,
};

Security.defaultProps = {
    hideRoomName: true,
    devicesList: [],
};

function Security(props) {
    const { devicesList, hideRoomName } = props;
    const dispatch = useDispatch();
    const {roomsList} = useSelector(state => state?.room);
    const renderRoomName = (id) => roomsList?.filter(room => room._id === id)[0]?.roomName;
    return (
        <div className="col-12 col-md-6">
            <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                <div className="d-flex m-3">
                    <div className="Camera_Name me-1">Thiết bị bảo vệ</div>
                </div>
                <div className="row">
                    {devicesList.map((item, index) => (
                        <div className="Security col-12 col-sm-6 col-md-12 col-lg-6" key={index}>
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
                                        className="Security_Name"
                                        style={{
                                            color: item.control.status && "#fff",
                                        }}
                                    >
                                        {item.deviceName}
                                    </div>
                                    <div
                                        className="Security_Type"
                                        style={{
                                            color: item.control.status && "#dfdfdf",
                                        }}
                                    >
                                        {hideRoomName ? item.deviceType : renderRoomName(item.roomId)}
                                    </div>
                                </div>
                                <div className="d-flex flex-fill justify-content-end">
                                    <ToggleSwitchButton
                                        deviceItem={item}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Security;
