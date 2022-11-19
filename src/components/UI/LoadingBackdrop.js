import ReactDOM from "react-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useGlobalStore } from "store";

const LoadingPortal = () => {
  const {
    loading: { status, message },
  } = useGlobalStore();
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={status}>
      <MDBox display="flex" flexDirection="column" alignItems="center">
        <CircularProgress sx={{ color: "#fff", zIndex: 99999 }} />
        <MDTypography sx={{ pt: 2, fontSize: 16 }} color="white">
          {message}
        </MDTypography>
      </MDBox>
    </Backdrop>
  );
};

const LoadingBackdrop = (props) =>
  ReactDOM.createPortal(<LoadingPortal {...props} />, document.getElementById("loading"));

export default LoadingBackdrop;
