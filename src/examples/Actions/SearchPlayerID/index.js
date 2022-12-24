import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import { useGlobalStore } from "store";

const SearchPlayerID = ({ refetchFn }) => {
  const { setSearchPlayer, setParams, defaulParams } = useGlobalStore();
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setParams({ ...defaulParams, offset: 0 });
    setSearchPlayer(value);
    refetchFn();
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBox display="flex" width="20rem">
        <MDInput
          sx={{ marginRight: "10px" }}
          placeholder="Search Player ID"
          value={value}
          size="small"
          fullWidth
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <MDButton type="submit" variant="gradient" color="info">
          Search
        </MDButton>
      </MDBox>
    </form>
  );
};

export default SearchPlayerID;
