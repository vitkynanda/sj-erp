import { Chip, Stack, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import CustomForm from "examples/Forms/CustomForm";
import { useGlobalStore } from "store";
import { formatDateID } from "utils";
import { currencyFormat } from "utils";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ThemedIconButton from "components/UI/ThemedIconButton";
export default function useData() {
  const { updateTransaction, players, setOpenModal } = useGlobalStore();

  return {
    columns: [
      {
        Header: "PLAYER NAME",
        accessor: "player_name",
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
        Header: "LAST BALANCE",
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
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "STATUS",
        accessor: "status",
        align: "left",
        Cell: ({ value }) => (
          <Chip
            size="small"
            label={value.toLowerCase()}
            color={value === "COMPLETED" ? "success" : undefined}
            sx={{ color: value ? "#fff" : "inherit" }}
          />
        ),
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
          return (
            <Stack>
              <Tooltip title="Update Transaction Status">
                <span>
                  <ThemedIconButton
                    disabled={row?.original?.status === "COMPLETED"}
                    onClick={() =>
                      setOpenModal({
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
                            value: players
                              .find((pl) => pl.player_id === row.original.player_id)
                              .bank_player.map((b) => ({
                                key: b.bank_name + " - " + b.account_number,
                                value: b.bank_player_id,
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
            </Stack>
          );
        },
      },
    ],
  };
}
