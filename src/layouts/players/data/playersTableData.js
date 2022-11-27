import { Chip, Stack, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import ThemedIconButton from "components/UI/ThemedIconButton";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useGlobalStore } from "store";
import BasicForm from "examples/Forms/BasicForm";
import { addBankPlayer } from "utils/input";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PaidIcon from '@mui/icons-material/Paid';
import CustomForm from "examples/Forms/CustomForm";
import { createTransaction } from "utils/input";

export default function useData() {
  const { setOpenModal, addBankAccount, addTransaction, banks, transactionsType} = useGlobalStore();

  return {
    columns: [
      {
        Header: "PLAYER NAME",
        accessor: "player_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "BANK PLAYER",
        accessor: "bank_player",
        align: "left",
        Cell: ({ value }) => (
          <Stack spacing={1} direction="row">
            {value.length > 0
              ? value.map((val, idx) => (
                  <Tooltip
                    key={idx}
                    title={
                      <Stack>
                        <MDTypography fontSize={11} color="inherit">
                          {val.bank_name}
                        </MDTypography>
                        <MDTypography fontSize={11} color="inherit">
                          {val.account_number}
                        </MDTypography>
                      </Stack>
                    }
                  >
                    <Chip label={val.bank_name} size="small" sx={{ color: "inherit" }} />
                  </Tooltip>
                ))
              : "-"}
          </Stack>
        ),
      },
      {
        Header: "created at",
        accessor: "created_at",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography fontSize={13}>{new Date(value).toLocaleString()}</MDTypography>
        ),
      },
      {
        Header: "ACTION",
        accessor: "action",
        align: "left",
        Cell: ({ row }) => {
          return (
            <>
            <Tooltip title="Add Transaction">
              <ThemedIconButton
                onClick={() => {
                setOpenModal({
                  open: true,
                  form: CustomForm,
                  title: "ADD TRANSACTION",
                  handler: addTransaction,
                  input: {...createTransaction, player_name: row.original.player_name, player_id: row.original.player_id},
                  notRenderFields: ["player_id", "player_name", "account_number"],
                  optionFields: ["bank_player_id", "bank_id", "type_id"],
                  optionFieldList: [
                    {
                      name: "bank_player_id",
                      value: row.original.bank_player.map((b) => ({ key: b.bank_name + " - " + b.account_number, value: b.bank_player_id })),
                    },
                    {
                      name: "bank_id",
                      value: banks
                        .filter((b) => b.active)
                        .map((b) => ({ key: b.bank_name + " - " +b.account_number, value: b.bank_id })),
                    },
                    {
                      name: "type_id",
                      value: transactionsType.map((t) => ({
                        key: t.type_transaction,
                        value: t.type_id,
                      })),
                    },
                  ],
                })
              }}>
                <AddCircleIcon />
              </ThemedIconButton>
            </Tooltip>
            <Tooltip title="Add Bank Account">
              <ThemedIconButton
                onClick={() => {
                  setOpenModal({
                    open: true,
                    title: "Add Bank Account",
                    input: { ...addBankPlayer, player_id: row.original.player_id },
                    form: BasicForm,
                    handler: addBankAccount,
                    notRenderFields: ["player_id"],
                  });
                }}
              >
                <AddCardIcon />
              </ThemedIconButton>
            </Tooltip>
            </>
          );
        },
      },
    ],
  };
}
