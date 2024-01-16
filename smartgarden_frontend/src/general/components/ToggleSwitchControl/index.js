import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useState } from "react";

ToggleSwitchControl.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
};
ToggleSwitchControl.defaultProps = {
    value: false,
    onChange: null,
};

function ToggleSwitchControl(props) {
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

export default ToggleSwitchControl;
