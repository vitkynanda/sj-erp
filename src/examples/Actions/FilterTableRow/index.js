import { Menu, MenuItem, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import { useState } from "react";
import ThemedIconButton from "components/UI/ThemedIconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import MDTypography from "components/MDTypography";
import { useGlobalStore } from "store";

const FilterTableRow = ({ lov = [], handler }) => {
  const [menu, setMenu] = useState(null);
  // const [filterVal, setFilterVal] = useState("All");
  const { filterVal, setFilterVal } = useGlobalStore();
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);

  const closeMenu = (type) => {
    setMenu(null);
    setFilterVal(type);
    handler({ type: type === "All" ? "" : type.toUpperCase() });
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={() => setMenu(null)}
    >
      {lov.map((l) => (
        <MenuItem key={l} onClick={() => closeMenu(l)}>
          {l}
        </MenuItem>
      ))}
    </Menu>
  );
  return (
    <MDBox>
      <Stack spacing={1} direction="row" alignItems="center">
        <MDTypography
          fontSize={14}
          sx={(theme) => ({
            color: "#fff",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
        >
          {filterVal === "All" ? "" : "Filtered By " + filterVal}
        </MDTypography>
        <ThemedIconButton sx={{ color: "#fff" }} onClick={!menu ? openMenu : () => {}}>
          <FilterListIcon />
        </ThemedIconButton>
      </Stack>

      {renderMenu}
    </MDBox>
  );
};

export default FilterTableRow;
