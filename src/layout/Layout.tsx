import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>{/* Footer content */}</footer>
    </div>
  );
}

export default Layout;
