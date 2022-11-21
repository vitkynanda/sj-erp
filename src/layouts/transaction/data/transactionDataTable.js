import MDTypography from "components/MDTypography";
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
        Header: "BANK PLAYER",
        accessor: "bank_player",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },

      {
        Header: "ACCOUNT NUMBER",
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
        Cell: ({ value }) => <MDTypography fontSize={13}>{value.toLocaleString()}</MDTypography>,
      },
      {
        Header: "BALANCE COIN",
        accessor: "last_balance_coin",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value.toLocaleString()}</MDTypography>,
      },
      {
        Header: "BALANCE BANK",
        accessor: "last_balance_bank",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value.toLocaleString()}</MDTypography>,
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
