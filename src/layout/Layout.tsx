import { Container } from "@mui/material";
import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}

export default Layout;
