import "../projectstyles/MegahilosSac.css";
import { useEffect } from "react";

export default function MegahilosSAC() {

  // 🔥 Siempre iniciar el proyecto en el top de la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // sin animación para evitar lag
    });
  }, []);

  return (
    <div className="mh-container">

      {/* ================================================= */}
      {/* 1. RESUMEN + OBJETIVOS (PANTALLA COMPLETA)        */}
      {/* ================================================= */}
      <section id="summary" className="mh-screen-full">
        <div className="mh-hero">
          <h1>Megahilos S.A.C</h1>
          <h3>Proyecto empresarial y optimización BI</h3>

          <p>
            Desarrollo de soluciones de Business Intelligence, documentación funcional,
            análisis de procesos y propuestas de optimización dentro de la empresa
            Megahilos S.A.C.
          </p>
        </div>

        <div className="mh-objectives">
          <h2 className="mh-title">🎯 Objetivos del Proyecto</h2>

          <ul className="mh-list">
            <li>Analizar procesos críticos de la empresa.</li>
            <li>Diseñar un modelo de datos eficiente.</li>
            <li>Construir reportes BI para la toma de decisiones.</li>
            <li>Optimizar tiempos y flujos operativos.</li>
            <li>Proponer mejoras de automatización.</li>
          </ul>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2. PROCESO ETL (PANTALLA COMPLETA)                */}
      {/* ================================================= */}
      <section id="etl" className="mh-screen-full">
        <div className="mh-split">
          <div className="mh-text">
            <h2>🔧 Proceso ETL</h2>
            <p>
              Se construyó un proceso ETL para transformar datos operativos en información
              estructurada y confiable, optimizando calidad, consistencia y tiempos de entrega.
            </p>
          </div>

          <img src="/assets/megahilos/etl.png" alt="ETL Megahilos" />
        </div>
      </section>

      {/* ================================================= */}
      {/* 3. CUBO OLAP (PANTALLA COMPLETA)                 */}
      {/* ================================================= */}
      <section id="olap" className="mh-screen-full">
        <div className="mh-split reverse">
          <img src="/assets/megahilos/cubo.png" alt="Cubo OLAP" />

          <div className="mh-text">
            <h2>🧊 Cubo OLAP</h2>
            <p>
              Construcción de un cubo OLAP para análisis multidimensional de ventas,
              clientes y tiempos operativos.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 4. EXPLOTACIÓN DE DATOS (PANTALLA COMPLETA)      */}
      {/* ================================================= */}
      <section id="explotacion" className="mh-screen-full">
        <h2>📊 Explotación de Datos</h2>
        <p>
          Dashboards interactivos para decisiones estratégicas, productividad
          y seguimiento de KPIs clave.
        </p>

        <iframe
          title="Dashboard Megahilos"
          src="https://app.powerbi.com/view?r=xxxxx"
          allowFullScreen
        ></iframe>

        <ul className="mh-list">
          <li>Análisis de ventas.</li>
          <li>KPIs operativos y productivos.</li>
          <li>Evaluación del rendimiento por área.</li>
        </ul>
      </section>

      {/* ================================================= */}
      {/* 5. SARIMAX (PANTALLA COMPLETA)                   */}
      {/* ================================================= */}
      <section id="sarimax" className="mh-screen-full">
        <div className="mh-split">
          <div className="mh-text">
            <h2>📈 Proyección SARIMAX</h2>
            <p>
              Modelo SARIMAX aplicado para proyectar demanda, anticipar necesidades
              operativas y mejorar planificación.
            </p>
          </div>

          <img src="/assets/megahilos/sarimax.png" alt="SARIMAX" />
        </div>
      </section>

    </div>
  );
}
