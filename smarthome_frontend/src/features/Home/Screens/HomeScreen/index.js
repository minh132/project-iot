import { thunkGetAccountInfor } from "app/authSlice";
import { thunkGetDevicesListOfHome } from "features/Device/deviceSlice";
import { thunkDeleteHome } from "features/Home/homeSlice";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import BaseLayout from "general/components/BaseLayout";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DevicesOfHome from "../DevicesOfHome";
import InforOfHome from "../InforOfHome";
import MembersOfHome from "../MembersOfHome";
import RoomsOfHome from "../RoomsOfHome";
import Sensor from "features/Room/Component/Sensor";
import DevicesListScreen from "features/Device/DevicesListScreen";
import PusherHelper from "../../../../general/helpers/PusherHelper";
import {
    updateDevicesListOfHome,
} from "features/Device/deviceSlice";
HomeScreen.propTypes = {};
function HomeScreen(props) {
    const { currentHome, isDeletingHome } = useSelector((state) => state?.home);
    const { currentAccount } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModalDeleteHome, setShowModalDeleteHome] = useState(false);
    const { devicesListOfHome, isGettingDevicesList } = useSelector(
        (state) => state?.device
    );
    useEffect(() => {
        document.title = "Trang thông tin vườn | AUTOWATERING";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
            await dispatch(
                thunkGetDevicesListOfHome({ homeId: currentHome._id })
            );
        };
        fetchData();
        return () => {};
    }, [currentHome._id]);

        const handleDeleteHome = async () => {
        const res = await dispatch(
            thunkDeleteHome({
                homeId: currentHome._id,
            })
        );
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(`Xóa [${currentHome?.name}] thành công`);
            await dispatch(thunkGetAccountInfor());
            navigate("/dashboard");
        }
    };
    // return (
    //     <BaseLayout selected="home">
    //         <div className="HomeScreen flex-column-fluid">
    //             <InforOfHome />
    //             <MembersOfHome />
    //             <RoomsOfHome />
    //             <DevicesOfHome />
    //             <div className="container-xxl">
    //                 <button
    //                     className="ButtonDanger w-100"
    //                     onClick={() => setShowModalDeleteHome(true)}
    //                 >
    //                     Xóa nhà này
    //                 </button>
    //             </div>
    //             <DialogModal
    //                 title="Xóa nhà"
    //                 description={`Bạn có chắc muốn xóa nhà [${currentHome?.name}]`}
    //                 show={showModalDeleteHome}
    //                 close={!isDeletingHome}
    //                 onClose={() => setShowModalDeleteHome(false)}
    //                 onExecute={handleDeleteHome}
    //             />
    //         </div>
            
    //     </BaseLayout>
    // );

    // NamKhanh__Delete RoomsOfHome
    return (
        <BaseLayout selected="home">
            <div className="HomeScreen flex-column-fluid">
                <InforOfHome />
                <MembersOfHome />
                <RoomsOfHome />
                <DevicesOfHome />
                <div className="container-xxl">
                        <div className="row">
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Nhiệt độ, độ ẩm" ||
                                    device.deviceType === "Cảm biến ánh sáng" ||
                                    device.deviceType === "Cảm biến khói" ||
                                    device.deviceType === "Cảm biến động tĩnh"
                            ).length > 0 && (
                                <Sensor
                                    hideRoomName={false}
                                    sensorsList={devicesListOfHome?.filter(
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
                            </div>
                            </div>           
                <div className="container-xxl">
                    <button
                        className="ButtonDanger w-100"
                        onClick={() => setShowModalDeleteHome(true)}
                    >
                        Xóa vườn này
                    </button>
                </div>
                
                <DialogModal
                    title="Xóa vườn"
                    description={`Bạn có chắc muốn xóa vườn [${currentHome?.name}]`}
                    show={showModalDeleteHome}
                    close={!isDeletingHome}
                    onClose={() => setShowModalDeleteHome(false)}
                    onExecute={handleDeleteHome}
                />
                
            </div>
            
        
        </BaseLayout>
        
    );
}

export default HomeScreen;
