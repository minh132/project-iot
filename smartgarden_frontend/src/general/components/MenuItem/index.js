import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";

MenuItem.propTypes = {
    className: PropTypes.string,
    className_text: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
};

MenuItem.defaultProps = {
    className: null,
    className_text: null,
    icon: null,
    text: null,
    title: null,
    url: null,
};
function MenuItem(props) {
    const { className, icon, text, title, url, className_text} = props;
    const navigate = useNavigate();
    function handleNavigate(url){
        navigate(url)
    }
    return (
        <div onClick = {() => handleNavigate(url)}>
            <div
                className={`MenuItem d-flex align-items-center py-4 px-lg-1  ${className}`}
                title={title}
            >
                <i className={`px-7 ${icon}`}></i>
                <div className={`MenuItemName ${className_text}`}>{text}</div>
            </div>
        </div>
    );
}

export default MenuItem;
