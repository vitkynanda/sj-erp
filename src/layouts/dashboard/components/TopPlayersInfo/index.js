import { Card } from "@mui/material";
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
      <MDBox px={3} pt={2} gap={2}>
        {dashboards.top_player_deposit.map((player, idx) => (
          <Card>
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
        ))}
      </MDBox>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Top Player Widthdraw
        </MDTypography>
      </MDBox>
      <MDBox px={3} pt={2} gap={2}>
        {dashboards.top_player_withdraw.map((player, idx) => (
          <Card>
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
        ))}
      </MDBox>
    </Card>
  );
};

export default TopPlayerInfo;
