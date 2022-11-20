import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import BasicForm from "examples/Forms/BasicForm";
import React, { useState } from "react";
import { useGlobalStore } from "store";

const ActionMenu = ({ row }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { setOpenModal, updateBank, updateBalance } = useGlobalStore();
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    setMenu(currentTarget);
  };
  console.log(row.original.bank_id);
  const closeMenu = (type) => {
    setMenu(null);
    if (type === "balance")
      return setOpenModal({
        open: true,
        title: "Update Balance",
        form: BasicForm,
        input: {
          bank_id: row.original.bank_id,
          balance: row.original.balance,
          type: "",
        },
        notRenderFields: ["bank_id"],
        handler: updateBalance,
      });
    setOpenModal({
      open: true,
      title: "Update Bank",
      input: row.original,
      form: BasicForm,
      handler: updateBank,
      notRenderFields: ["bank_id", "balance"],
    });
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
      onClose={closeMenu}
    >
      <MenuItem onClick={() => closeMenu("balance")}>Update Balance</MenuItem>
      <MenuItem onClick={closeMenu}>Update Bank Data</MenuItem>
    </Menu>
  );
  return (
    <MDBox>
      <IconButton onClick={openMenu}>
        <Icon
          sx={{ cursor: "pointer", fontWeight: "bold", color: darkMode ? "#fff" : "inherit" }}
          fontSize="small"
        >
          more_vert
        </Icon>
      </IconButton>
      {renderMenu}
    </MDBox>
  );
};

export default ActionMenu;
