import MDTypography from "components/MDTypography";
import React from "react";

const ThemedText = ({ children, ...props }) => {
  return <MDTypography {...props}></MDTypography>;
};

export default ThemedText;
