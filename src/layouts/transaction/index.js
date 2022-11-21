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
import useData from "./data/transactionDataTable";
import MDButton from "components/MDButton";
import { createTransaction } from "utils/input";
import CustomForm from "examples/Forms/CustomForm";

function Transactions() {
  const { columns } = useData();
  const {
    transactions: rows = [],
    getTransactions,
    setOpenModal,
    addTransaction,
    banks,
    transactionsType,
  } = useGlobalStore();

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

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
                    Transactions Table
                  </MDTypography>
                  <MDButton
                    color="secondary"
                    variant="gradient"
                    onClick={() =>
                      setOpenModal({
                        open: true,
                        form: CustomForm,
                        title: "Create Transaction",
                        handler: addTransaction,
                        input: createTransaction,
                        optionFields: ["type_id", "bank_id"],
                        optionFieldList: [
                          {
                            name: "type_id",
                            value: transactionsType.map((t) => ({
                              key: t.type_transaction,
                              value: t.type_id,
                            })),
                          },
                          {
                            name: "bank_id",
                            value: banks.map((b) => ({ key: b.bank_name, value: b.bank_id })),
                          },
                        ],
                      })
                    }
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

export default Transactions;
