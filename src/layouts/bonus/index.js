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
import useData from "./data/bonusDataTable";

import FilterTableRow from "examples/Actions/FilterTableRow";
import MDButton from "components/MDButton";
import { Stack } from "@mui/material";
import CustomForm from "examples/Forms/CustomForm";

function Bonuses() {
  const { columns } = useData();
  const {
    bonuses: rows = [],
    getBonuses,
    players,
    getPlayers,
    totalBonusesData,
    addBonus,
    setOpenModal,
  } = useGlobalStore();

  useEffect(() => {
    const params = {};
    const dateStorage = JSON.parse(localStorage.getItem("date"));
    if (dateStorage?.start) params["dateFrom"] = dateStorage.start;
    if (dateStorage?.end) params["dateTo"] = dateStorage.end;
    if (rows.length === 0) getBonuses(params);
    if (players.length === 0) getPlayers("only");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBonuses, getPlayers]);

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
                    Bonus Table
                  </MDTypography>
                  <Stack spacing={1} direction="row">
                    <FilterTableRow
                      filterType="Bonus Type"
                      data={rows}
                      handler={getBonuses}
                      lov={["All", "Rolling", "Cashback"]}
                    />
                    <MDButton
                      onClick={() =>
                        setOpenModal({
                          open: true,
                          form: CustomForm,
                          title: "Create",
                          handler: addBonus,
                          input: { type: "", ammount: "" },
                          optionFields: ["type"],
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
                      variant="gradient"
                      color="secondary"
                    >
                      ADD BONUS
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
                    canSearch={true}
                    refetchFn={getBonuses}
                    totalData={totalBonusesData}
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

export default Bonuses;
