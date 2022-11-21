import { Chip } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import ActionBank from "examples/Actions/ActionBank";

export default function useData() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return {
    columns: [
      {
        Header: "BANK NAME",
        accessor: "bank_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "CATEGORY",
        accessor: "category",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "ACCOUNT NAME",
        accessor: "account_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "ACCCOUNT NUMBER",
        accessor: "account_number",
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
        Header: "STATUS",
        accessor: "active",
        align: "left",
        Cell: ({ value }) => {
          return (
            <Chip
              fontSize={13}
              label={value ? "active" : "inactive"}
              color={value ? "success" : undefined}
              sx={{ color: darkMode && value ? "#fff" : "#000" }}
            />
          );
        },
      },
      {
        Header: "ACTION",
        accessor: "action",
        align: "left",
        Cell: (rowData) => <ActionBank row={rowData.row} />,
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
