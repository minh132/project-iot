import { thunkSignOut } from "app/authSlice";
import { LogoLight } from "assets/icons/Icons";
import UserHelper from "general/helpers/UserHelper";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import DialogModal from "../DialogModal";
import "./style.scss";
import { setIsOpenControlDeviceModal } from "features/Device/deviceSlice";

SideBar.propTypes = {
    className: PropTypes.string,
    loggedIn: PropTypes.bool,
    headerHeight: PropTypes.string,
    selected: PropTypes.string,
    showSideBarMobile: PropTypes.bool,
};

SideBar.defaultProps = {
    className: "",
    loggedIn: false,
    selected: "",
    showSideBarMobile: false,
};

function SideBar(props) {
    const { className, selected, showSideBarMobile } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedIn = UserHelper.checkAccessTokenValid();
    const { currentAccount } = useSelector((state) => state?.auth);
    const { currentHome } = useSelector((state) => state?.home);
    let [showSideBar, setShowSideBar] = useState(true);
    let [showLogOutModal, setShowLogOutModal] = useState(false);

    const handleShowSideBar = () => {
        setShowSideBar(!showSideBar);
    };
    function handleNavigate(url) {
        navigate(url);
    }
    return (
        <div
            className={`SideBar d-inline-flex flex-column align-items-center ${className}`}
            style={showSideBarMobile ? { left: "0" } : { left: "-100%" }}
        >
            <div
                className="d-flex align-items-center justify-content-center w-100"
                style={{ height: "60px", borderBottom: "1px solid #323C55" }}
            >
                <NavLink
                    to="/"
                    className={`LogoSideBar ms-4 mr-12 ${
                        !showSideBar && "SideBar_active"
                    }`}
                >
                    <LogoLight />
                </NavLink>
                {showSideBar && (
                    <i
                        className="ButtonShowSideBarLeft fad fa-chevron-double-left mx-5"
                        onClick={handleShowSideBar}
                    ></i>
                )}
                {!showSideBar && (
                    <i
                        className="ButtonShowSideBarRight fad fa-chevron-double-right mx-5"
                        onClick={handleShowSideBar}
                    ></i>
                )}
            </div>
            <div className="d-flex flex-column flex-fill align-items-center w-100">
                <div className="MenuSideBar w-100 mt-5">
                    <div
                        onClick={() =>
                            currentHome.name
                                ? handleNavigate("/home")
                                : handleNavigate("/")
                        }
                    >
                        <div
                            className="MenuItemHome d-flex align-items-center"
                            title="Vườn"
                        >
                            <i
                                className="fas fa-house-user"
                                style={{
                                    color: selected === "home" && "#3E97FF",
                                }}
                            ></i>
                            <div
                                className={`MenuItemNameHome text-white flex-fill ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                <b className="pr-2">Vườn:</b> {currentHome?.name}
                            </div>
                            <div
                                className={`ArrowItem ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                <i className="far fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() =>
                            currentHome.name
                                ? handleNavigate("/rooms-list")
                                : handleNavigate("/")
                        }
                    >
                        {/* <div
                            className={`MenuItem d-flex align-items-center ${
                                selected === "rooms-list" && "MenuItem_active"
                            }`}
                            title="Danh sách phòng"
                        >
                            <i className="fas fa-door-open"></i>
                            <div
                                className={`MenuItemName ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                Danh sách phòng
                            </div>
                        </div> */}
                    </div>
                    <div
                        onClick={() =>
                            currentHome.name
                                ? handleNavigate("/devices-list")
                                : handleNavigate("/")
                        }
                    >
                        <div
                            className={`MenuItem d-flex align-items-center ${
                                selected === "devices-list" && "MenuItem_active"
                            }`}
                            title="Danh sách thiết bị"
                        >
                            <i className="fas fa-microchip"></i>
                            <div
                                className={`MenuItemName ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                Danh sách thiết bị
                            </div>
                        </div>
                    </div>
                    {/* <div
                        onClick={() =>
                            dispatch(setIsOpenControlDeviceModal(true))
                        }
                    >
                        <div
                            className={`MenuItem d-flex align-items-center`}
                            title="Điều khiển tự động"
                        >
                            <i className="fad fa-cog"></i>
                            <div
                                className={`MenuItemName ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                Điều khiển tự động
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="d-flex flex-column w-100 flex-fill justify-content-end">
                    <div
                        className={`${!showSideBar && "SideBar_active"}`}
                        style={{
                            marginLeft: "1.5rem",
                            color: "#5C5E6C",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                        }}
                    >
                        TÀI KHOẢN
                    </div>
                    <div onClick={() => handleNavigate("/account")}>
                        <div
                            className="MenuItemHome d-flex align-items-center"
                            title="Tài khoản"
                        >
                            <i className="fas fa-user-circle"></i>
                            <div
                                className={`MenuItemNameHome text-white flex-fill ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                {currentAccount?.fullname}
                            </div>
                            <div
                                className={`ArrowItem ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                <i className="far fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setShowLogOutModal(true)}>
                        <div
                            className="MenuItem MenuItem_active"
                            style={{ height: "40px" }}
                            title="Đăng xuất"
                        >
                            {!showSideBar && (
                                <i className="fas fa-sign-out-alt"></i>
                            )}
                            <div
                                className={`MenuItemName ${
                                    !showSideBar && "SideBar_active"
                                }`}
                            >
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogModal
                show={showLogOutModal}
                onClose={() => setShowLogOutModal(false)}
                icon="fad fa-user text-info"
                title="Đăng xuất"
                description="Bạn có chắc chắn muốn đăng xuất?"
                onExecute={async () => {
                    await dispatch(thunkSignOut()).then(() => {
                        UserHelper.signOut();
                    });
                    navigate("/sign-in");
                }}
            />
        </div>
    );
}

export default SideBar;
