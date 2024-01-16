import { thunkGetAccountInfor } from "app/authSlice";
import { thunkGetDevicesListOfGarden } from "features/Device/deviceSlice";
import { thunkDeleteGarden } from "features/Garden/gardenSlice";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import BaseLayout from "general/components/BaseLayout";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DevicesOfgarden from "../DevicesOfgarden";
import InforOfgarden from "../InforOfgarden";
import MembersOfgarden from "../MembersOfgarden";
import RoomsOfgarden from "../RoomsOfgarden";
import Sensor from "features/Room/Component/Sensor";
import DevicesListScreen from "features/Device/DevicesListScreen";
import PusherHelper from "../../../../general/helpers/PusherHelper";
import {
    updateDevicesListOfGarden,
} from "features/Device/deviceSlice";
GardenScreen.propTypes = {};
function GardenScreen(props) {
    const { currentgarden, isDeletinggarden } = useSelector((state) => state?.garden);
    const { currentAccount } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModalDeletegarden, setShowModalDeletegarden] = useState(false);
    const { devicesListOfgarden, isGettingDevicesList } = useSelector(
        (state) => state?.device
    );
    useEffect(() => {
        document.title = "Trang thông tin vườn | AUTOWATERING";
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

        const handleDeleteGarden = async () => {
        const res = await dispatch(
            thunkDeleteGarden({
                gardenId: currentgarden._id,
            })
        );
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(`Xóa [${currentgarden?.name}] thành công`);
            await dispatch(thunkGetAccountInfor());
            navigate("/dashboard");
        }
    };
    // return (
    //     <BaseLayout selected="garden">
    //         <div className="gardenScreen flex-column-fluid">
    //             <InforOfgarden />
    //             <MembersOfgarden />
    //             <RoomsOfgarden />
    //             <DevicesOfgarden />
    //             <div className="container-xxl">
    //                 <button
    //                     className="ButtonDanger w-100"
    //                     onClick={() => setShowModalDeletegarden(true)}
    //                 >
    //                     Xóa nhà này
    //                 </button>
    //             </div>
    //             <DialogModal
    //                 title="Xóa nhà"
    //                 description={`Bạn có chắc muốn xóa nhà [${currentgarden?.name}]`}
    //                 show={showModalDeletegarden}
    //                 close={!isDeletinggarden}
    //                 onClose={() => setShowModalDeletegarden(false)}
    //                 onExecute={handleDeletegarden}
    //             />
    //         </div>
            
    //     </BaseLayout>
    // );

    // NamKhanh__Delete RoomsOfgarden
    return (
        <BaseLayout selected="garden">
            <div className="gardenScreen flex-column-fluid">
                <InforOfgarden />
                <MembersOfgarden />
                <RoomsOfgarden />
                <DevicesOfgarden />
                <div className="container-xxl">
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
                            </div>
                            </div>           
                <div className="container-xxl">
                    <button
                        className="ButtonDanger w-100"
                        onClick={() => setShowModalDeletegarden(true)}
                    >
                        Xóa vườn này
                    </button>
                </div>
                
                <DialogModal
                    title="Xóa vườn"
                    description={`Bạn có chắc muốn xóa vườn [${currentgarden?.name}]`}
                    show={showModalDeletegarden}
                    close={!isDeletinggarden}
                    onClose={() => setShowModalDeletegarden(false)}
                    onExecute={handleDeleteGarden}
                />
                
            </div>
            
        
        </BaseLayout>
        
    );
}

export default GardenScreen;
