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
import usersTableData from "layouts/users/data/usersTableData";
import { useGlobalStore } from "store";
import { useEffect } from "react";
import ModalForm from "examples/ModalForm";
import MDButton from "components/MDButton";
import CustomForm from "examples/Forms/CustomForm";
import { createUser } from "utils/input";
import DialogInfo from "components/UI/DialogInfo";

function Users() {
  const { columns } = usersTableData();
  const { users: rows, getUsers, addUser, setOpenModal, roles } = useGlobalStore();
  useEffect(() => {
    if (rows.length === 0) getUsers();
  }, [getUsers, rows.length]);

  return (
    <>
      <ModalForm />
      <DialogInfo />
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
                    Users Table
                  </MDTypography>
                  <MDButton
                    onClick={() =>
                      setOpenModal({
                        open: true,
                        form: CustomForm,
                        title: "Create",
                        handler: addUser,
                        input: createUser,
                        optionFields: ["role_id"],
                        optionFieldList: [
                          {
                            name: "role_id",
                            value: roles.map((t) => ({
                              key: t.role_name,
                              value: t.role_id,
                            })),
                          },
                        ],
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
        {/* <Footer /> */}
      </DashboardLayout>
    </>
  );
}

export default Users;
