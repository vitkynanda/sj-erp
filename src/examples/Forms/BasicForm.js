import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { validateInputField, inputType, formatKey } from "utils";
import { useState } from "react";
import { currencyFormatList } from "utils";
import FormattedInput from "components/UI/FormattedInput";
import AutoCompleteInput from "components/UI/AutoCompleteInput";

const BasicForm = ({ title, input, submitHandler, disableFields = [], notRenderFields = [] }) => {
  const [values, setValues] = useState(input);

  const handlerChange = (e) => {
    const { name, value, checked } = e.target;
    setValues({ ...values, [name]: name === "active" ? checked : value });
  };

  const submitWithValidation = () => {
    const isValidInput = validateInputField(values);
    if (isValidInput) submitHandler(values);
  };

  return (
    <MDBox component="form" display="flex" justifyContent="space-between" flexDirection="column">
      <MDBox>
        <MDTypography variant="h6">{title ? title.toUpperCase() : "Title"}</MDTypography>
        <Divider />
      </MDBox>
      {Object.entries(values).map(
        ([key, val]) =>
          !notRenderFields.includes(key) &&
          (key === "active" ? (
            <FormControlLabel
              control={<Checkbox checked={val} />}
              label={formatKey(key)}
              onChange={handlerChange}
              name={key}
              key={key}
            />
          ) : key === "type" ? (
            <AutoCompleteInput
              key={key}
              label={key}
              options={[
                { key: "PLUS", value: "PLUS" },
                { key: "MINUS", value: "MINUS" },
              ]}
              onSelect={handlerChange}
            />
          ) : currencyFormatList.includes(key) ? (
            <FormattedInput
              variant="outlined"
              sx={{ my: 1 }}
              placeholder={formatKey(key)}
              label={formatKey(key)}
              key={key}
              name={key}
              value={val}
              type={inputType(key)}
              size="small"
              fullWidth
              onChange={handlerChange}
            />
          ) : (
            <MDInput
              variant="outlined"
              error={!val}
              InputProps={{
                readOnly: disableFields.includes(key),
              }}
              sx={{ my: 1 }}
              placeholder={formatKey(key)}
              label={formatKey(key)}
              key={key}
              name={key}
              value={val}
              type={inputType(key)}
              size="small"
              fullWidth
              onChange={handlerChange}
            />
          ))
      )}

      <MDBox textAlign="right" sx={{ mt: 3 }}>
        <MDButton onClick={submitWithValidation} color="info" variant="gradient">
          Submit
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default BasicForm;
