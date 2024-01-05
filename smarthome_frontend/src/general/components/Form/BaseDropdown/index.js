import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import "./style.scss";
import AppResource from "general/constants/AppResource";
import EmptyView from "general/components/EmptyView";

BaseDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  fieldProps: PropTypes.object.isRequired,
  fieldMeta: PropTypes.object.isRequired,
  fieldHelpers: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,

  options: PropTypes.array,

  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  onValueChanged: PropTypes.func,
  dropdownInitialValue: PropTypes.string,
  require: PropTypes.bool,
  additionalElement: PropTypes.element,
  emptyDescription: PropTypes.string,
};

BaseDropdown.defaultProps = {
  label: "",
  disabled: false,
  text: "",
  options: [],
  containerClassName: "",
  labelClassName: "text-remaining",
  selectClassName: "",
  onValueChanged: null,
  dropdownInitialValue: "",
  require: false,
  additionalElement: null,
  emptyDescription: ''
};

function BaseDropdown(props) {
  // MARK: --- Params ---
  const {
    fieldProps,
    fieldMeta,
    fieldHelpers,
    name,
    label,
    disabled,
    text,
    options,
    containerClassName,
    labelClassName,
    selectClassName,
    onValueChanged,
    dropdownInitialValue,
    require,
    additionalElement,
    emptyDescription
  } = props;
  const showError = false;
  const value = fieldProps.value;
  const [dropdownValue, setDropdownValue] = useState(dropdownInitialValue);

  // MARK: --- Functions ---
  function handleOptionChanged(e) {
    if (onValueChanged) {
      onValueChanged(e);
    }
  }

  useEffect(() => {
    if (value && options.length > 0) {
      setDropdownValue(options.filter((item) => item.value === value)[0]?.text);
    } else {
      setDropdownValue(dropdownInitialValue);
    }
  }, [value, options]);

  return (
    <div className={`BaseDropdown ${containerClassName}`}>
      {label && (
        <label
          className={`col-form-label text-remaining text-left text-xl-right ${labelClassName}`}
        >
          {label}
          {require && (
            <span
              className="font-weight-boldest ml-1"
              style={{ color: AppResource.colors.remainingColor }}
            >{`*`}</span>
          )}
        </label>
      )}
      <div className={` ${selectClassName}`}>
        <Dropdown>
          <Dropdown.Toggle
            id={name}
            disabled={disabled}
            className={`w-100 cursor-pointer bg-white border d-flex flex-row align-items-center justify-content-between shadow-none ${
              showError ? "is-invalid" : ""
            }`}
            multiple={fieldProps?.multiple}
            value={value}
            variant=""
          >
            <p className="m-0 q-max-line-1">{dropdownValue}</p>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {options.length > 0 ? (
              options.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    value={item.value}
                    onClick={() => {
                      setDropdownValue(item.text);
                      handleOptionChanged(item.value);
                    }}
                    className="d-flex flex-row align-items-center justify-content-between"
                  >
                    <span>{item.text}</span>
                    {item.value === value && (
                      <i className="fas fa-check text-primary"></i>
                    )}
                  </Dropdown.Item>
                );
              })
            ) : (
              <div className="d-flex align-items-center justify-content-center flex-column">
                {<EmptyView
                  text={`${emptyDescription ? emptyDescription : `Chưa có ${label.toLowerCase()}`}`}
                  visible={false}
                  imageEmpty={AppResource.images.noDataContact.default}
                  widthInPercent={40}
                />}
                {additionalElement && <div>
                  {additionalElement}
                </div>}
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>
        {text.length > 0 && (
          <span className="form-text text-muted">{text}</span>
        )}
      </div>
    </div>
  );
}

export default BaseDropdown;
