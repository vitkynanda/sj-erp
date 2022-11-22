import MDTypography from "components/MDTypography";
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
        Header: "LAST BALANCE COIN",
        accessor: "last_balance_coin",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>,
      },
      {
        Header: "LAST BALANCE BANK",
        accessor: "last_balance_bank",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>,
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
