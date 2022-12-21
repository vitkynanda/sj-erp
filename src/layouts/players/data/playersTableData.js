import { Chip, Stack, Tooltip } from "@mui/material";
import { useGlobalStore } from "store";
import { addBankPlayer, createTransaction } from "utils/input";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MDTypography from "components/MDTypography";
import BasicForm from "examples/Forms/BasicForm";
import ThemedIconButton from "components/UI/ThemedIconButton";
import { formatDateID } from "utils";
import TrxForm from "examples/Forms/TrxForm";
import EditIcon from "@mui/icons-material/Edit";
import CustomForm from "examples/Forms/CustomForm";
export default function useData() {
  const { setOpenModal, updatePlayer, addBankAccount, addTransaction, banks, transactionsType } =
    useGlobalStore();

  return {
    columns: [
      {
        Header: "PLAYER ID",
        accessor: "player_id",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
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
        Cell: ({ value }) => <MDTypography fontSize={13}>{formatDateID(value)}</MDTypography>,
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
                      form: TrxForm,
                      title: "ADD TRANSACTION",
                      handler: addTransaction,
                      input: {
                        ...createTransaction,
                        player_name: row.original.player_name,
                        player_id: row.original.player_id,
                      },
                      notRenderFields: ["player_id", "player_name", "account_number"],
                      optionFields: ["bank_player_id", "bank_id", "type_id", "status"],
                      optionFieldList: [
                        {
                          name: "bank_player_id",
                          value: row.original.bank_player.map((b) => ({
                            key: `${b.bank_name} - ${b.account_name.toUpperCase()} ${
                              b.account_number
                            }`,
                            value: b.bank_player_id,
                          })),
                        },
                        {
                          name: "bank_id",
                          value: banks
                            .filter((b) => b.active)
                            .map((b) => ({
                              key: `${b.bank_name} - ${b.account_name.toUpperCase()} ${
                                b.account_number
                              }`,
                              value: b.bank_id,
                            })),
                        },
                        {
                          name: "type_id",
                          value: transactionsType.map((t) => ({
                            key: t.type_transaction,
                            value: t.type_id,
                          })),
                        },
                        {
                          name: "status",
                          value: [
                            { key: "PENDING", value: "PENDING" },
                            { key: "COMPLETED", value: "COMPLETED" },
                          ],
                        },
                      ],
                    });
                  }}
                >
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
                      form: CustomForm,
                      handler: addBankAccount,
                      notRenderFields: ["player_id"],
                      optionFields: ["category"],
                      optionFieldList: [
                        {
                          name: "category",
                          value: [
                            { key: "E-WALLET", value: "E-WALLET" },
                            { key: "BANK", value: "BANK" },
                            { key: "PULSA", value: "PULSA" },
                          ],
                        },
                      ],
                    });
                  }}
                >
                  <AddCardIcon />
                </ThemedIconButton>
              </Tooltip>
              <Tooltip title="Edit Player">
                <ThemedIconButton
                  onClick={() => {
                    setOpenModal({
                      open: true,
                      title: "Edit Player",
                      input: {
                        player_id: row.original.player_id,
                        player_name: row.original.player_name,
                      },
                      form: BasicForm,
                      handler: updatePlayer,
                      notRenderFields: ["player_id"],
                    });
                  }}
                >
                  <EditIcon />
                </ThemedIconButton>
              </Tooltip>
            </>
          );
        },
      },
    ],
  };
}
