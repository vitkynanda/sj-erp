import MDTypography from "components/MDTypography";
import { formatDateID } from "utils";
import { currencyFormat } from "utils";
export default function useData() {
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
        accessor: "bank_player",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "ACCOUNT NUMBER PLAYER",
        accessor: "account_number",
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
        Cell: ({ value }) => <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>,
      },
      {
        Header: "ADMIN FEE",
        accessor: "admin_fee",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>,
      },
      {
        Header: "TRANSACTION TO",
        accessor: "bank_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value.toLocaleString()}</MDTypography>,
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
    ],

    rows: [
      {
        author: "",
        function: "",
        status: "",
      },
    ],
  };
}
