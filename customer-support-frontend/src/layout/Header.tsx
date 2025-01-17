import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

interface Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<Props> = ({ toggleDarkMode, darkMode }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customer Support Tool
          </Typography>
          <Button
            color="inherit"
            onClick={toggleDarkMode}
            startIcon={darkMode ? <LightMode /> : <DarkMode />}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
