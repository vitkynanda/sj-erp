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
import { useEffect, useState } from "react";
import ModalForm from "examples/ModalForm";
import MDButton from "components/MDButton";
import { createPlayer } from "utils/input";
import CustomForm from "examples/Forms/CustomForm";

function Players() {
  const { columns } = playersDataTable();
  const [search, setSearch] = useState("");
  const {
    players: rows,
    getPlayers,
    totalPlayersData,
    addPlayer,
    setOpenModal,
    transactionsType,
    getTransactionType,
  } = useGlobalStore();

  useEffect(() => {
    if (rows.length === 0) getPlayers();
    if (transactionsType.length === 0) getTransactionType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPlayers, rows.length]);

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
                        form: CustomForm,
                        title: "Create",
                        handler: addPlayer,
                        input: createPlayer,
                        optionFields: ["category"],
                        optionFieldList: [
                          {
                            name: "category",
                            value: [
                              { key: "E-WALLET", value: "E-WALLET" },
                              { key: "BANK", value: "BANK" },
                              { key: "PULSA", value: "PULSA" },
                            ],
                          },
                        ],
                      })
                    }
                    variant="gradient"
                    color="secondary"
                  >
                    ADD NEW PLAYER
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                    withPagination={true}
                    canSearch={false}
                    withLimit={true}
                    refetchFn={getPlayers}
                    totalData={totalPlayersData}
                    canSearchPlayer={true}
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
