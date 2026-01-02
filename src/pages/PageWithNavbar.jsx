import { projectAccess } from "../utils/projectGuard";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/PageWithNavbar.css";
import "../styles/Inicio.css";

function PageWithNavbar() {

  const total = 6;
  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleTransitionEnd = () => {
    if (index === 0) {
      setIsTransitioning(false);
      setIndex(total);
    }
    if (index === total + 1) {
      setIsTransitioning(false);
      setIndex(1);
    }
  };

  /* ---------------------------
        SCROLL SUAVE
  ---------------------------- */
  function smoothScrollTo(targetY, duration = 650) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);

      const ease = 1 - Math.pow(1 - percent, 3);

      window.scrollTo(0, startY + diff * ease);

      if (time < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  useEffect(() => {
    const images = [
      "./assets/megahilos.webp",
      "./assets/parking.webp",
      "./assets/samsung1.webp"
    ];

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });
  }, []);

  /* ---------------------------
     AUTO-SCROLL A PROYECTOS
  ---------------------------- */
  useEffect(() => {
    const section = localStorage.getItem("goToSection");

    if (section === "projects") {
      const el = document.getElementById("projects");
      if (el) {
        window.requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
    }

    localStorage.removeItem("goToSection");
  }, []);

  /* ---------------------------------------------------
    🔥 FIX ANTI-SALTO: tarjetas visibles al volver
  --------------------------------------------------- */
  useEffect(() => {
    const comingFromProject = localStorage.getItem("goToSection") === "projects";

    if (comingFromProject) {
      document.querySelectorAll(".plan-card").forEach(card => {
        card.classList.add("visible");
      });
    }
  }, []);

  /* ---------------------------------------------------
        ⭐ REVEAL ULTRA OPTIMIZADO SIN MICROCORTES
  --------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document.querySelectorAll(".plan-card").forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="inicio-container">
      <div className="page-background">
        <div className="main-content">

          {/* HERO SECTION */}
          <div id="hero" className="hero-container">
            <div className="hero-text reveal">
              <h1 className="hero-title">Bienvenidos a mi Portafolio Web</h1>
              <h2 className="description">
                Los datos cuentan la historia que el negocio necesita escuchar
              </h2>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div id="about" className="about-container exact-style">
            <div className="about-image reveal">
              <img src="./assets/pp.jpg" alt="Jersson Jair Fernández" />
            </div>

            <div className="about-text-content reveal">
              <h2>Sobre mí</h2>
              <p>
                Soy Jersson Jair Fernández Uchuya, especialista en Business Intelligence.
                Me apasiona transformar datos en estrategias efectivas que impulsen
                la toma de decisiones en las organizaciones.
              </p>

              <a
                href="https://www.linkedin.com/in/jersson-jair-fernández-uchuya-a63165382"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-button"
              >
                <img src="./assets/linkedin.jpg" alt="LinkedIn" className="linkedin-icon" />
                Ver Perfil LinkedIn
              </a>
            </div>
          </div>

          {/* TOOLS SECTION */}
          <div id="tools" className="tools-container">
            <h2 className="tools-title reveal">Manejo de Herramientas Informáticas</h2>

            <div className="tools-grid reveal">
              <div className="tool-card"><img src="./assets/excelv8.png" /><h3>Excel</h3></div>
              <div className="tool-card"><img src="./assets/sql.png" /><h3>SQL Server</h3></div>
              <div className="tool-card"><img src="./assets/powerbiv4.png" /><h3>Power BI</h3></div>
              <div className="tool-card"><img src="./assets/python.png" /><h3>Python</h3></div>
              <div className="tool-card"><img src="./assets/react.png" /><h3>React</h3></div>
              <div className="tool-card"><img src="./assets/visualv4.png" /><h3>Visual Studio</h3></div>
            </div>
          </div>

          {/* PROJECTS */}
          <div id="projects" className="projects-container">
  <h2 className="projects-title reveal">PROYECTOS</h2>

  <div className="plans-grid">

    {/* 1 — Megahilos */}
    <div className="plan-card reveal">
      <img src="./assets/megahilos.webp" alt="Megahilos S.A.C" width="400" height="225" />
      <div className="plan-card-content">
        <h3>Megahilos S.A.C</h3>
        <p className="plan-state">IN PROGRESS</p>
        <p>Proyecto empresarial</p>
        <p className="plan-desc">Análisis y desarrollo para Megahilos S.A.C.</p>
        <Link
          to={projectAccess.megahilos ? "/megahilos" : "/Inicio"}
          className="plan-button"
          onClick={() => {
            localStorage.setItem("goToSection", "projects");
            if (!projectAccess.megahilos) alert("🔒 Proyecto aún no disponible públicamente.");
          }}
        >
          Ver Proyecto
        </Link>
      </div>
    </div>

    {/* 2 — Caso Parking */}
    <div className="plan-card reveal">
      <img src="./assets/parking.webp" alt="Caso Parking" width="400" height="225" />
      <div className="plan-card-content">
        <h3>Caso Parking</h3>
        <p className="plan-state">COMPLETE</p>
        <p>Estudio aplicado</p>
        <p className="plan-desc">Optimización del flujo de estacionamiento.</p>
        <Link
          to={projectAccess.parking ? "/caso-parking" : "/Inicio"}
          className="plan-button"
          onClick={() => {
            localStorage.setItem("goToSection", "projects");
            if (!projectAccess.parking) alert("🔒 Proyecto aún no disponible públicamente.");
          }}
        >
          Ver Proyecto
        </Link>
      </div>
    </div>

    {/* 3 — Caso Samsung */}
    <div className="plan-card reveal">
      <img src="./assets/samsung1.webp" alt="Caso Samsung" width="400" height="225" />
      <div className="plan-card-content">
        <h3>Caso Samsung</h3>
        <p className="plan-state">IN PROGRESS</p>
        <p>Business Intelligence</p>
        <p className="plan-desc">Modelo BI para análisis operativo de Samsung Perú.</p>
        <Link
          to={projectAccess.samsung ? "/caso-samsung" : "/Inicio"}
          className="plan-button"
          onClick={() => {
            localStorage.setItem("goToSection", "projects");
            if (!projectAccess.samsung) alert("🔒 Proyecto aún no disponible públicamente.");
          }}
        >
          Ver Proyecto
        </Link>
      </div>
    </div>

    {/* 4 — Plan Beta */}
    <div className="plan-card reveal">
      <img src="./assets/re.webp" alt="Plan Beta" width="400" height="225" />
      <div className="plan-card-content">
        <h3>Plan Beta</h3>
        <p className="plan-state">IN PROGRESS</p>
        <p>Por única vez</p>
        <p className="plan-desc">Contenido limitado</p>
        <Link
          to={projectAccess.beta ? "/plan-beta" : "/Inicio"}
          className="plan-button"
          onClick={() => {
            localStorage.setItem("goToSection", "projects");
            if (!projectAccess.beta) alert("🔒 Proyecto aún no disponible públicamente.");
          }}
        >
          Registrarse
        </Link>
      </div>
    </div>

    {/* 5 — Plan Gamma */}
    <div className="plan-card reveal">
      <img src="./assets/re.webp" alt="Plan Gamma" width="400" height="225" />
      <div className="plan-card-content">
        <h3>Plan Gamma</h3>
        <p className="plan-state">IN PROGRESS</p>
        <p>Por única vez</p>
        <p className="plan-desc">Contenido limitado</p>
        <Link
          to={projectAccess.gamma ? "/plan-gamma" : "/Inicio"}
          className="plan-button"
          onClick={() => {
            localStorage.setItem("goToSection", "projects");
            if (!projectAccess.gamma) alert("🔒 Proyecto aún no disponible públicamente.");
          }}
        >
          Registrarse
        </Link>
      </div>
    </div>

    {/* 6 — Plan Delta */}
    <div className="plan-card reveal">
      <img src="./assets/re.webp" alt="Plan Delta" width="400" height="225" />
      <div className="plan-card-content">
        <h3>Plan Delta</h3>
        <p className="plan-state">IN PROGRESS</p>
        <p>Por única vez</p>
        <p className="plan-desc">Contenido limitado</p>
        <Link
          to={projectAccess.delta ? "/plan-delta" : "/Inicio"}
          className="plan-button"
          onClick={() => {
            localStorage.setItem("goToSection", "projects");
            if (!projectAccess.delta) alert("🔒 Proyecto aún no disponible públicamente.");
          }}
        >
          Registrarse
        </Link>
      </div>
    </div>

  </div>
</div>


          {/* CERTIFICATE CAROUSEL */}
          <div id="Certificados" className="certificates-showcase">
            <h2 className="certificates-title reveal">Certificados Obtenidos</h2>

            <div className="carousel-wrapper reveal">
              <div className="carousel-container">
                <div
                  className="carousel-track"
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: isTransitioning ? "transform 0.55s ease-in-out" : "none"
                  }}
                >
                  <div className="slide"><img src="./assets/cert5.png" /></div>
                  <div className="slide"><img src="./assets/cert1.png" /></div>
                  <div className="slide"><img src="./assets/cert2.png" /></div>
                  <div className="slide"><img src="./assets/cert3.png" /></div>
                  <div className="slide"><img src="./assets/cert4.png" /></div>
                  <div className="slide"><img src="./assets/cert5.png" /></div>
                  <div className="slide"><img src="./assets/cert5.png" /></div>
                  <div className="slide"><img src="./assets/cert1.png" /></div>
                </div>
              </div>

              <div className="carousel-buttons">
                <button className="nav prev" onClick={() => setIndex(index - 1)}>&#10094;</button>
                <button className="nav next" onClick={() => setIndex(index + 1)}>&#10095;</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PageWithNavbar;
