import BaseLayout from "general/components/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import { thunkDeleteDevice, thunkGetDevicesList } from "app/deviceSlice";
import BaseSearchBar from "general/components/Form/BaseSearchBar";
import ToastHelper from "general/helpers/ToastHelper";
import ModalEditDevice from "./ModalEditDevice";
import DialogModal from "general/components/DialogModal";

DevicesListScreen.propTypes = {};

function DevicesListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { devicesList, isDeletingDevice } = useSelector(
        (state) => state?.device
    );
    const [selectedDevice, setSelectedDevice] = useState({});
    const [showModalEditDevice, setShowModalEditDevice] = useState(false);
    const [showModalDeleteDevice, setShowModalDeleteDevice] = useState(false);

    const [filters, setFilters] = useState({
        q: "",
    });
    useEffect(() => {
        document.title = "Danh sách thiết bị | Sgarden"
     }, []);

    const handleDeleteDevice = async () => {
        const res = await dispatch(
            thunkDeleteDevice({
                deviceId: selectedDevice._id,
            })
        );
        console.log(res);
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(
                `Xóa [${selectedDevice?.deviceName}] thành công`
            );
            await dispatch(thunkGetDevicesList(filters));
        }
    };

    useEffect(() => {
        dispatch(thunkGetDevicesList(filters));
    }, [filters]);
    return (
        <div>
            <BaseLayout selected="devices">
                <div className="DevicesListScreen flex-column-fluid">
                    <div className="container-xxl">
                        <div className="card card-flush mb-9">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <div className="font-weight-bolder font-size-h3 text-remaining">
                                        Danh sách thiết bị
                                    </div>
                                    <div>
                                        <BaseSearchBar
                                            placeholder="Tìm kiếm theo loại thiết bị"
                                            className=""
                                            value={filters.q}
                                            name="deviceFilter"
                                            onSubmit={(value) => {
                                                setFilters({
                                                    ...filters,
                                                    q: value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {devicesList?.length > 0 ? (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Tổng cộng: {devicesList?.length} thiết
                                        bị
                                    </div>
                                ) : (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Danh sách trống
                                    </div>
                                )}
                            </div>
                            <div className="card-body p-0">
                                {devicesList?.length > 0 && (
                                    <BootstrapTable striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên thiết bị</th>
                                                <th>Loại thiết bị</th>
                                                <th>Thực hiện</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {devicesList?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.deviceName}</td>
                                                    <td>{item.deviceType}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-primary btn-hover-primary mr-2"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedDevice(
                                                                        item
                                                                    );
                                                                    setShowModalEditDevice(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-pen p-0 icon-1x" />
                                                            </a>
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedDevice(
                                                                        item
                                                                    );
                                                                    setShowModalDeleteDevice(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-trash p-0 icon-1x" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </BootstrapTable>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalEditDevice
                    show={showModalEditDevice}
                    onClose={() => setShowModalEditDevice(false)}
                    deviceItem={selectedDevice}
                />
                <DialogModal
                    title="Xóa thiết bị"
                    description={`Bạn có chắc muốn xóa thiết bị [${selectedDevice?.deviceName}]`}
                    show={showModalDeleteDevice}
                    close={!isDeletingDevice}
                    onClose={() => setShowModalDeleteDevice(false)}
                    onExecute={handleDeleteDevice}
                />
            </BaseLayout>
        </div>
    );
}

export default DevicesListScreen;
