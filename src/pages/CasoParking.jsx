import "../projectstyles/base/CasoParkingBase.css";
import "../projectstyles/responsive/CasoParkingResponsive.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { jumpToScrollPosition } from "../utils/scrollToSection";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function CasoParking() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es"
  );

  const [modalImages, setModalImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIntroTab, setActiveIntroTab] = useState(null);

  const text = {
    es: {
      title: "Caso Parking",
      subtitle: "Solución de Business Intelligence para gestión de estacionamientos - UTP",
      description:
        "Proyecto académico grupal desarrollado con SQL Server, T-SQL, Power BI y Python. Participé en la construcción de un Data Warehouse, procesos ETL, dashboards, segmentación RFM y pronóstico de ingresos.",
      projectMeta: [
        "Proyecto académico grupal",
        "Mar. 2025 - Ago. 2025",
        "SQL Server · T-SQL · Power BI · Python"
      ],

      buttonDashboard: "Ver Dashboard",
      buttonETL: "Ver Proceso ETL",
      backToSummary: "← Volver al resumen",

      objectivesTitle: "Objetivos del Proyecto",
      objectives: [
        "Analizar el comportamiento de entrada y salida de vehículos.",
        "Identificar horarios pico de mayor afluencia.",
        "Calcular permanencia promedio de los clientes.",
        "Transformar datos operativos mediante un proceso ETL.",
        "Diseñar un modelo dimensional tipo estrella.",
        "Construir un cubo OLAP para análisis multidimensional.",
        "Crear dashboards analíticos en Power BI.",
        "Proyectar la demanda mediante modelos SARIMAX."
      ],

      etlTitle: "Proceso ETL",
      etlDescription:
        "Procesos ETL implementados en T-SQL para integrar archivos mensuales, limpiar y estandarizar datos, tratar valores nulos y calcular indicadores de permanencia e ingresos.",

      etlItems: [
        {
          title: "1. Ingesta de Datos",
          description:
            "Carga de archivos CSV mensuales en una tabla staging para centralizar los registros operativos.",
          tag: "TB_FLUJO_VEHICULAR"
        },
        {
          title: "2. Limpieza y Normalización",
          description:
            "Corrección de fechas, horas, placas, permanencia y registros inconsistentes.",
          tag: "TRAX_PLACAS_T1 → T2"
        },
        {
          title: "3. Construcción de Hechos",
          description:
            "Generación de la tabla de hechos con entradas, salidas, clientes, ingresos y permanencia.",
          tag: "FACT_PARKING_V1 → V5"
        },
        {
          title: "4. Modelo Dimensional",
          description:
            "Creación de dimensiones y relaciones para un modelo tipo estrella.",
          tag: "Star Schema"
        }
      ],

      olapTitle: "Modelo Dimensional y Cubo OLAP",
      olapDescription:
        "Se construyó un Data Warehouse con esquema dimensional compuesto por una tabla de hechos y nueve dimensiones. El modelo permitió analizar clientes, visitas, ingresos, horarios, locales y distribución geográfica desde diferentes perspectivas.",

      powerBiTitle: "Explotación de Datos en Power BI",
      powerBiDescription:
        "Se desarrollaron cuatro páginas de análisis en Power BI con KPI de clientes, visitas, ingresos, horarios, locales y distribución geográfica.",

      sarimaxTitle: "Proyección mediante SARIMAX",
      sarimaxDescription:
        "Se aplicó un modelo SARIMAX en Python para pronosticar 12 meses de ingresos, considerando el comportamiento histórico y la estacionalidad de la serie.",

      finalTitle: "Resumen Final del Proyecto",
      indicatorsTitle: "Indicadores",
      resultsTitle: "Resultados",
      conclusionTitle: "Conclusión",

      kpis: [
        {
          value: "1",
          label: "Tabla de hechos"
        },
        {
          value: "9",
          label: "Dimensiones"
        },
        {
          value: "4",
          label: "Páginas Power BI"
        },
        {
          value: "12",
          label: "Meses pronosticados"
        }
      ],

      results: [
        "Construcción de un Data Warehouse con una tabla de hechos y nueve dimensiones.",
        "Integración de archivos mensuales mediante ETL en T-SQL, incluyendo limpieza, estandarización y tratamiento de valores nulos.",
        "Desarrollo de cuatro páginas de análisis en Power BI con KPI operativos y geográficos.",
        "Segmentación RFM en tres grupos de clientes.",
        "Pronóstico de 12 meses de ingresos mediante un modelo SARIMAX en Python."
      ],

      conclusion:
        "El proyecto evidencia experiencia académica en preparación, transformación, modelado y visualización de información. Integra SQL Server, T-SQL, ETL, modelado dimensional, Power BI, segmentación RFM, Python y análisis de series temporales.",

      modalAlt: "Detalle del proceso ETL",
      olapAlt: "Modelo dimensional del cubo OLAP",
      dashboardTitle: "Dashboard Parking",
      sarimaxAlt: "Gráfico SARIMAX",
      projectionAlt: "Tabla de proyección mensual"
    },

    en: {
      title: "Parking Case",
      subtitle: "Business Intelligence solution for parking management - UTP",
      description:
        "Group academic project developed with SQL Server, T-SQL, Power BI, and Python. I participated in building a Data Warehouse, ETL processes, dashboards, RFM segmentation, and revenue forecasting.",
      projectMeta: [
        "Group academic project",
        "Mar. 2025 - Aug. 2025",
        "SQL Server · T-SQL · Power BI · Python"
      ],

      buttonDashboard: "View Dashboard",
      buttonETL: "View ETL Process",
      backToSummary: "← Back to summary",

      objectivesTitle: "Project Objectives",
      objectives: [
        "Analyze vehicle entry and exit behavior.",
        "Identify peak traffic hours.",
        "Calculate average customer stay duration.",
        "Transform operational data through an ETL process.",
        "Design a star schema dimensional model.",
        "Build an OLAP cube for multidimensional analysis.",
        "Create analytical dashboards in Power BI.",
        "Forecast demand using SARIMAX models."
      ],

      etlTitle: "ETL Process",
      etlDescription:
        "T-SQL ETL processes were implemented to integrate monthly files, clean and standardize data, handle null values, and calculate stay and revenue indicators.",

      etlItems: [
        {
          title: "1. Data Ingestion",
          description:
            "Monthly CSV files were loaded into a staging table to centralize operational records.",
          tag: "TB_FLUJO_VEHICULAR"
        },
        {
          title: "2. Cleaning and Normalization",
          description:
            "Correction of dates, times, license plates, stay duration and inconsistent records.",
          tag: "TRAX_PLACAS_T1 → T2"
        },
        {
          title: "3. Fact Table Construction",
          description:
            "Creation of the fact table with entries, exits, customers, revenue and stay duration.",
          tag: "FACT_PARKING_V1 → V5"
        },
        {
          title: "4. Dimensional Model",
          description:
            "Creation of dimensions and relationships for a star schema model.",
          tag: "Star Schema"
        }
      ],

      olapTitle: "Dimensional Model and OLAP Cube",
      olapDescription:
        "A dimensional Data Warehouse was built with one fact table and nine dimensions. The model enabled analysis of customers, visits, revenue, schedules, locations, and geographic distribution from different perspectives.",

      powerBiTitle: "Data Analysis in Power BI",
      powerBiDescription:
        "Four Power BI analysis pages were developed with KPIs for customers, visits, revenue, schedules, locations, and geographic distribution.",

      sarimaxTitle: "SARIMAX Forecast",
      sarimaxDescription:
        "A SARIMAX model was applied in Python to forecast 12 months of revenue, considering historical behavior and time-series seasonality.",

      finalTitle: "Final Project Summary",
      indicatorsTitle: "Indicators",
      resultsTitle: "Results",
      conclusionTitle: "Conclusion",

      kpis: [
        {
          value: "1",
          label: "Fact table"
        },
        {
          value: "9",
          label: "Dimensions"
        },
        {
          value: "4",
          label: "Power BI pages"
        },
        {
          value: "12",
          label: "Forecast months"
        }
      ],

      results: [
        "Built a Data Warehouse with one fact table and nine dimensions.",
        "Integrated monthly files through T-SQL ETL, including cleaning, standardization, and null-value handling.",
        "Developed four Power BI analysis pages with operational and geographic KPIs.",
        "Applied RFM segmentation to three customer groups.",
        "Forecast 12 months of revenue with a SARIMAX model in Python."
      ],

      conclusion:
        "The project demonstrates academic experience in data preparation, transformation, modeling, and visualization. It integrates SQL Server, T-SQL, ETL, dimensional modeling, Power BI, RFM segmentation, Python, and time-series analysis.",

      modalAlt: "ETL process detail",
      olapAlt: "OLAP cube dimensional model",
      dashboardTitle: "Parking Dashboard",
      sarimaxAlt: "SARIMAX chart",
      projectionAlt: "Monthly forecast table"
    }
  };

  const content = text[language];

  const openEtlModal = (index = 0) => {
    setModalImages([
      assetUrl("assets/factparkingF.png"),
      assetUrl("assets/limpieza.png"),
      assetUrl("assets/temp visitas.png"),
      assetUrl("assets/dimensiones.png")
    ]);

    setCurrentIndex(index);
  };

  const closeModal = () => {
    setModalImages([]);
    setCurrentIndex(0);
  };

  const goToNextImage = useCallback(() => {
    if (!modalImages.length) return;
    setCurrentIndex((current) => (current + 1) % modalImages.length);
  }, [modalImages.length]);

  const goToPreviousImage = useCallback(() => {
    if (!modalImages.length) return;
    setCurrentIndex(
      (current) => (current - 1 + modalImages.length) % modalImages.length,
    );
  }, [modalImages.length]);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const scrollRestoredRef = useRef(false);

  useLayoutEffect(() => {
    // En recargas y navegación del historial se conserva la restauración
    // nativa del navegador. Solo una entrada desde el botón del portafolio
    // fuerza el inicio de Caso Parking.
    if (scrollRestoredRef.current) return;
    scrollRestoredRef.current = true;

    const cameFromPortfolio =
      sessionStorage.getItem("caseParkingNavigation") ===
      "fromPortfolio";

    if (cameFromPortfolio) {
      sessionStorage.removeItem("caseParkingNavigation");
      jumpToScrollPosition(0, 0, { settleFrames: 6 });
      return;
    }

    window.history.scrollRestoration = "auto";
  }, []);

  useEffect(() => {
    if (modalImages.length > 0) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [modalImages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!modalImages.length) return;

      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight") goToNextImage();
      if (event.key === "ArrowLeft") goToPreviousImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalImages.length, goToNextImage, goToPreviousImage]);

  return (
    <main className="parking-container">
      {/* ===================== RESUMEN ===================== */}
      <section id="summary" className="parking-section hero-section">
        {activeIntroTab === null && (
          <div className="hero-grid">
            <div className="hero-content">
              <span className="section-badge">Business Intelligence</span>
              <h1>{content.title}</h1>
              <h3>{content.subtitle}</h3>
              <div className="case-meta-row">
                {content.projectMeta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p>{content.description}</p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setActiveIntroTab("dashboard")}
                >
                  {content.buttonDashboard}
                </button>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setActiveIntroTab("etl")}
                >
                  {content.buttonETL}
                </button>
              </div>
            </div>

            <div className="hero-panel">
              <h2>{content.objectivesTitle}</h2>

              <div className="objectives-grid">
                {content.objectives.map((objective, index) => (
                  <div className="objective-card" key={index}>
                    <span className="check-icon">✓</span>
                    <p>{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeIntroTab === "dashboard" && (
          <div className="intro-full-view dashboard-view">
            <div className="intro-view-header">
              <button
                className="back-to-summary-btn"
                type="button"
                onClick={() => setActiveIntroTab(null)}
              >
                {content.backToSummary}
              </button>

              <span className="section-badge">Visualización</span>
              <h2>{content.powerBiTitle}</h2>
              <p>{content.powerBiDescription}</p>
            </div>

            <div className="intro-dashboard-frame">
              <iframe
                className="powerbi-frame"
                title={content.dashboardTitle}
                src="https://app.powerbi.com/view?r=eyJrIjoiMjRhOTY5ZmQtODI2Ni00ZjA2LWIyNjYtZmQzMGNiZWRiYWQzIiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9&pageName=0422f3a728c903cb9e06"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {activeIntroTab === "etl" && (
          <div className="intro-full-view intro-full-view-dark">
            <div className="intro-view-header dark">
              <button
                className="back-to-summary-btn dark-btn"
                type="button"
                onClick={() => setActiveIntroTab(null)}
              >
                {content.backToSummary}
              </button>

              <span className="section-badge">Pipeline</span>
              <h2>{content.etlTitle}</h2>
              <p>{content.etlDescription}</p>
            </div>

            <div className="intro-etl-list">
              {content.etlItems.map((item, index) => (
                <button
                  className="etl-item"
                  onClick={() => openEtlModal(index)}
                  key={index}
                  type="button"
                >
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <span>{item.tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===================== CUBO OLAP ===================== */}
      <section id="olap" className="parking-section olap-section">
        <div className="split-section reverse">
          <div className="image-panel">
            <img src={assetUrl("assets/cubo_olapv2.jpg")} alt={content.olapAlt} />
          </div>

          <div className="text-block">
            <span className="section-badge">Modelo Analítico</span>
            <h2>{content.olapTitle}</h2>
            <p>{content.olapDescription}</p>
          </div>
        </div>
      </section>

      {/* ===================== SARIMAX ===================== */}
      <section id="sarimax" className="parking-section sarimax-section">
        <div className="section-header dark">
          <span className="section-badge">Forecasting</span>
          <h2>{content.sarimaxTitle}</h2>
          <p>{content.sarimaxDescription}</p>
        </div>

        <div className="sarimax-row">
          <div className="sarimax-main">
            <img
              src={assetUrl("assets/sarimax_forecast.webp")}
              alt={content.sarimaxAlt}
            />
          </div>

          <div className="sarimax-side">
            <img src={assetUrl("assets/provent.webp")} alt={content.projectionAlt} />
          </div>
        </div>
      </section>

      {/* ===================== RESUMEN FINAL ===================== */}
      <section
        id="resumen-final"
        className="parking-section final-project-section"
      >
        <div className="project-final-summary">
          <div className="final-summary-header">
            <span className="section-badge">Impacto</span>
            <h2>{content.finalTitle}</h2>
          </div>

          <div className="final-summary-grid">
            <div className="final-card indicators-card">
              <h3>{content.indicatorsTitle}</h3>

              <div className="mini-kpi-grid">
                {content.kpis.map((kpi, index) => (
                  <div className="mini-kpi" key={index}>
                    <strong>{kpi.value}</strong>
                    <span>{kpi.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="final-card results-card">
              <h3>{content.resultsTitle}</h3>

              <ul>
                {content.results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>

            <div className="final-card conclusion-final-card">
              <h3>{content.conclusionTitle}</h3>
              <p>{content.conclusion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MODAL ETL ===================== */}
      {modalImages.length > 0 && (
        <div className="etl-modal" aria-modal="true" role="dialog">
          <div className="etl-modal-content">
            <div className="etl-counter">
              {currentIndex + 1} / {modalImages.length}
            </div>

            <img src={modalImages[currentIndex]} alt={content.modalAlt} />

            <button
              className="etl-nav left"
              onClick={goToPreviousImage}
              type="button"
              aria-label="Imagen anterior"
            >
              ‹
            </button>

            <button
              className="etl-nav right"
              onClick={goToNextImage}
              type="button"
              aria-label="Imagen siguiente"
            >
              ›
            </button>

            <button
              className="etl-modal-close"
              onClick={closeModal}
              type="button"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}