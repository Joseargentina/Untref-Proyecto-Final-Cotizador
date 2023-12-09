import React from "react";
import "./Button.css";

const Button = ({ isLoading, children }) => {
  return (
    <button className="cotizar-button" disabled={isLoading}>
      {isLoading ? "Cargando..." : "Cotizar"}
    </button>
  );
};

export default Button;
