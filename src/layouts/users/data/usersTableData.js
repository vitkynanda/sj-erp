import { Stack, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import ThemedIconButton from "components/UI/ThemedIconButton";
import { useGlobalStore } from "store";
import { formatDateID } from "utils";
import DeleteIcon from "@mui/icons-material/Delete";

export default function useData() {
  const { removeUser } = useGlobalStore();
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
        Cell: ({ value }) => <MDTypography fontSize={13}>{formatDateID(value)}</MDTypography>,
      },
      {
        Header: "action",
        accessor: "action",
        align: "left",
        Cell: ({ row }) => {
          return (
            <Stack>
              <Tooltip title="Delete User">
                <ThemedIconButton onClick={() => removeUser(row.original.user_id)}>
                  <DeleteIcon />
                </ThemedIconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
  };
}
