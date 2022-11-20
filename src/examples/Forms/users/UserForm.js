import { Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { validateInputField, inputType, formatKey } from "utils";

import { useState } from "react";
import SelectOption from "examples/SelectOption";
import { useGlobalStore } from "store";

const UserForm = ({ type = "Create", submitHandler }) => {
  const { roles } = useGlobalStore();
  const [values, setValues] = useState({
    username: "",
    password: "",
    role_id: "",
    phone_number: "",
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  console.log(values);

  const submitWithValidation = () => {
    const isValidInput = validateInputField(values);
    if (isValidInput) {
      submitHandler(values);
    }
  };

  return (
    <MDBox
      component="form"
      sx={{ minHeight: 250 }}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <MDBox>
        <MDTypography variant="h6">{type ? type.toUpperCase() : "Title"}</MDTypography>
        <Divider />
      </MDBox>
      {Object.entries(values).map(([key, val]) =>
        key === "role_id" ? (
          <SelectOption label={key} options={roles} onSelect={handlerChange} />
        ) : (
          <MDInput
            variant="outlined"
            error={!val && type !== "detail"}
            InputProps={{
              readOnly: type === "detail",
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
        )
      )}
      {type !== "detail" && (
        <MDBox textAlign="right" sx={{ mt: 3 }}>
          <MDButton onClick={submitWithValidation} color="info" variant="gradient">
            Submit
          </MDButton>
        </MDBox>
      )}
    </MDBox>
  );
};

export default UserForm;
