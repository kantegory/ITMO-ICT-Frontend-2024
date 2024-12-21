import React from "react";
import clinicImage from "../assets/clinic.png";
import servicesImage from "../assets/services.png";
import { MainImage } from "../styles/styleTypes";

const headerStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
  textAlign: "center",
  padding: "2rem",
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
  position: "relative",
  left: "0%",
  right: "0%",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "1rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  marginBottom: "1rem",
};

const leadStyle: React.CSSProperties = {
  fontSize: "1.25rem",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "1.5rem",
  padding: "0.75rem 1.25rem",
  backgroundColor: "#fff",
  color: "#007bff",
  textDecoration: "none",
  borderRadius: "4px",
};

const Main: React.FC = () => {
  return (
    <div>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>
            Добро пожаловать в нашу стоматологическую клинику
          </h1>
          <p style={leadStyle}>
            Мы предлагаем широкий спектр стоматологических услуг и заботимся о
            вашем здоровье.
          </p>
          <a href="/services" style={buttonStyle}>
            Узнать об услугах
          </a>
        </div>
      </header>

      <main style={containerStyle}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ flex: "1 0 300px" }}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MainImage
                src={clinicImage}
                alt="Clinic"
                style={{ flex: "50 50 auto", objectPosition: "top" }}
              />
              <div style={{ padding: "1rem", flex: "1 1 auto" }}>
                <h5>Наши клиники</h5>
                <p>
                  Узнайте больше о наших клиниках в Санкт-Петербурге и выберите
                  ближайшую.
                </p>
                <a
                  href="clinics"
                  style={{
                    ...buttonStyle,
                    color: "#fff",
                    backgroundColor: "#007bff",
                  }}
                >
                  Перейти к клиникам
                </a>
              </div>
            </div>
          </div>

          <div style={{ flex: "1 0 300px" }}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <MainImage src={servicesImage} alt="Услуги" />
              <div style={{ padding: "1rem" }}>
                <h5>Наши услуги</h5>
                <p>
                  Мы предоставляем полный спектр стоматологических услуг:
                  терапия, ортодонтия и имплантация.
                </p>
                <a
                  href="/services"
                  style={{
                    ...buttonStyle,
                    color: "#fff",
                    backgroundColor: "#007bff",
                  }}
                >
                  Посмотреть услуги
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
