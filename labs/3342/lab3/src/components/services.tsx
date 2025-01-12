import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { ServiceCard, ServicesGrid } from "../styles/styleTypes";

interface Service {
  id: number;
  name: string;
  description: string;
}

const Services: React.FC = () => {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("Fetching services...");
        const response = await axios.get<Service[]>(
          "http://localhost:8080/api/v1/services"
        );
        console.log("Response:", response.data);
        setAllServices(response.data);
        setFilteredServices(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error details:", err);
        setError(`Не удалось загрузить услуги. ${err.message}`);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredServices(allServices);
    } else {
      const filtered = allServices.filter((service) => service.name === filter);
      setFilteredServices(filtered);
    }
  }, [filter, allServices]);

  const uniqueServiceNames = Array.from(
    new Set(allServices.map((service) => service.name))
  ).sort();

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Стоматологические услуги
      </Typography>

      <FormControl fullWidth sx={{ mb: 4, maxWidth: 400, mx: "auto" }}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as string)}
          displayEmpty
        >
          <MenuItem value="all">Все услуги</MenuItem>
          {uniqueServiceNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && (
        <Typography sx={{ textAlign: "center" }}>Загрузка услуг...</Typography>
      )}

      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {!loading && !error && filteredServices.length === 0 && (
        <Typography sx={{ textAlign: "center" }}>
          Нет услуг по выбранному фильтру.
        </Typography>
      )}

      <ServicesGrid>
        {!loading &&
          !error &&
          filteredServices.map((service) => (
            <ServiceCard key={service.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, flex: 1 }}>
                    {service.description}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Button variant="contained" color="primary" fullWidth>
                      Подробнее
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </ServiceCard>
          ))}
      </ServicesGrid>
    </Box>
  );
};

export default Services;
