import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/account");
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("email", email.trim());
          window.location.href = "/account";
        } else {
          setError("Не удалось получить токен аутентификации.");
        }
      } else if (response.status === 401) {
        setError("Неправильный email или пароль!");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Произошла ошибка при входе.";
        setError(errorMessage);
      }
    } catch (error) {
      setError("Не удалось подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ mt: 8 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Вход в личный кабинет
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Войти"}
          </Button>
          <Box textAlign="center">
            <Link to="/registration" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                Нет аккаунта? Зарегистрироваться
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
