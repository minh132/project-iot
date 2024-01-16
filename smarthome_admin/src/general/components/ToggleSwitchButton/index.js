import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";

ToggleSwitchButton.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
};
ToggleSwitchButton.defaultProps = {
    value: false,
    onChange: null,
};

function ToggleSwitchButton(props) {
    const { value, onChange } = props;
    return (
        <div className="d-flex">
            <label className="switchh my-auto">
                <input
                    type="checkbox"
                    checked={value ?? false}
                    onChange={onChange}
                />
                <span className="sliderr"></span>
            </label>
        </div>
    );
}

export default ToggleSwitchButton;
