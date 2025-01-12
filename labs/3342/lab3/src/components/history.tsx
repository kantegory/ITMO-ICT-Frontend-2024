import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visit } from "../types/visit";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";

const History: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!localStorage.getItem("token")) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/v1/user/visits",
          {
            method: "GET",
            headers: {
              Authorization: token || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при получении истории посещений");
        }

        const data: Visit[] = await response.json();
        setVisits(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="container" role="main">
      <Typography variant="h4" align="center" gutterBottom>
        История посещений
      </Typography>
      <section id="history" className="mt-4" aria-label="Список посещений">
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Alert severity="error" className="text-center">
            {error}
          </Alert>
        ) : visits.length > 0 ? (
          <Grid container spacing={3}>
            {visits.map((visit) => (
              <Grid item xs={12} sm={6} md={4} key={visit.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {visit.date}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Врач:</strong> {visit.doctor}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Услуга:</strong> {visit.service}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography align="center">История посещений отсутствует.</Typography>
        )}
      </section>
    </main>
  );
};

export default History;
