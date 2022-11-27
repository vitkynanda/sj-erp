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
import playersDataTable from "./data/playersTableData";
import { useGlobalStore } from "store";
import { useEffect } from "react";
import ModalForm from "examples/ModalForm";
import MDButton from "components/MDButton";
import BasicForm from "examples/Forms/BasicForm";
import { createPlayer } from "utils/input";

function Players() {
  const { columns } = playersDataTable();

  const { players: rows, getPlayers, addPlayer, setOpenModal } = useGlobalStore();

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

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
                    Players Table
                  </MDTypography>
                  <MDButton
                    onClick={() =>
                      setOpenModal({
                        open: true,
                        form: BasicForm,
                        title: "Create",
                        handler: addPlayer,
                        input: createPlayer,
                      })
                    }
                    variant="gradient"
                    color="secondary"
                  >
                    Create New Players
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
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

export default Players;
