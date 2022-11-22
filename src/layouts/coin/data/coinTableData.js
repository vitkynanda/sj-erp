import MDTypography from "components/MDTypography";
import ActionCoin from "examples/Actions/ActionCoin";

export default function useData() {
  return {
    columns: [
      {
        Header: "COIN NAME",
        accessor: "coin_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "BALANCE",
        accessor: "balance",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value.toLocaleString()}</MDTypography>,
      },

      {
        Header: "DESCRIPTION",
        accessor: "note",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "ACTION",
        accessor: "action",
        align: "left",
        Cell: (rowData) => <ActionCoin row={rowData.row} />,
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