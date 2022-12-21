import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MDBox from "components/MDBox";
import { useGlobalStore } from "store";
import { useMaterialUIController } from "context";
import MDButton from "components/MDButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogInfo() {
  //   const [open, setOpen] = React.useState(false);
  const [controller] = useMaterialUIController();
  const {
    dialog: { open, title, content, handler },
  } = useGlobalStore();

  console.log(open);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      // onClose={handler}
      aria-describedby="alert-dialog-slide-description"
    >
      <MDBox
        sx={{
          p: 2,
          bgcolor: controller.darkMode ? "background.default" : "background.paper",
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="info" onClick={handler}>
            Close
          </MDButton>
        </DialogActions>
      </MDBox>
    </Dialog>
  );
}
