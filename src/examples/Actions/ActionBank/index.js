import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import BasicForm from "examples/Forms/BasicForm";
import { useState } from "react";
import { useGlobalStore } from "store";
import EditIcon from "@mui/icons-material/Edit";

const ActionBank = ({ row }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { setOpenModal, updateBank, updateBalanceBank } = useGlobalStore();
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    setMenu(currentTarget);
  };
  const closeMenu = (type) => {
    setMenu(null);
    if (type === "balance")
      return setOpenModal({
        open: true,
        title: "Update Balance",
        form: BasicForm,
        input: {
          bank_id: row.original.bank_id,
          balance: "",
          type: "",
        },
        notRenderFields: ["bank_id"],
        handler: updateBalanceBank,
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
      <MenuItem onClick={() => closeMenu("balance")}>
        <EditIcon sx={{ mr: 1 }} />
        Update Balance
      </MenuItem>
      <MenuItem onClick={closeMenu}>
        <EditIcon sx={{ mr: 1 }} />
        Update Bank Data
      </MenuItem>
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

export default ActionBank;
