import { useLocation, Link } from "react-router-dom";
import { 
  FaHome, 
  FaUser, 
  FaTools, 
  FaProjectDiagram, 
  FaCertificate,
  FaEnvelope 
} from "react-icons/fa";

import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const projectRoutes = ["/megahilos", "/caso-parking", "/caso-samsung", "/plan-gamma", "/plan-delta", "/plan-beta"];

const isProjectPage = projectRoutes.includes(location.pathname);

  const goTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;  // evita errores

  el.scrollIntoView({ behavior: "smooth" });
  setIsOpen(false);
};


  return (
    <nav className={`navbar ${isProjectPage ? "project-mode" : ""}`}>
      <div className="navbar-left">

        {/* BOTÓN VOLVER para todos los proyectos */}
        {isProjectPage ? (
          <Link
  to="/Inicio"
  className="navbar-back-btn"
  onClick={() => {
    localStorage.setItem("goToSection", "projects");
  }}
>
  Volver
</Link>
        ) : (
          <a href="/Portafolio-BI/" className="navbar-brand">
            Mi Portafolio
          </a>
        )}
      </div>

      {/* HAMBURGUESA — visible también en proyectos */}
<div className="menu-toggle" onClick={() => setIsOpen(true)}>
  <span></span>
  <span></span>
  <span></span>
</div>


      <div className={`navbar-right ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          &times;
        </button>

        {/* Menú NORMAL del Inicio */}
        {!isProjectPage && (
          <>
            <button className="navbar-link" onClick={() => goTo("hero")}>
              <FaHome className="menu-icon" /> Inicio
            </button>

            <button className="navbar-link" onClick={() => goTo("about")}>
              <FaUser className="menu-icon" /> Sobre mí
            </button>

            <button className="navbar-link" onClick={() => goTo("tools")}>
              <FaTools className="menu-icon" /> Herramientas
            </button>

            <button className="navbar-link" onClick={() => goTo("projects")}>
              <FaProjectDiagram className="menu-icon" /> Proyectos
            </button>

            <button className="navbar-link" onClick={() => goTo("Certificados")}>
              <FaCertificate className="menu-icon" /> Certificados
            </button>
          </>
        )}

        {/* 🔥 MENÚ ESPECIAL PARA *TODOS* LOS PROYECTOS 🔥 */}
        {isProjectPage && (
          <>
            <button className="navbar-link" onClick={() => goTo("summary")}>
              Resumen & Objetivos
            </button>

            <button className="navbar-link" onClick={() => goTo("etl")}>
              Proceso ETL
            </button>

            <button className="navbar-link" onClick={() => goTo("olap")}>
              Cubo OLAP
            </button>

            <button className="navbar-link" onClick={() => goTo("explotacion")}>
              Explotación de Datos
            </button>

            <button className="navbar-link" onClick={() => goTo("sarimax")}>
              Sarimax
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
