import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import { Outlet } from "react-router";
import { Container } from "@mui/material";

const Layout = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleDarkMode={() => setDarkMode(!darkMode)} />
      <Container sx={{ mt: 6 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
