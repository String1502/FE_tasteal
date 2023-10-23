import { Box, Container } from "@mui/material";
import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component={"div"}
      sx={{
        backgroundColor: "#fffaf9",
      }}
    >
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Box>
  );
}

export default Layout;
