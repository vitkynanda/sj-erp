import { CircularProgress, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import CustomDatePicker from "examples/DatePicker";
import SelectOption from "examples/SelectOption";
import { useState } from "react";
import { useGlobalStore } from "store";
import { currencyFormat } from "utils";

const ModalMutation = () => {
  const { openMutation, setOpenMutation, banks, getMutations, mutations } = useGlobalStore();
  const [filter, setFilter] = useState({ bank_id: "", type: "", limit: 10 });
  const [loading, setLoading] = useState(false);
  const onSelect = (e) => {
    const { name, value } = e.target;
    const newFilterVal = { ...filter };
    if (name === "Bank Account") newFilterVal.bank_id = value;
    if (name === "Transaction Type") newFilterVal.type = value;
    if (name === "Limit Data") newFilterVal.limit = value;
    setFilter(newFilterVal);
  };

  return (
    <MDModal open={openMutation} setOpen={setOpenMutation}>
      <MDBox sx={{ pt: 4, px: 2 }}>
        <MDBox>
          <MDTypography variant="h6">ACCOUNT MUTATION</MDTypography>
          <Divider />
        </MDBox>
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={(theme) => ({ [theme.breakpoints.down("md")]: { flexDirection: "column", gap: 2 } })}
        >
          <MDBox
            display="flex"
            alignItems="center"
            gap={1}
            sx={(theme) => ({
              width: "50%",
              [theme.breakpoints.down("md")]: { flexDirection: "column", width: "100%" },
            })}
          >
            <SelectOption
              label="Bank Account"
              options={[
                { key: "All", value: "All" },
                ...banks.map((b) => ({
                  key: b.bank_name + " - " + b.account_number,
                  value: b.bank_id,
                })),
              ]}
              onSelect={onSelect}
              val={filter.bank_id}
            />
            <SelectOption
              label="Transaction Type"
              options={[
                { key: "ALL", value: "" },
                { key: "CREDIT", value: "CREDIT" },
                { key: "DEBET", value: "DEBET" },
              ]}
              onSelect={onSelect}
              val={filter.type}
            />
            <SelectOption
              label="Limit Data"
              options={[
                { key: "All", value: 1000 },
                { key: "10", value: 10 },
                { key: "20", value: 20 },
              ]}
              onSelect={onSelect}
              val={filter.limit}
            />
          </MDBox>
          <MDBox
            gap={1}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                display: "grid",
                width: "100%",
                gap: 2,
              },
            })}
          >
            <CustomDatePicker label="Start" type="start" width={150} fullWidth={true} />
            <CustomDatePicker label="End" type="end" width={150} fullWidth={true} />
            <MDButton
              onClick={async () => {
                setLoading(true);
                await getMutations({
                  ...filter,
                  bank_id: filter.bank_id === "All" ? "" : filter.bank_id,
                  type: filter.type === "All" ? "" : filter.type,
                });
                setLoading(false);
              }}
              color="info"
              variant="gradient"
            >
              Filter
            </MDButton>
          </MDBox>
        </MDBox>
        {loading ? (
          <MDBox
            sx={(theme) => ({
              width: 1000,
              textAlign: "center",
              [theme.breakpoints.down("md")]: { width: "100%" },
            })}
          >
            <CircularProgress color="info" />
          </MDBox>
        ) : mutations.length > 0 ? (
          <MDBox
            sx={(theme) => ({
              width: 1000,
              [theme.breakpoints.down("md")]: { width: "100%", overflow: "auto" },
            })}
          >
            <Table size="small" aria-label="detail">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <MDTypography sx={{ fontSize: 11, fontWeight: 500, color: "#7b809a" }}>
                      NO.
                    </MDTypography>
                  </TableCell>
                  {Object.keys(mutations[0]).map(
                    (title) =>
                      title !== "mutation_bank_id" &&
                      title !== "bank_id" && (
                        <TableCell key={title}>
                          <MDTypography sx={{ fontSize: 11, fontWeight: 500, color: "#7b809a" }}>
                            {title.split("_").join(" ").toUpperCase()}
                          </MDTypography>
                        </TableCell>
                      )
                  )}
                </TableRow>
                {mutations.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell>
                      <MDTypography sx={{ fontSize: 12 }}>{id + 1}</MDTypography>
                    </TableCell>
                    {Object.entries(row).map(([key, val]) => {
                      return (
                        key !== "mutation_bank_id" &&
                        key !== "bank_id" && (
                          <TableCell key={val}>
                            <MDTypography fontSize={12}>
                              {key === "ammount" || key === "last_balance"
                                ? currencyFormat("ID", val)
                                : val}
                            </MDTypography>
                          </TableCell>
                        )
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MDBox>
        ) : (
          <MDBox
            pt={2}
            sx={(theme) => ({
              width: 1000,
              textAlign: "center",
              [theme.breakpoints.down("md")]: { width: "100%", overflow: "auto" },
            })}
          >
            <MDTypography sx={{ fontSize: 13 }}>No data available</MDTypography>
          </MDBox>
        )}
      </MDBox>
    </MDModal>
  );
};

export default ModalMutation;
