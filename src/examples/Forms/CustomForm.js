import { Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { validateInputField, inputType, formatKey } from "utils";

import { useState } from "react";
import SelectOption from "examples/SelectOption";

const CustomForm = ({ title, input = {}, submitHandler, optionFields, optionFieldList, notRenderFields = [] }) => {
  const [values, setValues] = useState(input);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitWithValidation = () => {
    const isValidInput = validateInputField(values);
    if (isValidInput) {
      submitHandler(values);
    }
  };

  console.log(notRenderFields);
  return (
    <MDBox
      component="form"
      sx={{ minHeight: 250 }}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <MDBox>
        <MDTypography variant="h6">{title ? title.toUpperCase() : "Title"}</MDTypography>
        <Divider />
      </MDBox>
      {Object.entries(values).map(([key, val]) =>
      !notRenderFields.includes(key) &&
        (optionFields.includes(key) ? (
          <SelectOption
            key={key}
            label={key}
            options={optionFieldList.find((opt) => opt.name === key).value}
            onSelect={handlerChange}
          />
        ) : (
          <MDInput
            variant="outlined"
            error={!val}
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

export default CustomForm;
