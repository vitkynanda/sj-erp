import { Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { validateInputField, inputType, formatKey } from "utils";
import { useMemo, useState } from "react";
import SelectOption from "examples/SelectOption";
import { useGlobalStore } from "store";
import FormattedInput from "components/UI/FormattedInput";
import { currencyFormatList } from "utils";

const TrxForm = ({
  title,
  input = {},
  submitHandler,
  optionFields,
  optionFieldList,
  notRenderFields = [],
}) => {
  const [values, setValues] = useState(input);

  const { players } = useGlobalStore();

  const handlerChange = (e) => {
    const { name, value } = e.target;
    const newVal = {};
    if (value === "36ceafe0-609b-4b1e-93e2-382817b949cc") {
      newVal.status = "COMPLETED";
    } else if (name === "type_id" && value !== "36ceafe0-609b-4b1e-93e2-382817b949cc") {
      newVal.status = "";
    }
    setValues({ ...values, ...newVal, [name]: value });
  };

  const submitWithValidation = () => validateInputField(values) && submitHandler(values);

  const findBank = useMemo(
    () => players.find((p) => p.player_id === values.player_id),
    [players, values.player_id]
  );

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
      {Object.entries(values).map(
        ([key, val]) =>
          !notRenderFields.includes(key) &&
          (optionFields.includes(key) ? (
            <SelectOption
              key={key}
              label={key}
              options={
                key === "bank_player_id"
                  ? findBank
                    ? findBank.bank_player.map((b) => ({
                        key: b.bank_name + " - " + b.account_number,
                        value: b.bank_player_id,
                      }))
                    : []
                  : optionFieldList.find((opt) => opt.name === key).value
              }
              onSelect={handlerChange}
              val={val}
              readOnly={
                (key === "status" &&
                  val === "COMPLETED" &&
                  values.type_id === "36ceafe0-609b-4b1e-93e2-382817b949cc") ||
                (key === "bank_player_id" && values.player_id === "")
              }
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

export default TrxForm;
