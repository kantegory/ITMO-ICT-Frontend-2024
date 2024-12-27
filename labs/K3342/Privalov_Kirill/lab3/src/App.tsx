import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import History from "./components/history";
import Clinics from "./components/clinics";
import Login from "./components/login";
import Registration from "./components/signup";
import Layout from "./components/layout";
import Main from "./components/main";
import { GlobalStyles } from "./styles/styles";
import Account from "./components/account";
import theme from "./styles/theme";
import Services from "./components/services";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/history" element={<History />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/account" element={<Account />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
