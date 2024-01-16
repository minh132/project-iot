import React from "react";
import PropTypes from "prop-types";

BasePopup.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    description: PropTypes.string,
    funcHandler: PropTypes.func,
    funcOut: PropTypes.func,
};

BasePopup.defaultProps = {
    title: "",
    icon: "",
    description: "",
    funcHandler: null,
    funcOut: null,
};

function BasePopup(props) {
    const { title, icon, description, funcHandler, funcOut } = props;
    return (
        <div
            className="d-flex justify-content-center align-items-center position-fixed top-0 left-0 min-vh-100 min-vw-100"
            style={{
                backgroundColor: "rgba(0,0,0,.4)",
                zIndex: "1003",
            }}
        >
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded">
                <h6 className="py-4 m-0 px-auto">{title}</h6>
                <div className="d-flex flex-column align-items-center pt-4 w-100 bg-secondary">
                    <div>
                        <i
                            className={`${icon} fa-4x`}
                            style={{ color: "#3E97FF" }}
                        ></i>
                    </div>
                    <p
                        className="fs-7"
                        style={{ fontSize: "12px", fontWeight: "500" }}
                    >
                        {description}
                    </p>
                </div>
                <div className="d-flex justify-content-center p-3 w-100">
                    <button
                        type="button"
                        className="ButtonPrimary px-10"
                        onClick={funcHandler}
                    >
                        Xác nhận
                    </button>
                    <button
                        type="button"
                        className="ButtonCancel px-15 ms-3"
                        onClick={funcOut}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BasePopup;
