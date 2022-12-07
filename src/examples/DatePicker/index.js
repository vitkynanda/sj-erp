/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formatDate } from "utils";
import { DatePicker } from "@mui/x-date-pickers";
import { useGlobalStore } from "store";
import { useMaterialUIController } from "context";

export default function CustomDatePicker({
  label,
  type,
  width,
  responsive = false,
  fullWidth = false,
}) {
  const { date, setDate } = useGlobalStore();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const updateFn = (newValue) => {
    const formatVal = formatDate(newValue);
    if (type === "start") return setDate({ [type]: formatVal, end: null });
    setDate({ ...date, [type]: formatVal });
  };

  const disabledDate = (valDate) => {
    if (type === "start") return formatDate(valDate) > formatDate(new Date());
    return formatDate(valDate) < date["start"] || formatDate(valDate) > formatDate(new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        shouldDisableDate={disabledDate}
        label={label || "Start Date"}
        value={date[type]}
        inputFormat="dd/MM/yyyy"
        onChange={(newValue) => {
          updateFn(newValue);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              sx={(theme) => ({
                width,
                svg: { color: darkMode ? "#fff" : "inherit" },
                [theme.breakpoints.down("md")]: {
                  width: responsive ? "50%" : fullWidth ? "100%" : width,
                },
              })}
              size="small"
              error={false}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
