import { Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { formatKey } from "utils";

const AutoCompleteInput = ({
  label = "",
  options = [],
  onSelect = () => {},
  val,
  ...restProps
}) => {
  const [value, setValue] = useState(null);
  const handleChange = (_, newVal) => {
    setValue(newVal || null);
    onSelect({ target: { name: label, value: newVal?.value || "" } });
  };

  useEffect(() => {
    if (val) setValue(options.find((opt) => opt.value === val));
  }, [val, options]);

  return (
    <Autocomplete
      {...restProps}
      disablePortal
      id="id"
      onChange={handleChange}
      options={options}
      defaultValue=""
      getOptionLabel={(option) => option?.key || ""}
      sx={{ my: 1 }}
      value={value}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      renderInput={(params) => <MDInput {...params} label={formatKey(label)} />}
      size="small"
    />
  );
};

export default AutoCompleteInput;
