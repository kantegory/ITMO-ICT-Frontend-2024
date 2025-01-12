import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { ContentContainer, MainContainer } from "../styles/styleTypes";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Header />
        <ContentContainer>{children}</ContentContainer>
        <Footer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default Layout;
