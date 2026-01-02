import "../projectstyles/CasoParking.css";
import { useEffect, useState, useRef } from "react";

export default function CasoParking() {

  // ====== ETL Modal con carrusel ======
  const [modalImages, setModalImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Power BI lazy load
  const explotacionRef = useRef(null);
  const [loadDashboard, setLoadDashboard] = useState(false);

  // Scroll top al iniciar
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
  if (modalImages.length) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}, [modalImages]);

  // IntersectionObserver optimizado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setLoadDashboard(entry.isIntersecting),
      { threshold: 0.35 }
    );

    if (explotacionRef.current) observer.observe(explotacionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="parking-container">

{/* ===================== 1. SUMMARY ===================== */}
<section id="summary" className="screen-full">
  <div className="summary-grid">
    <div className="hero-clean">
      <h1>Caso Parking</h1>
      <h3>Optimización del flujo vehicular y análisis operativo</h3>
      <p>
        Proyecto centrado en el análisis, modelado y optimización del sistema de
        estacionamiento, identificando flujo vehicular, permanencia y patrones
        operativos clave.
      </p>
    </div>

    <div className="objectives-clean">
      <h2 className="parking-heading">🎯 Objetivos del Proyecto</h2>
      <div className="objectives-grid">
        <div className="objective-card">Analizar el comportamiento de entrada y salida de vehículos.</div>
        <div className="objective-card">Identificar horas pico de mayor afluencia.</div>
        <div className="objective-card">Construir un modelo ETL para transformar datos brutos.</div>
        <div className="objective-card">Diseñar un modelo dimensional tipo estrella.</div>
        <div className="objective-card">Construir un cubo OLAP con actualización periódica.</div>
        <div className="objective-card">Crear dashboards analíticos en Power BI.</div>
        <div className="objective-card">Proyectar la demanda mediante modelos SARIMAX.</div>
      </div>
    </div>
  </div>
</section>

{/* ===================== 2. ETL ===================== */}
<section id="etl" className="screen-full etl-section">

  <div className="etl-header">
    <h2>🔧 Proceso ETL</h2>
    <p>Pipeline ETL diseñado para transformar datos operativos en un modelo analítico optimizado.</p>
  </div>

  <div className="etl-list">

    <div className="etl-item" onClick={() => {
      setModalImages(["./assets/factparkingF.png", "./assets/limpieza.png", "./assets/temp visitas.png", "./assets/dimensiones.png"]);
      setCurrentIndex(0);
    }}>
      <h4>1. Ingesta de Datos</h4>
      <p>CSV mensuales → Tabla staging</p>
      <span>TB_FLUJO_VEHICULAR</span>
    </div>

    <div className="etl-item" onClick={() => {
      setModalImages(["./assets/factparkingF.png", "./assets/limpieza.png", "./assets/temp visitas.png", "./assets/dimensiones.png"]);
      setCurrentIndex(0);
    }}>
      <h4>2. Limpieza & Normalización</h4>
      <p>Corrección de fechas, horas y placas</p>
      <span>TRAX_PLACAS_T1 → T2</span>
    </div>

    <div className="etl-item" onClick={() => {
      setModalImages(["./assets/factparkingF.png", "./assets/limpieza.png", "./assets/temp visitas.png", "./assets/dimensiones.png"]);
      setCurrentIndex(0);
    }}>
      <h4>3. Construcción de Hechos</h4>
      <p>Entradas, salidas y permanencia</p>
      <span>FACT_PARKING_V1 → V5</span>
    </div>

    <div className="etl-item" onClick={() => {
      setModalImages(["./assets/factparkingF.png", "./assets/limpieza.png", "./assets/temp visitas.png", "./assets/dimensiones.png"]);
      setCurrentIndex(0);
    }}>
      <h4>4. Modelo Dimensional</h4>
      <p>Hecho final + dimensiones</p>
      <span>Star Schema</span>
    </div>

  </div>

  {modalImages.length > 0 && (
    <div className="etl-modal">

      <div className="etl-modal-content">

        <div className="etl-counter">
  {currentIndex + 1} / {modalImages.length}
</div>


        <img src={modalImages[currentIndex]} alt="Detalle ETL" />

        <button className="etl-nav left"
          onClick={() => setCurrentIndex((currentIndex - 1 + modalImages.length) % modalImages.length)}>
          ‹
        </button>

        <button className="etl-nav right"
          onClick={() => setCurrentIndex((currentIndex + 1) % modalImages.length)}>
          ›
        </button>

        <button className="etl-modal-close" onClick={() => setModalImages([])}>✕</button>
      </div>

    </div>
  )}

</section>

{/* ===================== 3. OLAP ===================== */}
<section id="olap" className="screen-full">
  <div className="split-section reverse">
    <img src="./assets/cubo_olapv2.jpg" alt="Cubo OLAP" />
    <div className="text-block">
      <h2>🧊 Cubo OLAP y Actualización Periódica</h2>
      <p>Se desarrolló un cubo OLAP para análisis multidimensional.</p>
    </div>
  </div>
</section>

{/* ===================== 4. POWER BI ===================== */}
<section id="explotacion" className="screen-full">
  <div className="explotacion-wrapper">
    <div className="explotacion-section">

      <div ref={explotacionRef} className="explotacion-iframe-container">
        {loadDashboard && (
          <iframe
            className="explotacion-iframe"
            title="Dashboard Parking"
            src="https://app.powerbi.com/view?r=eyJrIjoiMjRhOTY5ZmQtODI2Ni00ZjA2LWIyNjYtZmQzMGNiZWRiYWQzIiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9&pageName=0422f3a728c903cb9e06"
            allowFullScreen
          />
        )}
      </div>

      <div className="explotacion-text">
        <h2>📊 Explotación de Datos</h2>
        <p>Dashboards interactivos creados para visualizar tendencias y patrones.</p>
      </div>

    </div>
  </div>
</section>

{/* ===================== 5. SARIMAX ===================== */}
<section id="sarimax" className="screen-full sarimax-section">
  <div className="sarimax-content">
    <h2>📈 Proyección SARIMAX</h2>
    <p>Modelo SARIMAX aplicado para proyectar la afluencia mensual.</p>

    <div className="sarimax-row">
      <div className="sarimax-main">
        <img src="./assets/sarimax_forecast.webp" alt="SARIMAX Forecast" />
      </div>
      <div className="sarimax-side">
        <img src="./assets/provent.webp" alt="Proyección Mensual" />
      </div>
    </div>
  </div>
</section>

    </div>
  );
}
