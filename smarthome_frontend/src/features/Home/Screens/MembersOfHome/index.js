import {
    thunkConfirmJoinHome,
    thunkDeleteMember,
    thunkGetHomeData,
    thunkRefuseJoinHome
} from "features/Home/homeSlice";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";
import UserHelper from "general/helpers/UserHelper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
MembersOfHome.propTypes = {};

function MembersOfHome(props) {
    const dispatch = useDispatch();

    const { currentAccount } = useSelector((state) => state?.auth);
    const { currentHome, isDeletingMember } = useSelector(
        (state) => state?.home
    );

    const [selectedMember, setSelectedMember] = useState({});
    const [showModalDeleteMember, setShowModalDeleteMember] = useState(false);

    const memberList = currentHome?.accountList?.filter(
        (account) => account.status === "owner"
    );
    const requestingList = currentHome?.accountList?.filter(
        (account) => account.status === "requesting"
    );

    const handleDeleteMember = async () => {
        const res = await dispatch(
            thunkDeleteMember({
                homeId: currentHome?._id,
                accountId: selectedMember?._id,
            })
        );
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(
                `Xóa [${selectedMember?.fullname}] thành công`
            );
            await dispatch(
                thunkGetHomeData({
                    homeId: currentHome._id,
                })
            );
        }
    };
    return (
        <div className="container-xxl">
            <div className="row">
                <div className="col-12 col-md-6 mb-9">
                    <div className="card card-flush">
                        <div className="card-header">
                            <div className="font-weight-bolder font-size-h3 text-remaining">
                                Danh sách thành viên
                            </div>
                            {memberList?.length > 0 ? (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Tổng cộng: {memberList?.length} thành viên
                                </div>
                            ) : (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Danh sách trống
                                </div>
                            )}
                        </div>
                        <div className="card-body p-0">
                            {memberList?.length > 0 && (
                                <div className="d-flex flex-column">
                                    {memberList?.map((item) => (
                                        <div
                                            className="d-flex justify-content-between m-3"
                                            key={item?._id}
                                        >
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={
                                                        item?.avatar ||
                                                        UserHelper.getRandomAvatarUrl()
                                                    }
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            UserHelper.getRandomAvatarUrl();
                                                    }}
                                                    style={{
                                                        height: "35px",
                                                        width: "35px",
                                                        objectFit: "cover",
                                                        marginRight: "1rem",
                                                        borderRadius: "5px",
                                                    }}
                                                    alt="Ảnh đại diện"
                                                />
                                                <div className="fs-6 fw-bold">
                                                    {item?.fullname}
                                                </div>
                                            </div>
                                            {currentAccount?._id !==
                                                item?._id && (
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                        onClick={(e) => {
                                                            setSelectedMember(
                                                                item
                                                            );
                                                            setShowModalDeleteMember(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <i className="far fa-trash p-0 icon-1x" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-9">
                    <div className="card card-flush">
                        <div className="card-header">
                            <div className="font-weight-bolder font-size-h3 text-remaining">
                                Danh sách yêu cầu
                            </div>
                            {requestingList?.length > 0 ? (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Tổng cộng: {requestingList?.length} người
                                </div>
                            ) : (
                                <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                    Danh sách trống
                                </div>
                            )}
                        </div>
                        <div className="card-body p-0">
                            {requestingList?.length > 0 && (
                                <div className="d-flex flex-column">
                                    {requestingList?.map((item) => (
                                        <div
                                            className="d-flex justify-content-between m-3"
                                            key={item?._id}
                                        >
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={
                                                        item?.avatar ||
                                                        UserHelper.getRandomAvatarUrl()
                                                    }
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            UserHelper.getRandomAvatarUrl();
                                                    }}
                                                    style={{
                                                        height: "35px",
                                                        width: "35px",
                                                        objectFit: "cover",
                                                        marginRight: "1rem",
                                                        borderRadius: "5px",
                                                    }}
                                                    alt="Ảnh đại diện"
                                                />
                                                <div className="fs-6 fw-bold">
                                                    {item?.fullname}
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <a
                                                    className="btn btn-icon btn-sm btn-light-primary btn-hover-primary mr-2"
                                                    onClick={async () => {
                                                        await dispatch(
                                                            thunkConfirmJoinHome(
                                                                {
                                                                    homeId: currentHome?._id,
                                                                    accountId:
                                                                        item?._id,
                                                                }
                                                            )
                                                        );
                                                        await dispatch(
                                                            thunkGetHomeData({
                                                                homeId: currentHome._id,
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-plus p-0 icon-1x" />
                                                </a>
                                                <a
                                                    className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                    onClick={async () => {
                                                        await dispatch(
                                                            thunkRefuseJoinHome(
                                                                {
                                                                    homeId: currentHome._id,
                                                                    accountId:
                                                                        item._id,
                                                                }
                                                            )
                                                        );
                                                        await dispatch(
                                                            thunkGetHomeData({
                                                                homeId: currentHome._id,
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <i className="far fa-trash p-0 icon-1x" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <DialogModal
                title="Xóa thành viên"
                description={`Bạn có chắc muốn xóa [${selectedMember?.fullname}]`}
                show={showModalDeleteMember}
                close={!isDeletingMember}
                onClose={() => setShowModalDeleteMember(false)}
                onExecute={handleDeleteMember}
            />
        </div>
    );
}

export default MembersOfHome;
