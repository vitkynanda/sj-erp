import { Stack, Card, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useGlobalStore } from "store";
import { currencyFormat } from "utils";
import StarIcon from "@mui/icons-material/Star";

const TopPlayerInfo = () => {
  const { dashboards } = useGlobalStore();
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Top Player Deposit
        </MDTypography>
      </MDBox>
      <Divider />
      <Stack px={3} pt={1} spacing={1}>
        {dashboards?.top_player_deposit?.length === 0 ? (
          <MDTypography fontSize={15} textAlign="center">
            No Data Available
          </MDTypography>
        ) : (
          dashboards?.top_player_deposit?.map((player, idx) => (
            <Card key={idx}>
              <MDBox p={2} display="flex" alignItems="center" justifyContent="space-between">
                <MDTypography fontSize={15}>
                  {idx + 1}
                  {". "}
                  {player.player_name}
                  <StarIcon color="warning" />
                </MDTypography>
                <MDTypography fontSize={15}>
                  {currencyFormat("ID", player.total_deposit)}
                </MDTypography>
              </MDBox>
            </Card>
          ))
        )}
      </Stack>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Top Player Widthdraw
        </MDTypography>
      </MDBox>
      <Divider />
      <Stack px={3} pt={1} spacing={1}>
        {dashboards?.top_player_withdraw?.length === 0 ? (
          <MDTypography fontSize={15} textAlign="center">
            No Data Available
          </MDTypography>
        ) : (
          dashboards?.top_player_withdraw?.map((player, idx) => (
            <Card key={idx}>
              <MDBox p={2} display="flex" alignItems="center" justifyContent="space-between">
                <MDTypography fontSize={15}>
                  {idx + 1}
                  {". "}
                  {player.player_name}
                  <StarIcon color="warning" />
                </MDTypography>
                <MDTypography fontSize={15}>
                  {currencyFormat("ID", player.total_withdraw)}
                </MDTypography>
              </MDBox>
            </Card>
          ))
        )}
      </Stack>
    </Card>
  );
};

export default TopPlayerInfo;
