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
import MDButton from "components/MDButton";
import useData from "./data/bankTableData";
import { createBank } from "utils/input";
import { Stack } from "@mui/material";
import ModalMutation from "examples/ModalMutation";
import CustomForm from "examples/Forms/CustomForm";

function Banks() {
  const { columns } = useData();
  const {
    banks: rows,
    getBanks,
    addBank,
    setOpenModal,
    setOpenMutation,
    userLoggedIn,
  } = useGlobalStore();

  useEffect(() => {
    if (rows.length === 0) getBanks();
  }, [getBanks, rows.length]);

  return (
    <>
      <ModalForm />
      <ModalMutation />
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
                    Banks Table
                  </MDTypography>
                  <Stack spacing={2} direction="row">
                    <MDButton
                      onClick={() => setOpenMutation(true)}
                      variant="outlined"
                      color="white"
                    >
                      Mutation
                    </MDButton>
                    {userLoggedIn.role === "ADMIN" && (
                      <MDButton
                        onClick={() =>
                          setOpenModal({
                            open: true,
                            form: CustomForm,
                            title: "Create",
                            handler: addBank,
                            input: createBank,
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
                        Create
                      </MDButton>
                    )}
                  </Stack>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                    canSearch={true}
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

export default Banks;
