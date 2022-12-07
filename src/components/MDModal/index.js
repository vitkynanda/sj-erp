import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import MDBox from "components/MDBox";
import { styled } from "@mui/material/styles";
import { Icon, IconButton } from "@mui/material";
import { useMaterialUIController } from "context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 3,
  boxShadow: 24,
  maxHeight: 600,
  overflowY: "auto",
  p: 2,
};

const BoxResponsive = styled(Box)(({ theme }) => ({
  minWidth: 450,
  [theme.breakpoints.down("md")]: {
    minWidth: 370,
    width: 370,
  },
}));

export default function MDModal({ open, setOpen, children }) {
  const [controller] = useMaterialUIController();
  const handleClose = () => setOpen(false);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <BoxResponsive
          sx={{
            ...style,
            bgcolor: controller.darkMode ? "background.default" : "background.paper",
            border: controller.darkMode ? "transparent" : "2px solid gray",
          }}
        >
          <MDBox position="relative">
            <MDBox position="absolute" top={-1} right={2}>
              <IconButton color={controller.darkMode ? "white" : "inherit"} onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </MDBox>
            {children}
          </MDBox>
        </BoxResponsive>
      </Fade>
    </Modal>
  );
}
