import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            flexGrow: 1,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Медицинский Портал
        </Typography>

        <Button color="inherit" component={Link} to="/clinics">
          Клиники
        </Button>

        <Button color="inherit" component={Link} to="/services">
          Услуги
        </Button>

        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/history">
              История посещений
            </Button>
            <Button color="inherit" component={Link} to="/account">
              Личный кабинет
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Войти
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
