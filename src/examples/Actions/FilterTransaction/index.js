import { Menu, MenuItem, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import { useGlobalStore } from "store";
import ThemedIconButton from "components/UI/ThemedIconButton";

import FilterListIcon from "@mui/icons-material/FilterList";
import MDTypography from "components/MDTypography";

const FilterTransaction = () => {
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const { transactions, setFilteredTransactions, filterVal, setFilterVal } = useGlobalStore();

  const closeMenu = (type) => {
    setMenu(null);

    if (type === "Default") return setFilteredTransactions(transactions);
    setFilterVal(type);
    setFilteredTransactions(
      transactions.filter((trx) => trx.type_transaction === type.toUpperCase())
    );
  };

  useEffect(() => {
    setFilterVal("Default");
    setFilteredTransactions(transactions);
  }, [setFilteredTransactions, transactions, setFilterVal]);

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
      <MenuItem onClick={() => closeMenu("Default")}>Default</MenuItem>
      <MenuItem onClick={() => closeMenu("Deposit")}>Deposit</MenuItem>
      <MenuItem onClick={() => closeMenu("Withdraw")}>Withdraw</MenuItem>
      <MenuItem onClick={() => closeMenu("Bonus")}>Bonus</MenuItem>
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
          Filtered By {filterVal}
        </MDTypography>
        <ThemedIconButton sx={{ color: "#fff" }} onClick={!menu ? openMenu : () => {}}>
          <FilterListIcon />
        </ThemedIconButton>
      </Stack>

      {renderMenu}
    </MDBox>
  );
};

export default FilterTransaction;
