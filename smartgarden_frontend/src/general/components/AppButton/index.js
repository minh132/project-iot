import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

AppButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  beforIcon: PropTypes.element,
  style: PropTypes.object,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

AppButton.defaultProps = {
  id: null,
  className: null,
  text: null,
  fontSize: null,
  fontWeight: null,
  width: null,
  height: null,
  onClick: null,
  beforIcon: <></>,
  style: {},
  type: "",
  disabled: false,
};

function AppButton(props) {
  const {
    id,
    className,
    text,
    fontSize,
    fontWeight,
    width,
    height,
    onClick,
    beforIcon,
    style,
    type,
    disabled,
    children,
  } = props;

  function clicked(e) {
    if (onClick) {
      onClick(e);
    }
  }


  return (
    <button
      id={id}
      className={`d-flex flex-row align-items-center justify-content-center ${className}`}
      style={{
        width: width,
        height: height,
        fontSize: fontSize || "1rem",
        fontWeight: fontWeight || "600",
        ...style,
      }}
      onClick={clicked}
      type={type}
      disabled={disabled}
    >
      {/* icon */}
      {beforIcon}

      {/* text */}
      <span className="">{text}</span>
      {children}
    </button>
  );
}

export default AppButton;
