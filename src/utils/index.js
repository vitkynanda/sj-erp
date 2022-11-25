import { toast } from "react-toastify";
import { format } from "date-fns";
import * as XLSX from "xlsx";

const exportExcel = (data) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "export.xlsx");
};

const formatDate = (value, type) => {
  var d = new Date(value),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return type === "local" ? [day, month, year].join("-") : [year, month, day].join("-");
};

const responseHandler = (res, { onSuccess, onError }) => {
  if (res?.RESPONSE?.STATUS_CODE === 200)
    onSuccess({ data: res.RESPONSE.DATA, response: res.RESPONSE });

  if (!res.RESPONSE || res?.RESPONSE?.STATUS_CODE > 200)
    onError({
      message: res.RESPONSE ? res.RESPONSE.RESPONSE_MESSAGE : res.message,
      response: res.RESPONSE,
    });
};

const convertBase64 = (type, val) => {
  if (type === "encode") return btoa(val);
  return atob(val);
};

const updateThemeStorage = (key, val) => {
  let currentStorage = JSON.parse(themeStorage);
  if (!currentStorage) currentStorage = {};
  currentStorage[key] = val;
  localStorage.setItem("themeStorage", JSON.stringify(currentStorage));
  return val;
};

const validateInputField = (input) => {
  const mandatoryList = ["username", "password", "role_id", "phone_number"];

  const validate = (input, message) => {
    for (let [key, val] of Object.entries(input)) {
      if (!val && mandatoryList.includes(key)) {
        toast.error(message || `${formatKey(key)} is required !`);
        return false;
      }
    }
    return true;
  };

  if (input.length) {
    let valToValidate = {};
    for (let value of input) {
      valToValidate["VALUE"] = value.VALUE;
    }
    return validate(valToValidate, "All inputs must be filled in !");
  } else {
    return validate(input);
  }
};

const upperFirstChar = (val) => val.charAt(0).toUpperCase() + val.slice(1);

const formatKey = (key) =>
  key
    .split("_")
    .map((val) => upperFirstChar(val))
    .join(" ");

const inputType = (val) => {
  return val.includes("id") ||
    val.includes("index") ||
    val.includes("number") ||
    val.includes("balance")
    ? "number"
    : val.includes("password")
    ? "password"
    : "text";
};

const toastErrorMessage = (res) =>
  (typeof res.error === "string" ? res.error : `${res.error[0].field}, ${res.error[0].message}`) ||
  res.message ||
  "Something went wrong";

const formatDateID = (date) => {
  const dateJS = new Date(date);
  return format(dateJS, "EEE, dd LLL yyyy, HH:mm");
};

const currencyFormat = (format, number, withDecimal = true) => {
  let result = 0;
  if (typeof number === "number") {
    if (withDecimal) {
      result = new Intl.NumberFormat(format, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    } else {
      result = new Intl.NumberFormat(format).format(number);
    }
  }

  switch (format) {
    case "ID":
      return `Rp${result}`;
    default:
      return result;
  }
};

const themeStorage = localStorage.getItem("themeStorage");

const successStatus = [200, 201];

export {
  formatDate,
  responseHandler,
  convertBase64,
  updateThemeStorage,
  inputType,
  formatKey,
  upperFirstChar,
  validateInputField,
  toastErrorMessage,
  formatDateID,
  currencyFormat,
  themeStorage,
  successStatus,
  exportExcel,
};
