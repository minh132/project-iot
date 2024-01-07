// import ModalEditRoom from "features/Room/Component/ModalEditRoom";
import ModalEditDevice from "features/Device/Components/ModalEditDevice";
import {
    thunkDeleteDevice,
    thunkGetDevicesListOfHome,
} from "features/Device/deviceSlice";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import { useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
DevicesOfHome.propTypes = {};

function DevicesOfHome(props) {
    const dispatch = useDispatch();

    const { currentHome } = useSelector((state) => state?.home);
    const { isDeletingDevice, devicesListOfHome } = useSelector(
        (state) => state?.device
    );
    const { roomsList } = useSelector((state) => state?.room);

    const [selectedDevice, setSelectedDevice] = useState({});
    const [showModalDeleteDevice, setShowModalDeleteDevice] = useState(false);
    const [showModalEditDevice, setShowModalEditDevice] = useState(false);

    const handleDeleteDevice = async () => {
        const res = await dispatch(
            thunkDeleteDevice({
                deviceId: selectedDevice._id,
            })
        );
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(
                `Xóa [${selectedDevice?.deviceName}] thành công`
            );
            await dispatch(thunkGetDevicesListOfHome({ homeId: currentHome._id }));
        }
    };

    return (
        <div className="container-xxl">
            <div className="card card-flush mb-9">
                <div className="card-header d-flex justify-content-between">
                    <div>
                        <div className="font-weight-bolder font-size-h3 text-remaining">
                            Danh sách thiết bị
                        </div>
                        {devicesListOfHome?.length > 0 ? (
                            <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                Tổng cộng: {devicesListOfHome?.length} thiết bị
                            </div>
                        ) : (
                            <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                Danh sách trống
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-body p-0">
                    {devicesListOfHome?.length > 0 && (
                        <BootstrapTable className="BootstrapTable" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên thiết bị</th>
                                    <th>Loại</th>
                                    <th>Khu vực</th>
                                    <th>Thực hiện</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devicesListOfHome?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.deviceName}</td>
                                        <td>{item.deviceType}</td>
                                        <td>
                                            {
                                                roomsList.filter(
                                                    (room) =>
                                                        room._id ===
                                                        item.roomId
                                                )[0]?.roomName
                                            }
                                        </td>
                                        <td>
                                            <div>
                                                <button
                                                    className="ButtonPrimary px-5 px-sm-8 me-sm-3 mb-3 mb-sm-0"
                                                    style={{
                                                        backgroundColor:
                                                            "#13b713",
                                                    }}
                                                    onClick={(e) => {
                                                        setSelectedDevice(item);
                                                        setShowModalEditDevice(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="ButtonDanger px-5 px-sm-8"
                                                    onClick={(e) => {
                                                        setSelectedDevice(item);
                                                        setShowModalDeleteDevice(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </BootstrapTable>
                    )}
                </div>
            </div>
            <ModalEditDevice
                onClose={() => setShowModalEditDevice(false)}
                show={showModalEditDevice}
                deviceItem={selectedDevice}
            />
            <DialogModal
                title="Xóa thiết bị"
                description={`Bạn có chắc muốn xóa [${selectedDevice?.deviceName}]`}
                show={showModalDeleteDevice}
                close={!isDeletingDevice}
                onClose={() => setShowModalDeleteDevice(false)}
                onExecute={handleDeleteDevice}
            />
        </div>
    );
}

export default DevicesOfHome;
