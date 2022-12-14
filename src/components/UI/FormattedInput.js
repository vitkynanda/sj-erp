import { TextField } from "@mui/material";
import * as React from "react";
import { NumericFormat } from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
      // isNumericString
      prefix="Rp"
    />
  );
});

const FormattedInput = ({ ...restProps }) => {
  return (
    <TextField
      size="small"
      {...restProps}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
};

export default FormattedInput;
