import { Chip, Stack } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useGlobalStore } from "store";
import { formatDateID } from "utils";
import { currencyFormat } from "utils";
export default function useData() {
  const { updateTransaction } = useGlobalStore();
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
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                disabled={row?.original?.status === "COMPLETED"}
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  updateTransaction({
                    player_id: row.original.player_id,
                    bank_player_id: row.original.bank_id,
                    status: "COMPLETED",
                  })
                }
              >
                Mark As Completed
              </MDButton>
            </Stack>
          );
        },
      },
    ],
  };
}
