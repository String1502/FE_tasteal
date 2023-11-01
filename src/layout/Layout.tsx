import { Box, Container, useTheme } from "@mui/material";
import React from "react";
import { Header } from "../components/ui/layout/Header";
import { Footer } from "../components/ui/layout/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component={"div"}
      sx={{
        backgroundColor: "background.default",
        px: 0,
      }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
}

export default Layout;
