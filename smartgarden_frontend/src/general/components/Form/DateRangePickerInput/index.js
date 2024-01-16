import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import DateRangePicker from "react-bootstrap-daterangepicker";

import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import Utils from "general/utils/Utils";
import { useRef } from "react";
import { useState } from "react";

DateRangePickerInput.propTypes = {
  format: PropTypes.string,
  className: PropTypes.string,
  getRange: PropTypes.func,
  haveTitle: PropTypes.bool,
};

DateRangePickerInput.defaultProps = {
  format: "DD/MM/YYYY",
  className: "",
  getRange: null,
  haveTitle: true,
};

function DateRangePickerInput(props) {
  const { format, className, getRange, haveTitle } = props;
  const dateRangePickerInput = useRef(null);
  const [range, setRange] = useState("Tất cả");

  function handleEvent(event, picker) {
    // console.log(picker.startDate);
  }

  function handleCallback(start, end, label) {
    let dateRange = {};
    const startDate = Utils.formatDateTime(start._d, format);
    const endDate = Utils.formatDateTime(end._d, format);

    if (label === "Tất cả") {
      setRange("Tất cả");
      dateRange = { startDate: "", endDate: "" };
    } else {
      setRange(`${startDate} - ${endDate}`);
      dateRange = {
        startDate: Utils.formatDateTime(start._d),
        endDate: Utils.formatDateTime(end._d),
      };
    }
    if (getRange) {
      getRange(dateRange);
    }
    console.log(startDate, endDate, label);
  }

  function handleFocus() {
    dateRangePickerInput.current.ref.focus();
  }

  return (
    <div
      className={`DateRangePickerInput cursor-pointer d-flex flex-row align-items-center justify-content-between ${className}`}
      onClick={handleFocus}
    >
      {haveTitle && (
        <div>
          <i
            className="DateRangePickerInput_Icon_Calender fas fa-calendar-day ml-2"
            style={{ color: "#4A5677" }}
          ></i>
          <span
            className="DateRangePickerInput_Title font-weight-bold ml-2"
            style={{ color: "#4A5677" }}
          >
            Thời gian:{" "}
          </span>
        </div>
      )}
      <div>
        <span
          className="font-size-base font-weight-bolder mx-3"
          style={{ color: "#F48023"}}
        >
          {range}
        </span>
      </div>
      <i
        className="DateRangePickerInput_Icon_Down fas fa-caret-down mr-3"
        style={{ color: "#4A5677" }}
      ></i>
        <DateRangePicker
          ref={dateRangePickerInput}
          onEvent={handleEvent}
          onCallback={handleCallback}
          // className = 'position-absolute pl-28'
          style={{ display: "none" }}
          initialSettings={{
            opens: "left",
            locale: {
              format: format,
            },
            ranges: {
              "Tất cả": "",
              "7 ngày gần đây": [moment().subtract(6, "days"), moment()],
              "15 ngày gần đây": [moment().subtract(14, "days"), moment()],
              "30 ngày gần đây": [moment().subtract(29, "days"), moment()],
              "Quý I": [
                moment().quarter(1).startOf("Q"),
                moment().quarter(1).endOf("Q"),
              ],
              "Quý II": [
                moment().quarter(2).startOf("Q"),
                moment().quarter(2).endOf("Q"),
              ],
              "Quý III": [
                moment().quarter(3).startOf("Q"),
                moment().quarter(3).endOf("Q"),
              ],
              "Quý IV": [
                moment().quarter(4).startOf("Q"),
                moment().quarter(4).endOf("Q"),
              ],
              "Năm nay": [
                moment().quarter(1).startOf("Q"),
                moment().quarter(4).endOf("Q"),
              ],
            },
          }}
        >
          <input
            style={{
              // position: 'absolute',
              backgroundColor: "transparent",
              height: "38px",
              width: "0px",
              // bottom: '0%'
            }}
            className="cursor-pointer rounded"
          />
        </DateRangePicker>
    </div>
  );
}

export default DateRangePickerInput;
