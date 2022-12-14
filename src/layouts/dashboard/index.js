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
import CustomDatePicker from "examples/DatePicker";
import MDButton from "components/MDButton";
import { Stack } from "@mui/material";
import AutoCompleteInput from "components/UI/AutoCompleteInput";

function Dashboard() {
  const { getLogs, getDashboard, dashboards } = useGlobalStore();

  useEffect(() => {
    getLogs();
    if (!dashboards?.coin) getDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLogs, getDashboard]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AutoCompleteInput />
      <MDBox py={3}>
        <MDBox
          sx={(theme) => ({
            gap: 2,
            flexDirection: "row",
            display: "flex",
            justifyContent: "end",
            mb: 5,
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          })}
        >
          <Stack spacing={2} direction="row">
            <CustomDatePicker label="Start" type="start" width={150} responsive={true} />
            <CustomDatePicker label="End" type="end" width={150} responsive={true} />
          </Stack>
          <MDButton onClick={() => getDashboard()} color="info" variant="gradient">
            Filter
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="paid"
                title="COIN GAME"
                count={1}
                amount={currencyFormat("ID", dashboards?.coin?.balance) || "-"}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="wallet"
                title="DEPOSIT"
                count={
                  dashboards?.transaction_value?.length > 0
                    ? dashboards?.transaction_value.find((item) => item.value === "DEPOSIT")
                        ?.total || 0
                    : 0
                }
                amount={currencyFormat(
                  "ID",
                  dashboards?.top_player_deposit?.reduce((acc, curr) => acc + curr.total_deposit, 0)
                )}
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
                  dashboards?.transaction_value?.length > 0
                    ? dashboards?.transaction_value.find((item) => item.value === "WITHDRAW")
                        ?.total || 0
                    : 0
                }
                amount={currencyFormat(
                  "ID",
                  dashboards?.top_player_withdraw?.reduce(
                    (acc, curr) => acc + curr.total_withdraw,
                    0
                  )
                )}
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
                  dashboards?.transaction_value?.length > 0
                    ? dashboards?.transaction_value.find((item) => item.value === "BONUS")?.total ||
                      0
                    : 0
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
