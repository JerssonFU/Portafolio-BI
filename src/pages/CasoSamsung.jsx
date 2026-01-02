import "../projectstyles/CasoSamsung.css";
import { useEffect } from "react";

export default function CasoSamsung() {

  // 🔥 Scroll al inicio siempre
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="samsung-container">

      {/* ================================================= */}
      {/* 1. HERO + OBJETIVOS */}
      {/* ================================================= */}
      <section id="summary" className="screen-full">
        <div className="samsung-hero">
          <h1>Caso Samsung BI</h1>
          <h3>Implementación de Ecosistema Analítico Corporativo</h3>

          <p>
            Proyecto orientado a la unificación, análisis y explotación de datos
            estratégicos para las áreas de ventas, logística, marketing y supply chain
            dentro de Samsung Latinoamérica.
          </p>
        </div>

        <div className="samsung-objectives">
          <h2 className="samsung-heading">🎯 Objetivos del Proyecto</h2>

          <ul className="samsung-list">
            <li>Integración de datos SAP, CRM, retail y logística.</li>
            <li>Automatización del pipeline ETL corporativo.</li>
            <li>Diseño del modelo dimensional para análisis ejecutivo.</li>
            <li>Dashboards avanzados para ventas e inventarios.</li>
            <li>Proyecciones de demanda con modelos SARIMAX.</li>
          </ul>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2. PROCESO ETL */}
      {/* ================================================= */}
      <section id="etl" className="screen-full">
        <div className="samsung-split">
          <div className="samsung-text">
            <h2>🔧 Proceso ETL</h2>
            <p>
              Implementación de un pipeline de integración de datos, asegurando la 
              estandarización, deduplicación y consistencia para todos los sistemas 
              analíticos del proyecto Samsung BI.
            </p>
          </div>

          <img src="/assets/samsung/etl.png" alt="ETL Samsung" />
        </div>
      </section>

      {/* ================================================= */}
      {/* 3. CUBO OLAP */}
      {/* ================================================= */}
      <section id="olap" className="screen-full">
        <div className="samsung-split reverse">
          <img src="/assets/samsung/olap.png" alt="Cubo OLAP Samsung" />

          <div className="samsung-text">
            <h2>🧊 Cubo OLAP Ejecutivo</h2>
            <p>
              Desarrollo de un cubo OLAP para explorar ventas, inventarios, 
              márgenes y rendimiento por país, canal y categoría de producto.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 4. EXPLOTACIÓN DE DATOS */}
      {/* ================================================= */}
      <section id="explotacion" className="screen-full">
        <h2>📊 Explotación de Datos</h2>
        <p>
          Dashboards interactivos con análisis clave para equipos regionales 
          de ventas, supply chain y marketing.
        </p>

        <iframe
          title="Dashboard Samsung BI"
          src="https://app.powerbi.com/view?r=xxxxx"
          allowFullScreen
        ></iframe>

        <ul className="samsung-list">
          <li>Desempeño de ventas por canal y región.</li>
          <li>Rotación y quiebre de inventarios.</li>
          <li>Seguimiento de KPIs logísticos y comerciales.</li>
          <li>Análisis de campañas y estrategias de marketing.</li>
        </ul>
      </section>

      {/* ================================================= */}
      {/* 5. PROYECCIÓN SARIMAX */}
      {/* ================================================= */}
      <section id="sarimax" className="screen-full">
        <div className="samsung-split">
          <div className="samsung-text">
            <h2>📈 Proyección SARIMAX</h2>
            <p>
              Modelo SARIMAX aplicado para pronosticar la demanda mensual de dispositivos
              electrónicos, optimizando inventarios y planificación comercial.
            </p>
          </div>

          <img src="/assets/samsung/sarimax.png" alt="SARIMAX Samsung" />
        </div>
      </section>

    </div>
  );
}
