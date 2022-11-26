import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatKey } from "utils";

export default function SelectOption({ label = "", options = [], onSelect = () => {} }) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    onSelect(event);
  };

  return (
    <FormControl sx={{ my: 1 }} fullWidth size="small">
      <InputLabel>{formatKey(label)}</InputLabel>
      <Select
        value={value}
        sx={{ height: 37 }}
        name={label}
        onChange={handleChange}
        label={formatKey(label)}
      >
        {options.map((opt) => (
          <MenuItem key={opt.key} value={opt.value}>
            {opt.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
