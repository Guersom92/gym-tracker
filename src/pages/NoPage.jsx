import React from "react";
import { Link } from "react-router-dom";
import "../styles/NoPage.css";

function NoPage() {
  return (
    <div className="no-page-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="home-button">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NoPage;
