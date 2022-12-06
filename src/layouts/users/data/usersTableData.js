import { Stack, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import ThemedIconButton from "components/UI/ThemedIconButton";
import { useGlobalStore } from "store";
import { formatDateID } from "utils";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import BasicForm from "examples/Forms/BasicForm";

export default function useData() {
  const { removeUser, setOpenModal, changePassword } = useGlobalStore();
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
            <Stack direction="row" spacing={1}>
              <Tooltip title="Delete User">
                <ThemedIconButton onClick={() => removeUser(row.original.user_id)}>
                  <DeleteIcon />
                </ThemedIconButton>
              </Tooltip>
              <Tooltip title="Change Password">
                <ThemedIconButton
                  onClick={() =>
                    setOpenModal({
                      open: true,
                      form: BasicForm,
                      title: "Change Password",
                      handler: changePassword,
                      input: { user_id: row.original.user_id, old_password: "", new_password: "" },
                      notRenderFields: ["user_id"],
                    })
                  }
                >
                  <KeyIcon />
                </ThemedIconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
  };
}
