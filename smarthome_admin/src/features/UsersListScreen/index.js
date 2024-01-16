import BaseLayout from "general/components/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap/Table";
import BaseSearchBar from "general/components/Form/BaseSearchBar";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import { thunkDeleteUser, thunkGetUsersList } from "app/authSlice";
import UserHelper from "general/helpers/UserHelper";
import ModalEditUser from "./ModalEditUser";
import DialogModal from "general/components/DialogModal";
import ToastHelper from "general/helpers/ToastHelper";

UsersListScreen.propTypes = {};

function UsersListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { usersList, isDeletingUser } = useSelector((state) => state?.auth);
    const [selectedUser, setSelectedUser] = useState({});
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [filters, setFilters] = useState({
        q: "",
    });

    useEffect(() => {
        document.title = "Danh sách người dùng | Sgarden"
     }, []);

    const handleDeleteUser = async () => {
        const res = await dispatch(
            thunkDeleteUser({
                userId: selectedUser._id,
            })
        );
        if (res.payload.result === "success") {
            ToastHelper.showSuccess(`Xóa [${selectedUser?.fullname}] thành công`);
            await dispatch(thunkGetUsersList(filters));
        }
    };

    useEffect(() => {
        dispatch(thunkGetUsersList(filters));
    }, [filters]);
    return (
        <div>
            <BaseLayout selected="users">
                <div className="UsersListScreen flex-column-fluid">
                    <div className="container-xxl">
                        <div className="card card-flush mb-9">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <div className="font-weight-bolder font-size-h3 text-remaining">
                                        Danh sách người dùng
                                    </div>
                                    <div>
                                        <BaseSearchBar
                                            placeholder="Tìm kiếm người dùng"
                                            className=""
                                            value={filters.q}
                                            name="userFilter"
                                            onSubmit={(value) => {
                                                setFilters({
                                                    ...filters,
                                                    q: value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {usersList?.length > 0 ? (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Tổng cộng: {usersList?.length} người
                                        dùng
                                    </div>
                                ) : (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Danh sách trống
                                    </div>
                                )}
                            </div>
                            <div className="card-body p-0">
                                {usersList?.length > 0 && (
                                    <BootstrapTable striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ảnh</th>
                                                <th>Tên</th>
                                                <th>Giới tính</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                                <th>Địa chỉ</th>
                                                <th>Thực hiện</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usersList?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={
                                                                item?.avatar ||
                                                                UserHelper.getRandomAvatarUrl()
                                                            }
                                                            onError={(e) => {
                                                                e.target.onerror =
                                                                    null;
                                                                e.target.src =
                                                                    UserHelper.getRandomAvatarUrl();
                                                            }}
                                                            style={{
                                                                height: "35px",
                                                                width: "35px",
                                                                objectFit:
                                                                    "cover",
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                            alt="Ảnh đại diện"
                                                        />
                                                    </td>
                                                    <td>{item.fullname}</td>
                                                    <td>
                                                        {item.gender?.length > 0
                                                            ? item.gender
                                                            : "Khác"}
                                                    </td>
                                                    <td>
                                                        {item.email?.length > 0
                                                            ? item.email
                                                            : "Không có"}
                                                    </td>
                                                    <td>
                                                        {item.phone?.length > 0
                                                            ? item.phone
                                                            : "Không có"}
                                                    </td>
                                                    <td>
                                                        {item.address?.length >
                                                        0
                                                            ? item.address
                                                            : "Không có"}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-primary btn-hover-primary mr-2"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedUser(
                                                                        item
                                                                    );
                                                                    setShowModalEditUser(
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
                                                                    setSelectedUser(
                                                                        item
                                                                    );
                                                                    setShowModalDeleteUser(
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
            </BaseLayout>
            <ModalEditUser show={showModalEditUser} onClose={() => setShowModalEditUser(false)} userItem={selectedUser}/>
            <DialogModal
                    title="Xóa người dùng"
                    description={`Bạn có chắc muốn xóa [${selectedUser?.fullname}]`}
                    show={showModalDeleteUser}
                    close={!isDeletingUser}
                    onClose={() => setShowModalDeleteUser(false)}
                    onExecute={handleDeleteUser}
                />
        </div>
    );
}

export default UsersListScreen;
