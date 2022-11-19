import { IconButton } from "@mui/material";
import { useMaterialUIController } from "context";
import React, { forwardRef } from "react";

const ThemedIconButton = forwardRef(({ children, ...props }, ref) => {
  const [controller] = useMaterialUIController();
  return (
    <IconButton ref={ref} color={controller.darkMode ? "white" : "inherit"} {...props}>
      {children}
    </IconButton>
  );
});

export default ThemedIconButton;
