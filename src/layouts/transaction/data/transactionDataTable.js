import { Chip, Stack, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import CustomForm from "examples/Forms/CustomForm";
import { useGlobalStore } from "store";
import { formatDateID } from "utils";
import { currencyFormat } from "utils";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ThemedIconButton from "components/UI/ThemedIconButton";
import TrxForm from "examples/Forms/TrxForm";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useMemo } from "react";
export default function useData() {
  const { updateTransaction, players, setOpenModal, cancelTransaction, userLoggedIn } =
    useGlobalStore();
  const allowedCancel = useMemo(() => ["COMPLETED", "PENDING"], []);

  return {
    columns: [
      {
        Header: "PLAYER ID",
        accessor: "player_id",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "REKENING PLAYER",
        accessor: "bank_player_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },

      {
        Header: "TYPE",
        accessor: "type_transaction",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "AMOUNT",
        accessor: "ammount",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>
        ),
      },
      {
        Header: "ADMIN FEE",
        accessor: "admin_fee",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>
        ),
      },
      {
        Header: "LAST BALANCE BANK",
        accessor: "last_balance_bank",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>
        ),
      },
      {
        Header: "TRANSACTION TO",
        accessor: "bank_name",
        align: "left",
        Cell: ({ row }) => (
          <div>
            <MDTypography fontSize={13}>{row.original.bank_name}</MDTypography>
            <MDTypography fontSize={13}>{row.original.account_number_bank}</MDTypography>
          </div>
        ),
      },
      {
        Header: "STATUS",
        accessor: "status",
        align: "left",
        Cell: ({ value }) => (
          <Chip
            size="small"
            label={value.toLowerCase()}
            color={value === "COMPLETED" ? "success" : value === "CANCELED" ? "error" : "warning"}
            sx={{ color: value ? "#fff" : "inherit" }}
          />
        ),
      },
      {
        Header: "NOTE",
        accessor: "note",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "CREATED BY",
        accessor: "created_by",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "CREATED AT",
        accessor: "created_at",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{formatDateID(value)}</MDTypography>,
      },
      {
        Header: "ACTION",
        accessor: "action",
        align: "center",
        Cell: ({ row }) => {
          const banks = players.find((pl) => pl.player_id === row.original.player_id);
          return (
            <Stack direction="row" spacing={1}>
              <Tooltip title="Update Transaction Status">
                <span>
                  <ThemedIconButton
                    disabled={row?.original?.status === "COMPLETED"}
                    onClick={() =>
                      row.original.player_id
                        ? setOpenModal({
                            open: true,
                            form: CustomForm,
                            title: "COMPLETED TRANSACTION",
                            handler: updateTransaction,
                            input: {
                              bank_player_id: "",
                              status: "COMPLETED",
                              player_id: row.original.player_id,
                              id: row.original.transaction_id,
                            },
                            notRenderFields: ["player_id", "status", "id"],
                            optionFields: ["bank_player_id"],
                            optionFieldList: [
                              {
                                name: "bank_player_id",
                                value: banks.bank_player.map((b) => ({
                                  key: `${b.bank_name} - ${b.account_name.toUpperCase()} ${
                                    b.account_number
                                  }`,
                                  value: b.bank_player_id,
                                })),
                              },
                            ],
                          })
                        : setOpenModal({
                            open: true,
                            form: TrxForm,
                            title: "COMPLETED TRANSACTION",
                            handler: updateTransaction,
                            input: {
                              player_id: row.original.player_id || "",
                              bank_player_id: "",
                              status: "COMPLETED",
                              id: row.original.transaction_id,
                            },
                            notRenderFields: ["status", "id"],
                            optionFields: ["player_id", "bank_player_id"],
                            optionFieldList: [
                              {
                                name: "player_id",
                                value: players.map((p) => ({
                                  key: p.player_name + " - " + p.player_id,
                                  value: p.player_id,
                                })),
                              },
                            ],
                          })
                    }
                  >
                    <CreditScoreIcon />
                  </ThemedIconButton>
                </span>
              </Tooltip>
              {userLoggedIn.role === "ADMIN" && (
                <Tooltip title="Cancel Transaction">
                  <span>
                    <ThemedIconButton
                      disabled={!allowedCancel.includes(row?.original?.status)}
                      onClick={() => cancelTransaction(row?.original?.transaction_id)}
                    >
                      <DeleteForeverIcon />
                    </ThemedIconButton>
                  </span>
                </Tooltip>
              )}
            </Stack>
          );
        },
      },
    ],
  };
}
