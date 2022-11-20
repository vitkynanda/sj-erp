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
    <FormControl sx={{ minWidth: 120, my: 1 }} size="small">
      <InputLabel sx={{ display: "absolute" }}>{formatKey(label)}</InputLabel>
      <Select value={value} sx={{ height: 37 }} name={label} onChange={handleChange}>
        <MenuItem value="Role Id">
          <em>None</em>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.role_id} value={opt.role_id}>
            {opt.role_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
