import { TableCell, TableRow } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { useGlobalStore } from "store";
import { currencyFormat } from "utils";

const CustomRow = () => {
  const [controller] = useMaterialUIController();
  const { txAdditionalInfo } = useGlobalStore();
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
            Total Withdraw :
          </MDTypography>
        </TableCell>
        <TableCell
          colSpan={8}
          align="left"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            {currencyFormat("ID", txAdditionalInfo?.total_withdraw || 0)}
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
            Total Deposit :
          </MDTypography>
        </TableCell>
        <TableCell
          colSpan={8}
          align="left"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            {currencyFormat("ID", txAdditionalInfo?.total_deposit || 0)}
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
            Total Bonus :
          </MDTypography>
        </TableCell>
        <TableCell
          colSpan={8}
          align="left"
          sx={{ background: darkMode ? "rgba(26, 32, 53, 0.8)" : "lightgrey" }}
        >
          <MDTypography fontSize={14} fontWeight="bold">
            {currencyFormat("ID", txAdditionalInfo?.total_bonus || 0)}
          </MDTypography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomRow;
