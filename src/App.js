import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import ProtectedRoute from "helpers/protected-route";
import NotFound from "layouts/not-found";
import SignIn from "layouts/authentication/sign-in";
import { ToastContainer } from "react-toastify";
import useAuthListener from "hooks/use-auth-listener";
import { useGlobalStore } from "store";
import { themeStorage } from "utils";
import {
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";
import Transactions from "layouts/transaction";

export default function App() {
  useAuthListener();
  const [controller, dispatch] = useMaterialUIController();
  const { userLoggedIn } = useGlobalStore();

  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const initUITheme = () => {
    if (themeStorage) {
      const {
        sidenavColor: sidenavColorSt,
        darkMode: darkModeSt,
        fixedNavbar: fixedNavbarSt,
        transparentSidenav: transparentSidenavSt,
        whiteSidenav: whiteSidenavSt,
      } = JSON.parse(themeStorage);
      if (transparentSidenavSt !== undefined) setTransparentSidenav(dispatch, transparentSidenavSt);
      if (whiteSidenavSt !== undefined) setWhiteSidenav(dispatch, whiteSidenavSt);
      if (darkModeSt !== undefined) setDarkMode(dispatch, darkModeSt);
      if (fixedNavbarSt !== undefined) setFixedNavbar(dispatch, fixedNavbarSt);
      if (sidenavColorSt !== undefined) setSidenavColor(dispatch, sidenavColorSt);
    }
  };
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    initUITheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(userLoggedIn.role !== "Admin");

  const getRoutes = (allRoutes) =>
    userLoggedIn.role === "ADMIN" ? (
      allRoutes.map((route) => {
        if (route.route) {
          return (
            <Route element={<ProtectedRoute />} key={route.key}>
              <Route exact path={route.route} element={route.component} />
            </Route>
          );
        }

        return null;
      })
    ) : (
      <Route element={<ProtectedRoute />}>
        <Route exact path="/transaction" element={<Transactions />} />
      </Route>
    );

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <ToastContainer
        position="top-right"
        theme={darkMode ? "dark" : "light"}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <CssBaseline />
      {layout === "dashboard" && userLoggedIn.user_id && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="ERP SALJU88"
            routes={
              userLoggedIn.role === "ADMIN"
                ? routes
                : routes.filter((route) => route.route === "/transaction")
            }
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/authentication/sign-in" element={<SignIn />} />
        <Route
          path="/"
          element={<Navigate to={userLoggedIn.role === "ADMIN" ? "/dashboard" : "/transaction"} />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        {getRoutes(routes)}
      </Routes>
    </ThemeProvider>
  );
}
