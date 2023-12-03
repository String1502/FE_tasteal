import { Box } from "@mui/material";
import React from "react";
import { Footer } from "../components/ui/layout/Footer";
import { Header } from "../components/ui/layout/Header";

function Layout({
  withFooter = true,
  children,
}: {
  withFooter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box
      component={"div"}
      sx={{
        backgroundColor: "background.default",
        px: 0,
      }}
    >
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
      {withFooter && <Footer />}
    </Box>
  );
}

export default Layout;
