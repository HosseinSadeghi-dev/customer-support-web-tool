import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

interface Props {
  toggleDarkMode: () => void;
}

const Header: React.FC<Props> = ({ toggleDarkMode }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customer Support Tool
          </Typography>
          <Button color="inherit" onClick={toggleDarkMode}>
            Toggle Theme
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
