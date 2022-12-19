// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { useGlobalStore } from "store";
import { useEffect } from "react";
import ModalForm from "examples/ModalForm";
import useData from "./data/transactionDataTable";

import { createTransaction } from "utils/input";
import { Stack } from "@mui/material";
import MDButton from "components/MDButton";

import TrxForm from "examples/Forms/TrxForm";
import CustomRow from "./components/CustomRow";

function Transactions() {
  const { columns } = useData();
  const {
    transactions: rows = [],
    getTransactions,
    players,
    getPlayers,
    filterTransactions,
    totalTransactionsData,

    addTransaction,
    transactionsType,
    banks,
    setOpenModal,
    getBanks,
    getTransactionType,
  } = useGlobalStore();

  useEffect(() => {
    const params = {};
    const dateStorage = JSON.parse(localStorage.getItem("date"));
    if (dateStorage?.start) params["dateFrom"] = dateStorage.start;
    if (dateStorage?.end) params["dateTo"] = dateStorage.end;
    if (rows.length === 0) getTransactions(params);
    if (banks.length === 0) getBanks();
    if (transactionsType.length === 0) getTransactionType();
    if (players.length === 0) getPlayers("only");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTransactions, getPlayers]);

  return (
    <>
      <ModalForm />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  p={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white">
                    Transactions Table
                  </MDTypography>
                  <Stack direction="row" spacing={1}>
                    <MDButton
                      variant="gradient"
                      color="secondary"
                      onClick={() => {
                        setOpenModal({
                          open: true,
                          form: TrxForm,
                          title: "CREATE TRANSACTION",
                          handler: addTransaction,
                          input: createTransaction,
                          notRenderFields: ["account_number"],
                          optionFields: [
                            "player_id",
                            "bank_player_id",
                            "bank_id",
                            "type_id",
                            "status",
                          ],
                          optionFieldList: [
                            {
                              name: "player_id",
                              value: players.map((p) => ({
                                key: p.player_name + " - " + p.player_id,
                                value: p.player_id,
                              })),
                            },
                            {
                              name: "bank_player_id",
                              value: [],
                            },
                            {
                              name: "bank_id",
                              value: banks
                                .filter((b) => b.active)
                                .map((b) => ({
                                  key: `${b.bank_name} - ${b.account_name.toUpperCase()} ${
                                    b.account_number
                                  }`,
                                  value: b.bank_id,
                                })),
                            },
                            {
                              name: "type_id",
                              value: transactionsType.map((t) => ({
                                key: t.type_transaction,
                                value: t.type_id,
                              })),
                            },
                            {
                              name: "status",
                              value: [
                                { key: "PENDING", value: "PENDING" },
                                { key: "COMPLETED", value: "COMPLETED" },
                              ],
                            },
                          ],
                        });
                      }}
                    >
                      Create
                    </MDButton>
                  </Stack>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                    withDateFilter={true}
                    withPagination={true}
                    withLimit={true}
                    withExport={true}
                    filterFn={filterTransactions}
                    refetchFn={getTransactions}
                    totalData={totalTransactionsData}
                    CustomRow={CustomRow}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default Transactions;
