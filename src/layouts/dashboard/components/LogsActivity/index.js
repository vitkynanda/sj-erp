/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useGlobalStore } from "store";

function LogsActivity() {
  const { logs } = useGlobalStore();
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Logs Activity
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {logs?.map((log) => (
          <TimelineItem
            color={log.is_transaction ? "success" : "info"}
            icon={log.is_transaction ? "paid" : "notifications"}
            title={`${log.description.charAt(0).toUpperCase() + log.description.slice(1)}`}
            dateTime={new Date(log.created_at).toLocaleString()}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default LogsActivity;
