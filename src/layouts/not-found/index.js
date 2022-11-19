import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

import React from "react";

const NotFound = () => {
  return (
    <PageLayout>
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          404 Page Not Found
        </Grid>
      </MDBox>
    </PageLayout>
  );
};

export default NotFound;
