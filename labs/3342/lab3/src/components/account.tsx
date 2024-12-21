import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";
import { fetchUserData } from "../utils/userData";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
} from "@mui/icons-material";

const Account: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box mt={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Box mt={4}>
          <Alert severity="warning">User not found</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar sx={{ width: 80, height: 80 }}>
                  {user.firstName.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
            <Stack spacing={2} mt={3}>
              <Grid container alignItems="center">
                <PersonIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  <strong>Gender:</strong> {user.sex || "Not provided"}
                </Typography>
              </Grid>
              <Grid container alignItems="center">
                <CakeIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  <strong>Date of Birth:</strong>{" "}
                  {user.birthDate || "Not provided"}
                </Typography>
              </Grid>
              <Grid container alignItems="center">
                <PhoneIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </Typography>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Account;
