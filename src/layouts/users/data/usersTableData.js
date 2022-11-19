import MDTypography from "components/MDTypography";

export default function data() {
  return {
    columns: [
      {
        Header: "username",
        accessor: "username",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "role",
        accessor: "role_name",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{value}</MDTypography>,
      },
      {
        Header: "created at",
        accessor: "created_at",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography fontSize={13}>{new Date(value).toLocaleString()}</MDTypography>
        ),
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
