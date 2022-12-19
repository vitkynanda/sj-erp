import { Stack, Tooltip } from "@mui/material";
import MDTypography from "components/MDTypography";
import ThemedIconButton from "components/UI/ThemedIconButton";
import EditIcon from "@mui/icons-material/Edit";
import { formatDateID, currencyFormat } from "utils";
import { useGlobalStore } from "store";
import TrxForm from "examples/Forms/TrxForm";
export default function useData() {
  const { setOpenModal, editBonus } = useGlobalStore();
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
        Header: "Updated At",
        accessor: "updated_at",
        align: "left",
        Cell: ({ value }) => <MDTypography fontSize={13}>{formatDateID(value)}</MDTypography>,
      },
      {
        Header: "Action",
        accessor: "action",
        align: "left",
        Cell: ({ row }) => (
          <Stack>
            <Tooltip title="Edit Bonus">
              <ThemedIconButton
                onClick={() =>
                  setOpenModal({
                    open: true,
                    title: "Edit Bonus",
                    input: row.original,
                    form: TrxForm,
                    handler: editBonus,
                    optionFields: ["type"],
                    notRenderFields: ["updated_at", "bonus_id", "created_at"],
                    optionFieldList: [
                      {
                        name: "type",
                        value: [
                          {
                            key: "ROLLING",
                            value: "ROLLING",
                          },
                          {
                            key: "CASHBACK",
                            value: "CASHBACK",
                          },
                        ],
                      },
                    ],
                  })
                }
              >
                <EditIcon />
              </ThemedIconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
  };
}
