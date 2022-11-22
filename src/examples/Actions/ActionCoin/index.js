import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import BasicForm from "examples/Forms/BasicForm";
import { useGlobalStore } from "store";
import { useMaterialUIController } from "context";

const ActionCoin = ({ row }) => {
  const { updateBalanceCoin, setOpenModal } = useGlobalStore();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Stack spacing={2}>
      <Tooltip title="Update Coin">
        <IconButton
          onClick={() =>
            setOpenModal({
              open: true,
              title: "Update Coin",
              input: { coin_id: row.original.coin_id, balance: "", type: "" },
              form: BasicForm,
              handler: updateBalanceCoin,
              notRenderFields: ["coin_id"],
            })
          }
        >
          <EditIcon sx={{ color: darkMode ? "#FFF" : "inherit" }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ActionCoin;