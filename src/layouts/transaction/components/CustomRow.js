import { TableCell, TableRow } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { useGlobalStore } from "store";
import { currencyFormat } from "utils";

const CustomRow = () => {
  const [controller] = useMaterialUIController();
  const { transactions } = useGlobalStore();
  const { darkMode } = controller;
  return (
    <>
      <TableRow>
        <TableCell
          colSpan={4}
          align="right"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            Sub Total :
          </MDTypography>
        </TableCell>
        <TableCell
          colSpan={8}
          align="left"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            {currencyFormat(
              "ID",
              transactions.reduce((curr, tx) => curr + tx.ammount, 0)
            )}
          </MDTypography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={4}
          align="right"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            Grand Total :
          </MDTypography>
        </TableCell>
        <TableCell
          colSpan={8}
          align="left"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            {currencyFormat(
              "ID",
              transactions.reduce((curr, tx) => curr + tx.ammount, 0)
            )}
          </MDTypography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomRow;
