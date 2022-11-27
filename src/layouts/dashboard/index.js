// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import LogsActivity from "layouts/dashboard/components/LogsActivity";
import { useEffect } from "react";
import { useGlobalStore } from "store";
import { currencyFormat } from "utils";

function Dashboard() {
  const { getLogs, getDashboard, dashboards } = useGlobalStore();

  useEffect(() => {
    getLogs();
    getDashboard();
  }, [getLogs, getDashboard]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="paid"
                title="COIN GAME"
                count={currencyFormat("ID", dashboards?.coin?.balance) || "-"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="wallet"
                title="DEPOSIT"
                count={
                  dashboards?.transaction_value?.length > 0 &&
                  (dashboards?.transaction_value.find((item) => item.value === "DEPOSIT")?.total ||
                    0)
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="wallet"
                title="WITHDRAW"
                count={
                  dashboards?.transaction_value?.length > 0 &&
                  (dashboards?.transaction_value.find((item) => item.value === "WITHDRAW")?.total ||
                    0)
                }
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="money"
                title="BONUS"
                count={
                  dashboards?.transaction_value?.length > 0 &&
                  (dashboards?.transaction_value.find((item) => item.value === "BONUS")?.total || 0)
                }
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <LogsActivity />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
