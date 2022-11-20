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
import LoadingBackdrop from "components/UI/LoadingBackdrop";
import ModalForm from "examples/ModalForm";
import MDButton from "components/MDButton";
import useData from "./data/bankTableData";
import BasicForm from "examples/Forms/BasicForm";
import { createBank } from "utils/input";

function Banks() {
  const { columns } = useData();
  const { banks: rows, getBanks, addBank, setOpenModal } = useGlobalStore();

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  return (
    <>
      <LoadingBackdrop />
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
                    Banks Table
                  </MDTypography>
                  <MDButton
                    onClick={() =>
                      setOpenModal({
                        open: true,
                        form: BasicForm,
                        title: "Create",
                        handler: addBank,
                        input: createBank,
                      })
                    }
                    variant="gradient"
                    color="secondary"
                  >
                    Create
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

export default Banks;
