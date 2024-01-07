import {
    thunkCreateHome,
    thunkGetHomeData,
    thunkGetOtherHomesList,
    thunkRefuseJoinHome,
    thunkRequestToJoinHome,
} from "features/Home/homeSlice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/images/avatar.png";
import * as Yup from "yup";
import BackgroundAccount from "../../assets/images/auto_watering.png";
import "./style.scss";
import AppButton from "general/components/AppButton";
import BaseTextField from "general/components/Form/BaseTextField";
import ToastHelper from "general/helpers/ToastHelper";
import { thunkGetAccountInfor, thunkSignOut } from "app/authSlice";
import Utils from "general/utils/Utils";
import UserHelper from "general/helpers/UserHelper";
import BaseSearchBar from "general/components/Form/BaseSearchBar";

Dashboard.propTypes = {};

function Dashboard(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selected, setSelected] = useState("owner");
    const [filters, setFilters] = useState({
        q: "",
    });
    const { currentAccount, isGettingInfor } = useSelector(
        (state) => state?.auth
    );
    const { otherHomesList, isGettingDataList } = useSelector(
        (state) => state?.home
    );
    const homeList = currentAccount?.homeList;
    const ownerList = homeList?.filter((home) => home.status === "owner");
    const requestingList = homeList?.filter(
        (home) => home.status === "requesting"
    );

    useEffect(() => {
        document.title = "Trang quản lý vườn | AUTOWATERING"
     }, []);

    function handleNavigate(url) {
        navigate(url);
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
        },
        onSubmit: async (values) => {
            const params = {
                ...values,
            };
            console.log("Thông tin vườn mới", params);
            try {
                const res = await dispatch(thunkCreateHome(params));
                if (res) {
                    ToastHelper.showSuccess(`Thêm vườn thành công`);
                    await dispatch(thunkGetAccountInfor());
                    navigate("/home");
                }
            } catch (error) {
                console.log(`loggin error: ${error.message}`);
                // ToastHelper.showError('Đăng nhập không thành công');
            }
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Bạn chưa nhập tên vườn"),
            address: Yup.string().required("Bạn chưa nhập địa chỉ vườn"),
        }),
    });

    const handleLogOut = async () => {
        await dispatch(thunkSignOut()).then(() => {
            UserHelper.signOut();
        });
        navigate("/sign-in");
    };

    useEffect(() => {
        dispatch(thunkGetOtherHomesList(filters));
    }, [filters]);

    // const handleNavigateHome = async (params) => {
    //     await dispatch(thunkGetHomeData(params));
    //     navigate("/home");
    // };

    return (
        <div className="container-lg">
            <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
                <div className="col-lg-4 p-5">
                    <div className="bg-white position-relative rounded-lg shadow">
                        <div className="position-absolute top-0 right-0 mt-4 me-4">
                            <button
                                className="LogoutBtn shadow"
                                onClick={handleLogOut}
                            >
                                Đăng xuất
                            </button>
                        </div>
                        <div className="d-flex flex-column">
                            <img
                                className="BackgroundAccount"
                                src={BackgroundAccount}
                                alt=""
                            />
                            <div>
                                <img
                                    className="ImgAccount"
                                    src={
                                        currentAccount?.avatar ||
                                        UserHelper.getRandomAvatarUrl()
                                    }
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            UserHelper.getRandomAvatarUrl();
                                    }}
                                    alt="avatar"
                                />
                            </div>
                            <div className="row px-5 pb-10">
                                <div className="col-12 fs-5 fw-bold mt-2 text-dark-75">
                                    {currentAccount?.fullname}
                                </div>
                                <div className="col-12 col-sm-5 col-lg-12 ms-4 mt-2">
                                    <b>Giới tính:</b> {currentAccount?.gender}
                                </div>
                                <div className="col-12 col-sm-5 col-lg-12 ms-4 mt-2">
                                    <b>Ngày sinh:</b>{" "}
                                    {Utils.formatDateTime(
                                        currentAccount?.dob,
                                        "DD-MM-YYYY"
                                    )}
                                </div>
                                <div className="col-12 col-sm-5 col-lg-12 ms-4 mt-2">
                                    <b>Địa chỉ:</b> {currentAccount?.address}
                                </div>
                                <div className="col-12 col-sm-5 col-lg-12 ms-4 mt-2">
                                    <b>Số điện thoại:</b>{" "}
                                    {currentAccount?.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 p-5">
                    <div className="d-flex flex-column ">
                        <div
                            className="d-flex p-3 rounded-lg shadow flex-wrap"
                            style={{ backgroundColor: "#f1f1f1" }}
                        >
                            <div className="d-flex flex-wrap">
                                <div
                                    className={`ButtonNavigate ${
                                        selected === "owner" &&
                                        "ButtonNavigate_active"
                                    }`}
                                    onClick={() => setSelected("owner")}
                                >
                                    Khu vườn đang có
                                </div>
                                <div
                                    className={`ButtonNavigate ${
                                        selected === "requesting" &&
                                        "ButtonNavigate_active"
                                    }`}
                                    onClick={() => setSelected("requesting")}
                                >
                                    Khu vườn đang yêu cầu
                                </div>
                                <div
                                    className={`ButtonNavigate ${
                                        selected === "other-homes" &&
                                        "ButtonNavigate_active"
                                    }`}
                                    onClick={async () => {
                                        setSelected("other-homes");
                                        await dispatch(
                                            thunkGetOtherHomesList(filters)
                                        );
                                    }}
                                >
                                    Khu vườn khác
                                </div>
                            </div>
                            <div className="d-flex flex-fill justify-content-end align-items-center">
                                <div
                                    className={`ButtonNavigate d-flex justify-content-center align-items-center ${
                                        selected === "create-home" &&
                                        "ButtonNavigate_active"
                                    }`}
                                    onClick={() => setSelected("create-home")}
                                >
                                    <i className="far fa-plus-circle me-2"></i>
                                    Thêm khu vườn
                                </div>
                            </div>
                        </div>
                        <div className="TableHomesList bg-white p-8 rounded-lg shadow mt-5">
                            {isGettingInfor && (
                                <div>
                                    <span>Đang lấy dữ liệu...</span>
                                    <span className="spinner spinner-loader spinner-primary"></span>
                                </div>
                            )}
                            {selected === "owner" && (
                                <div>
                                    {ownerList?.length > 0 ? (
                                        <BootstrapTable className="BootstrapTable" striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Vườn</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Trạng thái</th>
                                                    <th>Thực hiện</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ownerList.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>{item.homeName}</td>
                                                        <td>
                                                            {item.homeAddress}
                                                        </td>
                                                        <td>Chủ khu vườn</td>
                                                        <td>
                                                            <button
                                                                className="ButtonPrimary"
                                                                onClick={async () => {
                                                                    await dispatch(
                                                                        thunkGetHomeData(
                                                                            {
                                                                                homeId: item._id,
                                                                            }
                                                                        )
                                                                    );
                                                                    navigate(
                                                                        "/home"
                                                                    );
                                                                }}
                                                            >
                                                                Chi tiết vườn
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </BootstrapTable>
                                    ) : (
                                        !isGettingInfor && (
                                            <div>Danh sách trống</div>
                                        )
                                    )}
                                </div>
                            )}
                            {selected === "requesting" && (
                                <div>
                                    {requestingList?.length > 0 ? (
                                        <BootstrapTable className="BootstrapTable" striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Vườn</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Trạng thái</th>
                                                    <th>Thực hiện</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requestingList.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>
                                                            <div className="">
                                                                {item.homeName}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item.homeAddress}
                                                        </td>
                                                        <td>Đang yêu cầu</td>
                                                        <td>
                                                            <button
                                                                className="ButtonCancel"
                                                                onClick={async () => {
                                                                    await dispatch(
                                                                        thunkRefuseJoinHome(
                                                                            {
                                                                                homeId: item._id,
                                                                                accountId:
                                                                                    currentAccount._id,
                                                                            }
                                                                        )
                                                                    );
                                                                    await dispatch(
                                                                        thunkGetAccountInfor()
                                                                    );
                                                                }}
                                                            >
                                                                Hủy yêu cầu
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </BootstrapTable>
                                    ) : (
                                        <div>Danh sách trống</div>
                                    )}
                                </div>
                            )}
                            {selected === "other-homes" && (
                                <div>
                                    {otherHomesList?.length > 0 ? (
                                        <div>
                                            <BaseSearchBar
                                                placeholder="Tìm kiếm vườn"
                                                className="mb-5"
                                                value={filters.q}
                                                name="homeFilter"
                                                onSubmit={(value) => {
                                                    setFilters({
                                                        ...filters,
                                                        q: value,
                                                    });
                                                }}
                                            />
                                            <BootstrapTable className="BootstrapTable"
                                                striped
                                                bordered
                                                hover
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Vườn</th>
                                                        <th>Địa chỉ</th>
                                                        <th>Thực hiện</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {otherHomesList.map(
                                                        (item) => (
                                                            <tr key={item._id}>
                                                                <td>
                                                                    {item.name}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.address
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="ButtonPrimary"
                                                                        onClick={async () => {
                                                                            await dispatch(
                                                                                thunkRequestToJoinHome(
                                                                                    {
                                                                                        homeId: item._id,
                                                                                    }
                                                                                )
                                                                            );
                                                                            await dispatch(
                                                                                thunkGetOtherHomesList()
                                                                            );
                                                                            await dispatch(
                                                                                thunkGetAccountInfor()
                                                                            );
                                                                        }}
                                                                    >
                                                                        Gửi yêu
                                                                        cầu
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </BootstrapTable>
                                        </div>
                                    ) : (
                                        !isGettingDataList && (
                                            <div>Danh sách trống</div>
                                        )
                                    )}
                                </div>
                            )}
                            {selected === "create-home" && (
                                <div>
                                    <form
                                        className="CreateHomeForm"
                                        onSubmit={formik.handleSubmit}
                                    >
                                        <div>
                                            <h1
                                                style={{
                                                    fontWeight: "600",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Thêm vườn mới
                                            </h1>
                                            <div>
                                                <BaseTextField
                                                    name="name"
                                                    placeholder="Nhập tên khu vườn..."
                                                    label="Vườn"
                                                    additionLabelClassName="fs-5 fw-bold"
                                                    fieldHelper={formik.getFieldHelpers(
                                                        "name"
                                                    )}
                                                    fieldProps={formik.getFieldProps(
                                                        "name"
                                                    )}
                                                    fieldMeta={formik.getFieldMeta(
                                                        "name"
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <BaseTextField
                                                    name="address"
                                                    placeholder="Nhập địa chỉ vườn..."
                                                    label="Địa chỉ"
                                                    additionLabelClassName="fs-5 fw-bold"
                                                    fieldHelper={formik.getFieldHelpers(
                                                        "address"
                                                    )}
                                                    fieldProps={formik.getFieldProps(
                                                        "address"
                                                    )}
                                                    fieldMeta={formik.getFieldMeta(
                                                        "address"
                                                    )}
                                                />
                                            </div>
                                            <AppButton
                                                className="btn-blue mt-5 w-100"
                                                text="Thêm vườn"
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
