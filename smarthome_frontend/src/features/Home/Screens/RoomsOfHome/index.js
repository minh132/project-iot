import ModalCreateRoom from "features/Room/Component/ModalCreateRoom";
import ModalEditRoom from "features/Room/Component/ModalEditRoom";
import { thunkDeleteRoom, thunkGetRoomsList } from "features/Room/roomSlice";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import { useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
RoomsOfHome.propTypes = {};

function RoomsOfHome(props) {
    const dispatch = useDispatch();

    const { currentHome } = useSelector((state) => state?.home);
    const { isDeletingRoom, roomsList } = useSelector((state) => state?.room);

    const [selectedRoom, setSelectedRoom] = useState({});
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false);
    const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false);
    const [showModalEditRoom, setShowModalEditRoom] = useState(false);

    const handleDeleteRoom = async () => {
        const res = await dispatch(
            thunkDeleteRoom({
                roomId: selectedRoom._id,
            })
        );
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(
                `Xóa [${selectedRoom?.roomName}] thành công`
            );
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
        }
    };

    return (
        <div className="container-xxl">
            <div className="card card-flush mb-9">
                <div className="card-header d-flex justify-content-between">
                    <div>
                        <div className="font-weight-bolder font-size-h3 text-remaining">
                            Danh sách khu
                        </div>
                        {roomsList?.length > 0 ? (
                            <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                Tổng cộng: {roomsList?.length} khu
                            </div>
                        ) : (
                            <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                Danh sách trống
                            </div>
                        )}
                    </div>
                    <button
                        className="ButtonPrimary"
                        onClick={() => setShowModalCreateRoom(true)}
                    >
                        Thêm khu vực
                    </button>
                </div>
                <div className="card-body p-0">
                    {roomsList?.length > 0 && (
                        <BootstrapTable className="BootstrapTable" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên khu</th>
                                    <th>Số lượng thiết bị</th>
                                    <th>Thực hiện</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomsList?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.roomName}</td>
                                        <td>{item.devicesList.length}</td>
                                        <td>
                                            <div>
                                                <button
                                                    className="ButtonPrimary px-5 px-sm-8 me-sm-3 mb-3 mb-sm-0"
                                                    style={{
                                                        backgroundColor:
                                                            "#13b713",
                                                    }}
                                                    onClick={(e) => {
                                                        setSelectedRoom(item);
                                                        setShowModalEditRoom(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="ButtonDanger px-5 px-sm-8"
                                                    onClick={(e) => {
                                                        setSelectedRoom(item);
                                                        setShowModalDeleteRoom(
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
            <ModalCreateRoom
                onClose={() => setShowModalCreateRoom(false)}
                show={showModalCreateRoom}
                homeId={currentHome?._id}
            />
            <ModalEditRoom
                onClose={() => setShowModalEditRoom(false)}
                show={showModalEditRoom}
                roomItem={selectedRoom}
            />
            <DialogModal
                title="Xóa phòng"
                description={`Bạn có chắc muốn xóa [${selectedRoom?.roomName}]`}
                show={showModalDeleteRoom}
                close={!isDeletingRoom}
                onClose={() => setShowModalDeleteRoom(false)}
                onExecute={handleDeleteRoom}
            />
        </div>
    );
}

export default RoomsOfHome;
