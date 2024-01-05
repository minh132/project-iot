import { sha256 } from "js-sha256";
import moment from "moment";
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import _ from 'lodash';
import axios from "axios";

// Util functions
const Utils = {
  // sha256
  sha256: (text) => {
    return sha256(text);
  },

  // hmac-sha512
  hmac512: (key, text) => {
    return hmacSHA512(text, key);
  },

  // Check object empty
  isObjectEmpty: (obj) => {
    return (
      Utils.isObjectNull(obj) ||
      (Object.keys(obj).length === 0 && obj.constructor === Object)
    );
  },

  // Check object null|undefine
  isObjectNull: (obj) => {
    return (
      obj === null || obj === undefined || obj === "NULL" || obj === "null"
    );
  },

  // add date time
  formatAddDateTime: (sDateTime, amount, unit, sFormat, utc = false) => {
    if (utc) {
      return moment(sDateTime).utc().add(amount, unit).format(sFormat);
    }
    return moment(sDateTime).local().add(amount, unit).format(sFormat);
  },

  // Get full url
  getFullUrl: (url) => {
    if (url && !url.startsWith("http") && !url.startsWith("blob")) {
      return `${process.env.REACT_APP_BASE_URL}${url}`;
    }
    return url;
  },

  // format date time
  formatDateTime: (sDateTime, sFormat = "DD/MM/YYYY HH:mm", utc = false) => {
    if (utc) {
      return moment(sDateTime).utc().format(sFormat);
    }
    return moment(sDateTime).local().format(sFormat);
  },

  // add time to date

  addTimeToDate: (
    date = new Date(),
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0
  ) => {
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    date.setMilliseconds(millisecond);

    return date;
  },
  // format currency VND

  /**
   *
   * @str {string,Number} str,number Dãy Cần Định Dạng
   * @currency {string} : Đơn Vị Theo sau Vd VND
   * @separation {string}: giá trị phân cách giữa các số
   * @returns {string} Xau da được định dạng
   */
  formatCurrency: (str, currency = "", separation = ".") => {
    const format = String(str).replace(/\B(?=(\d{3})+(?!\d))/g, separation);
    return format + currency;
  },

  // convert unsigned text
  removeAccents: (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  },

  // format number
  formatNumber: (iNumber) => {
    // if (iNumber < 0) {
    //     return '---';
    // }
    if (isNaN(iNumber)) {
      return "---";
    }
    const iRet = new Intl.NumberFormat("de-DE").format(iNumber);
    if (_.isNaN(iRet)) {
      return "0";
    }
    return iRet;
  },

  qFormatNumber: (number, join = ".") => {
    const sNumber = `${number}`.split("").reverse().join("");
    const chunks = Utils.chunkItems(sNumber, 3);
    return chunks.join(join).split("").reverse().join("");
  },

  // split array
  chunkItems: (items, chunkSize) => {
    let arrRet = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      arrRet.push(chunk);
    }
    return arrRet;
  },
  // decode HTML
  decodeHTML: (html) => {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  },

  // hmac-sha512
  hmac512: (key, text) => {
    return Base64.stringify(hmacSHA512(text, key));
  },

  sortObject: (obj) => {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  },

  // Change empty to null
  formatEmptyKey: (items) => {
    for (const [key, value] of Object.entries(items)) {
      if (value === '') {
        items[key] = null;
      }
    }
  },

  // remove null key
  removeNullKey: (items) => {
    for (const [key, value] of Object.entries(items)) {
      if (_.isNull(value)) {
        delete items[key];
      }
    }
  },

  // Delete null 
  formatNullKey: (items) => {
    for (const [key, value] of Object.entries(items)) {
      if (_.isNull(value)) {
        delete items[key];
      }
    }
  },

  // open link in new tab
  openInNewTab: (url) => {
    window.open(url, '_blank').focus();
  },

  openInCurrentTab: (url) => {
    window.open(url);
  },

  removeNullField: (object) => {
    for (const key in object) {
        const value = object[key];
        if (value === 'Invalid date') {
            delete object[key];
        }
    }
    return object;
},

uploadCloudinary: async (file) => {
  try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "SmartHome");
      const res = await axios.post("https://api.cloudinary.com/v1_1/dauptgx4q/upload", formData);
      console.log(res);
      if (res) {
          return res;
      }
  } catch (error) {
      console.log({
          result: "failed",
          message: "Upload file to cloudinary failed",
          reason: error.message,
      });
  }
},
};

export default Utils;
