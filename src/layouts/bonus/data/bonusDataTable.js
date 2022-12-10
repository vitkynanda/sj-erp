import MDTypography from "components/MDTypography";
import { currencyFormat } from "utils";

import { formatDateID } from "utils";
export default function useData() {
  return {
    columns: [
      {
        Header: "Bonus Type",
        accessor: "type",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "Ammount",
        accessor: "ammount",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography fontSize={13}>{currencyFormat("ID", value)}</MDTypography>
        ),
      },
      {
        Header: "Created At",
        accessor: "created_at",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{formatDateID(value)}</MDTypography>,
      },
    ],
  };
}
