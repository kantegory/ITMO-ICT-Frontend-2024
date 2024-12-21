import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClinicCard, ClinicImage, ClinicGrid } from "../styles/styleTypes";
import { Select, FormControl, Typography, Box, Button } from "@mui/material";

interface Clinic {
  id: number;
  name: string;
  district: string;
  address: string;
  image: string;
  detailsUrl?: string;
}

const Clinics: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/clinics");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Clinic[] = await response.json();
        setClinics(data);
        setFilteredClinics(data);
      } catch (err: any) {
        setError(`Ошибка загрузки клиник: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  useEffect(() => {
    if (selectedDistrict === "all") {
      setFilteredClinics(clinics);
    } else {
      const filtered = clinics.filter(
        (clinic) =>
          clinic.district.trim().toLowerCase() ===
          selectedDistrict.trim().toLowerCase()
      );
      setFilteredClinics(filtered);
    }
  }, [selectedDistrict, clinics]);

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Наши клиники
      </Typography>

      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <Select
          native
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="all">Все районы</option>
          <option value="Центральный район">Центральный район</option>
          <option value="Василеостровский район">Василеостровский район</option>
          <option value="Адмиралтейский район">Адмиралтейский район</option>
          <option value="Петроградский район">Петроградский район</option>
        </Select>
      </FormControl>

      {loading ? (
        <Typography variant="body1" align="center">
          Загрузка клиник...
        </Typography>
      ) : error ? (
        <Typography variant="body1" align="center" color="error">
          {error}
        </Typography>
      ) : filteredClinics.length === 0 ? (
        <Typography variant="body1" align="center">
          Нет клиник в выбранном районе.
        </Typography>
      ) : (
        <ClinicGrid>
          {filteredClinics.map((clinic) => (
            <ClinicCard key={clinic.id}>
              <ClinicImage src={clinic.image} alt={clinic.name} />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{clinic.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {clinic.address}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={clinic.detailsUrl || "#"}
                    aria-label={`Подробнее о ${clinic.name}`}
                  >
                    Подробнее
                  </Button>
                </Box>
              </Box>
            </ClinicCard>
          ))}
        </ClinicGrid>
      )}
    </Box>
  );
};

export default Clinics;
