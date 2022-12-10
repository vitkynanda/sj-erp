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

import FilterTableRow from "examples/Actions/FilterTableRow";

function Transactions() {
  const { columns } = useData();
  const {
    transactions: rows = [],
    getTransactions,
    players,
    getPlayers,
    filterTransactions,
    totalTransactionsData,
    setFilterVal,
  } = useGlobalStore();

  useEffect(() => {
    const params = {};
    const dateStorage = JSON.parse(localStorage.getItem("date"));
    if (dateStorage?.start) params["dateFrom"] = dateStorage.start;
    if (dateStorage?.end) params["dateTo"] = dateStorage.end;
    if (rows.length === 0) getTransactions(params);
    if (players.length === 0) getPlayers("only");
    setFilterVal("All");
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
                  <FilterTableRow
                    handler={getTransactions}
                    lov={["All", "Deposit", "Withdraw", "Bonus"]}
                  />
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
                    canSearch={true}
                    filterFn={filterTransactions}
                    refetchFn={getTransactions}
                    totalData={totalTransactionsData}
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
