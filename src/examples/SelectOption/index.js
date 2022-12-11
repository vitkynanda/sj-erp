import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatKey } from "utils";

export default function SelectOption({
  label = "",
  options = [],
  onSelect = () => {},
  val,
  ...restProps
}) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    onSelect(event);
  };

  useEffect(() => {
    if (val) setValue(val);
  }, [val]);

  return (
    <FormControl sx={{ my: 1 }} fullWidth size="small">
      <InputLabel>{formatKey(label)}</InputLabel>
      <Select
        {...restProps}
        value={value}
        sx={{ height: 37 }}
        name={label}
        onChange={handleChange}
        label={formatKey(label)}
      >
        {options.map((opt, idx) => (
          <MenuItem key={idx} value={opt.value}>
            {opt.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
