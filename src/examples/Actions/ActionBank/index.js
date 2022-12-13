import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import BasicForm from "examples/Forms/BasicForm";
import { useState } from "react";
import { useGlobalStore } from "store";
import EditIcon from "@mui/icons-material/Edit";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CustomForm from "examples/Forms/CustomForm";

const ActionBank = ({ row }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const {
    setOpenModal,
    updateBank,
    updateBalanceBank,
    banks,
    transferAmount: ta,
    userLoggedIn,
  } = useGlobalStore();
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);

  const closeMenu = (type) => {
    setMenu(null);
    if (type === "update") {
      setOpenModal({
        open: true,
        title: "Update Bank",
        input: row.original,
        form: BasicForm,
        handler: updateBank,

        notRenderFields: ["bank_id", "balance"],
      });
    }

    if (type === "balance") {
      setOpenModal({
        open: true,
        title: userLoggedIn.role === "ADMIN" ? "Update Balance" : "Tambah Balance",
        form: BasicForm,
        input: {
          bank_id: row.original.bank_id,
          ammount: "",
          type: userLoggedIn.role === "ADMIN" ? "" : "PLUS",
        },
        notRenderFields: userLoggedIn.role === "ADMIN" ? ["bank_id"] : ["bank_id", "type"],
        handler: updateBalanceBank,
      });
    }
  };

  const transferAmount = () =>
    setOpenModal({
      open: true,
      title: "Transfer Amount",
      input: {
        from_bank_id: row.original.bank_id,
        to_bank_id: "",
        ammount: "",
        admin_fee: "",
      },
      form: CustomForm,
      handler: ta,
      optionFields: ["to_bank_id"],
      notRenderFields: ["from_bank_id"],
      optionFieldList: [
        {
          name: "to_bank_id",
          value: banks
            .filter((b) => row.original.bank_id !== b.bank_id)
            .map((b) => ({
              key: `${b.bank_name} - ${b.account_number} ${b.account_name}`,
              value: b.bank_id,
            })),
        },
      ],
    });

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
        {userLoggedIn.role === "ADMIN" ? "Update Balance" : "Tambah Balance"}
      </MenuItem>
      {userLoggedIn.role === "ADMIN" && (
        <MenuItem onClick={() => closeMenu("update")}>
          <EditIcon sx={{ mr: 1 }} />
          Update Bank Data
        </MenuItem>
      )}
      <MenuItem onClick={transferAmount}>
        <CurrencyExchangeIcon sx={{ mr: 1 }} />
        Transfer Amount
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
