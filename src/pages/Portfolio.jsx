import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaDatabase,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileExcel,
  FaFilePdf,
  FaLanguage,
  FaLayerGroup,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaUniversity,
  FaWhatsapp,
} from "react-icons/fa";
import { SiPython } from "react-icons/si";
import {
  prepareInstantRouteScroll,
  scrollToSection,
} from "../utils/scrollToSection";
import "../styles/base/InicioYPerfil.css";
import "../styles/base/EstructuraGeneral.css";
import "../styles/base/SeccionesContenido.css";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

const technicalAreas = [
  {
    key: "database",
    icon: FaDatabase,
    title: { es: "Bases de datos", en: "Databases" },
    description: {
      es: "SQL Server, SQL y T-SQL para consultas, filtros, agrupaciones, JOIN y extracción de información.",
      en: "SQL Server, SQL, and T-SQL for queries, filters, aggregations, JOIN operations, and information extraction.",
    },
    tags: ["SQL Server", "SQL", "T-SQL", "JOIN"],
  },
  {
    key: "bi",
    icon: FaChartBar,
    title: { es: "Business Intelligence", en: "Business Intelligence" },
    description: {
      es: "Power BI Desktop, DAX básico, creación de dashboards, visualización de datos y diseño de KPI.",
      en: "Power BI Desktop, basic DAX, dashboard creation, data visualization, and KPI design.",
    },
    tags: ["Power BI", "DAX", "Dashboards", "KPI"],
  },
  {
    key: "preparation",
    icon: FaFileExcel,
    title: { es: "Preparación y análisis de datos", en: "Data preparation and analysis" },
    description: {
      es: "Microsoft Excel, tablas dinámicas, limpieza, validación, transformación y consolidación de información.",
      en: "Microsoft Excel, pivot tables, data cleaning, validation, transformation, and consolidation.",
    },
    tags: ["Excel", "Tablas dinámicas", "Limpieza", "Validación"],
  },
  {
    key: "modeling",
    icon: FaLayerGroup,
    title: { es: "Modelado e integración", en: "Modeling and integration" },
    description: {
      es: "Modelado relacional y dimensional, esquema estrella, Data Warehouse y procesos ETL.",
      en: "Relational and dimensional modeling, star schema, Data Warehouse, and ETL processes.",
    },
    tags: ["Data Warehouse", "ETL", "Esquema estrella", "OLAP"],
  },
  {
    key: "programming",
    icon: SiPython,
    title: { es: "Programación para datos", en: "Data programming" },
    description: {
      es: "Python básico para análisis de información y modelos de pronóstico con SARIMAX.",
      en: "Basic Python for information analysis and SARIMAX forecasting models.",
    },
    tags: ["Python", "Análisis", "Series temporales", "SARIMAX"],
  },
  {
    key: "web",
    icon: FaCode,
    title: { es: "Desarrollo complementario", en: "Complementary development" },
    description: {
      es: "React, Vite, control de versiones con Git y despliegue del portafolio mediante GitHub Pages.",
      en: "React, Vite, Git version control, and portfolio deployment through GitHub Pages.",
    },
    tags: ["React", "Vite", "Git", "GitHub Pages"],
  },
];

const certificates = [
  {
    image: "assets/cert1.png",
    pdf: "pdf/Cert1.pdf",
    title: "Power BI Intensivo",
    issuer: "IDAT",
    detail: { es: "Formación en Power BI · 32 horas académicas", en: "Power BI training · 32 academic hours" },
  },
  {
    image: "assets/cert5.png",
    pdf: "pdf/Cert5.pdf",
    title: "Especialista en Excel",
    issuer: "IDAT",
    detail: { es: "Especialización en Microsoft Excel · 72 horas académicas", en: "Microsoft Excel specialization · 72 academic hours" },
  },
  {
    image: "assets/cert2.png",
    pdf: "pdf/Cert2.pdf",
    title: "Tablas dinámicas empresariales",
    issuer: "CAMCOP",
    detail: { es: "Aplicación empresarial de tablas dinámicas", en: "Business application of pivot tables" },
  },
  {
    image: "assets/cert3.png",
    pdf: "pdf/Cert3.pdf",
    title: "Power BI DAX",
    issuer: "Udemy",
    detail: { es: "Funciones DAX para análisis y modelado", en: "DAX functions for analysis and modeling" },
  },
];


function Portfolio() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es",
  );
  const [certificateIndex, setCertificateIndex] = useState(0);

  const copy = useMemo(
    () => ({
      es: {
        profileEyebrow: "PORTAFOLIO PROFESIONAL",
        fullName: "Jersson Jair Fernández Uchuya",
        role: "Practicante preprofesional de Datos",
        stack: "SQL · Power BI · Excel",
        profileDescription:
          "Estudiante de 10.° ciclo de Ingeniería de Sistemas e Informática, orientado al análisis de datos y Business Intelligence. Disponible para convenio de prácticas.",
        location: "Lima, Perú",
        available: "Disponible para prácticas",
        projectsButton: "Proyecto",
        downloadCv: "Descargar CV",
        contact: "Contáctame",
        cycleNumber: "10.°",
        cycleText: "Ciclo de Ingeniería de Sistemas e Informática",
        focusLabel: "Enfoque",
        focusValue: "Datos y Business Intelligence",
        featuredLabel: "Proyecto destacado",
        featuredValue: "Data Warehouse · ETL · Power BI · SARIMAX",
        aboutEyebrow: "PERFIL PROFESIONAL",
        aboutTitle: "Formación técnica orientada a generar valor desde los datos",
        aboutDescription:
          "Cuento con experiencia académica utilizando SQL Server, T-SQL, Power BI, DAX, Excel y Python para la preparación, transformación, modelado y visualización de información. He participado en un proyecto de Data Warehouse que incluyó procesos ETL, dashboards, KPI, segmentación de clientes y pronóstico de ingresos.",
        objective: "Objetivo profesional",
        objectiveText:
          "Incorporarme al área de datos o Business Intelligence como practicante preprofesional, seguir desarrollando mis capacidades y contribuir con soluciones analíticas claras y confiables.",
        education: "Educación",
        university: "Universidad Tecnológica del Perú",
        degree: "Ingeniería de Sistemas e Informática",
        cycle: "10.° ciclo",
        period: "Mar. 2021 - actualidad",
        languages: "Idiomas",
        spanish: "Español · Nativo",
        portuguese: "Portugués · C1",
        english: "Inglés · A2",
        internshipArea: "Prácticas preprofesionales · Datos / BI",
        toolsEyebrow: "HABILIDADES TÉCNICAS",
        toolsTitle: "Competencias alineadas al perfil de datos",
        toolsDescription:
          "Presento las capacidades por área de trabajo, sin niveles inflados y con el alcance técnico que realmente he aplicado durante mi formación.",
        projectEyebrow: "PROYECTO ACADÉMICO DESTACADO",
        projectTitle: "Solución de Business Intelligence para gestión de estacionamientos",
        projectContext: "UTP · Proyecto académico grupal",
        projectPeriod: "Mar. 2025 - Ago. 2025",
        projectStack: "SQL Server · T-SQL · Power BI · Python",
        projectIntro:
          "Participé en el desarrollo de una solución integral para consolidar datos operativos, construir un modelo analítico y generar información útil sobre clientes, visitas, ingresos, horarios, locales y distribución geográfica.",
        projectCompleted: "Proyecto completado",
        contributions: "Contribuciones principales",
        projectPoints: [
          "Construcción de un Data Warehouse con una tabla de hechos y nueve dimensiones.",
          "Implementación de procesos ETL en T-SQL para integrar archivos mensuales, limpiar y estandarizar datos, tratar valores nulos y calcular indicadores.",
          "Desarrollo de cuatro páginas de análisis en Power BI con KPI de clientes, visitas, ingresos, horarios, locales y distribución geográfica.",
          "Aplicación de segmentación RFM en tres grupos de clientes y un modelo SARIMAX para pronosticar 12 meses de ingresos.",
        ],
        projectMetrics: [
          ["1", "tabla de hechos"],
          ["9", "dimensiones"],
          ["4", "páginas Power BI"],
          ["3", "segmentos RFM"],
          ["12", "meses pronosticados"],
        ],
        exploreProject: "Explorar el caso completo",
        projectNote:
          "Incluye ETL, modelo dimensional, cubo OLAP, dashboard y pronóstico SARIMAX.",
        certEyebrow: "FORMACIÓN COMPLEMENTARIA",
        certTitle: "Certificados técnicos relevantes",
        certDescription:
          "Credenciales vinculadas directamente con el perfil presentado en mi CV: Power BI, Excel, tablas dinámicas y DAX.",
        issuedBy: "Institución",
        detailLabel: "Detalle",
        openCertificate: "Abrir certificado",
        previous: "Certificado anterior",
        next: "Siguiente certificado",
        contactTitle: "Contacto profesional",
        contactText:
          "Disponible para oportunidades de prácticas preprofesionales en datos y Business Intelligence.",
      },
      en: {
        profileEyebrow: "PROFESSIONAL PORTFOLIO",
        fullName: "Jersson Jair Fernández Uchuya",
        role: "Pre-professional Data Intern",
        stack: "SQL · Power BI · Excel",
        profileDescription:
          "10th-semester Systems and Computer Engineering student focused on data analysis and Business Intelligence. Available for an internship agreement.",
        location: "Lima, Peru",
        available: "Available for internships",
        projectsButton: "Project",
        downloadCv: "Download CV",
        contact: "Contact me",
        cycleNumber: "10th",
        cycleText: "Semester of Systems and Computer Engineering",
        focusLabel: "Focus",
        focusValue: "Data and Business Intelligence",
        featuredLabel: "Featured project",
        featuredValue: "Data Warehouse · ETL · Power BI · SARIMAX",
        aboutEyebrow: "PROFESSIONAL PROFILE",
        aboutTitle: "Technical training focused on creating value from data",
        aboutDescription:
          "I have academic experience using SQL Server, T-SQL, Power BI, DAX, Excel, and Python for data preparation, transformation, modeling, and visualization. I participated in a Data Warehouse project that included ETL processes, dashboards, KPIs, customer segmentation, and revenue forecasting.",
        objective: "Professional objective",
        objectiveText:
          "Join a data or Business Intelligence team as a pre-professional intern, continue developing my skills, and contribute with clear and reliable analytical solutions.",
        education: "Education",
        university: "Technological University of Peru",
        degree: "Systems and Computer Engineering",
        cycle: "10th semester",
        period: "Mar. 2021 - present",
        languages: "Languages",
        spanish: "Spanish · Native",
        portuguese: "Portuguese · C1",
        english: "English · A2",
        internshipArea: "Pre-professional internship · Data / BI",
        toolsEyebrow: "TECHNICAL SKILLS",
        toolsTitle: "Skills aligned with a data profile",
        toolsDescription:
          "Capabilities are organized by work area and describe the technical scope I have actually applied during my education.",
        projectEyebrow: "FEATURED ACADEMIC PROJECT",
        projectTitle: "Business Intelligence solution for parking management",
        projectContext: "UTP · Group academic project",
        projectPeriod: "Mar. 2025 - Aug. 2025",
        projectStack: "SQL Server · T-SQL · Power BI · Python",
        projectIntro:
          "I participated in an end-to-end solution to consolidate operational data, build an analytical model, and produce insights about customers, visits, revenue, schedules, locations, and geographic distribution.",
        projectCompleted: "Completed project",
        contributions: "Main contributions",
        projectPoints: [
          "Built a Data Warehouse with one fact table and nine dimensions.",
          "Implemented T-SQL ETL processes to integrate monthly files, clean and standardize data, handle null values, and calculate indicators.",
          "Developed four Power BI analysis pages with KPIs for customers, visits, revenue, schedules, locations, and geographic distribution.",
          "Applied RFM segmentation to three customer groups and a SARIMAX model to forecast 12 months of revenue.",
        ],
        projectMetrics: [
          ["1", "fact table"],
          ["9", "dimensions"],
          ["4", "Power BI pages"],
          ["3", "RFM segments"],
          ["12", "forecast months"],
        ],
        exploreProject: "Explore the full case",
        projectNote:
          "Includes ETL, dimensional model, OLAP cube, dashboard, and SARIMAX forecast.",
        certEyebrow: "COMPLEMENTARY EDUCATION",
        certTitle: "Relevant technical certificates",
        certDescription:
          "Credentials directly connected to the profile presented in my resume: Power BI, Excel, pivot tables, and DAX.",
        issuedBy: "Institution",
        detailLabel: "Details",
        openCertificate: "Open certificate",
        previous: "Previous certificate",
        next: "Next certificate",
        contactTitle: "Professional contact",
        contactText:
          "Available for pre-professional internship opportunities in data and Business Intelligence.",
      },
    }),
    [],
  );

  const content = copy[language];
  const activeCertificate = certificates[certificateIndex];

  useEffect(() => {
    const handleLanguageChange = (event) => setLanguage(event.detail);
    window.addEventListener("languageChange", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChange", handleLanguageChange);
  }, []);

  const scrollRestoredRef = useRef(false);

  useLayoutEffect(() => {
    // En una recarga normal no se toca el scroll: Chrome restaura de forma
    // nativa la posición exacta y evita el desplazamiento acumulativo.
    if (scrollRestoredRef.current) return;
    scrollRestoredRef.current = true;

    window.history.scrollRestoration = "auto";

    const requestedSection = localStorage.getItem("goToSection");

    if (requestedSection) {
      localStorage.removeItem("goToSection");
      scrollToSection(requestedSection, { behavior: "instant" });
    }
  }, []);

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
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handlePrevCertificate = () => {
    setCertificateIndex((current) =>
      current === 0 ? certificates.length - 1 : current - 1,
    );
  };

  const handleNextCertificate = () => {
    setCertificateIndex((current) =>
      current === certificates.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="portfolio-page">
      <main>
        <section
          id="home"
          className="portfolio-profile-section"
          style={{ backgroundImage: `url(${assetUrl("assets/bg.jpg")})` }}
        >
          <div className="home-overlay" aria-hidden="true" />

          <div className="home-hero">
            <div className="home-copy">
              <p className="home-eyebrow">{content.profileEyebrow}</p>
              <h1>{content.fullName}</h1>

              <p className="home-role">
                {content.role}
                <span aria-hidden="true"> | </span>
                <strong>{content.stack}</strong>
              </p>

              <p className="home-description">{content.profileDescription}</p>

              <div className="home-meta" aria-label="Disponibilidad profesional">
                <span className="home-status">
                  <i aria-hidden="true" />
                  {content.available}
                </span>
              </div>

              <div className="home-actions">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="home-button home-button-primary"
                >
                  {content.projectsButton}
                  <FaArrowRight aria-hidden="true" />
                </button>

                <a
                  href={assetUrl("Jersson_Fernandez_Practicante_Datos.pdf")}
                  download="Jersson_Fernandez_Practicante_Datos.pdf"
                  className="home-button home-button-secondary"
                >
                  <FaDownload aria-hidden="true" />
                  {content.downloadCv}
                </a>

                <a
                  href="https://wa.me/51938798477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-button home-button-tertiary"
                >
                  <FaWhatsapp aria-hidden="true" />
                  {content.contact}
                </a>
              </div>

              <div
                className="home-contact-strip"
                aria-label={
                  language === "es"
                    ? "Información de contacto"
                    : "Contact information"
                }
              >
                <span className="home-contact-item">
                  <FaMapMarkerAlt aria-hidden="true" />
                  {content.location}
                </span>

                <a
                  href="mailto:jersson.fu@outlook.com"
                  className="home-contact-item"
                >
                  <FaEnvelope aria-hidden="true" />
                  jersson.fu@outlook.com
                </a>

                <a
                  href="https://www.linkedin.com/in/jersson-fernandez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-contact-item"
                >
                  <FaLinkedinIn aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>

            <aside className="home-summary" aria-label="Resumen académico">
              <div className="summary-number">{content.cycleNumber}</div>
              <p>{content.cycleText}</p>
              <div className="summary-divider" />
              <dl>
                <div>
                  <dt>{content.focusLabel}</dt>
                  <dd>{content.focusValue}</dd>
                </div>
                <div>
                  <dt>{content.featuredLabel}</dt>
                  <dd>{content.featuredValue}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="profile" className="portfolio-section profile-section">
          <div className="section-shell profile-layout" data-section-content="true">
            <div className="profile-main reveal">
              <span className="section-kicker">{content.aboutEyebrow}</span>
              <h2>{content.aboutTitle}</h2>
              <p>{content.aboutDescription}</p>

              <div className="profile-objective">
                <span>
                  <FaBriefcase aria-hidden="true" />
                </span>
                <div>
                  <h3>{content.objective}</h3>
                  <p>{content.objectiveText}</p>
                </div>
              </div>
            </div>

            <div className="profile-facts reveal">
              <article className="profile-fact-card">
                <FaUniversity aria-hidden="true" />
                <div>
                  <span>{content.education}</span>
                  <h3>{content.university}</h3>
                  <p>{content.degree}</p>
                  <small>{content.cycle} · {content.period}</small>
                </div>
              </article>

              <article className="profile-fact-card">
                <FaLanguage aria-hidden="true" />
                <div>
                  <span>{content.languages}</span>
                  <h3>{content.spanish}</h3>
                  <p>{content.portuguese}</p>
                  <small>{content.english}</small>
                </div>
              </article>

              <article className="profile-fact-card profile-fact-card--compact">
                <FaCalendarAlt aria-hidden="true" />
                <div>
                  <span>{content.available}</span>
                  <p>{content.internshipArea}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="tools" className="portfolio-section skills-section">
          <div className="section-shell" data-section-content="true">
            <div className="section-heading reveal">
              <span className="section-kicker section-kicker--dark">
                {content.toolsEyebrow}
              </span>
              <h2>{content.toolsTitle}</h2>
              <p>{content.toolsDescription}</p>
            </div>

            <div className="technical-grid">
              {technicalAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <article
                    className="technical-card reveal"
                    key={area.key}
                    style={{ "--card-index": index }}
                  >
                    <div className="technical-card-header">
                      <span className="technical-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="technical-icon">
                        <Icon aria-hidden="true" />
                      </span>
                    </div>
                    <h3>{area.title[language]}</h3>
                    <p>{area.description[language]}</p>
                    <div className="technical-tags">
                      {area.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-section project-section">
          <div className="section-shell" data-section-content="true">
            <div className="section-heading section-heading--left reveal">
              <span className="section-kicker">{content.projectEyebrow}</span>
              <h2>{content.projectTitle}</h2>
            </div>

            <article className="project-case reveal">
              <div className="project-case-summary">
                <div className="project-case-meta">
                  <span>{content.projectContext}</span>
                  <span>{content.projectPeriod}</span>
                </div>
                <h3>Caso Parking</h3>
                <p className="project-stack">{content.projectStack}</p>
                <p className="project-intro">{content.projectIntro}</p>

                <div className="project-metric-grid">
                  {content.projectMetrics.map(([value, label]) => (
                    <div className="project-metric" key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="project-case-actions">
                  <Link
                    to="/caso-parking"
                    className="button-primary"
                    onClick={() => {
                      prepareInstantRouteScroll();
                      sessionStorage.setItem(
                        "caseParkingNavigation",
                        "fromPortfolio",
                      );
                    }}
                  >
                    {content.exploreProject}
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                  <small>{content.projectNote}</small>
                </div>
              </div>

              <div className="project-contributions">
                <div className="project-contributions-header">
                  <span className="project-state">
                    <FaCheck aria-hidden="true" /> {content.projectCompleted}
                  </span>
                  <h3>{content.contributions}</h3>
                </div>
                <ol>
                  {content.projectPoints.map((point, index) => (
                    <li key={point}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{point}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </div>
        </section>

        <section
          id="certificates"
          className="portfolio-section certificates-section"
        >
          <div className="section-shell certificates-showcase-content" data-section-content="true">
            <div className="section-heading section-heading--light reveal certificates-showcase-heading">
              <span className="section-kicker section-kicker--dark">
                {content.certEyebrow}
              </span>
              <h2>{content.certTitle}</h2>
              <p>{content.certDescription}</p>
            </div>

            <div
              className="certificates-showcase reveal"
              aria-live="polite"
            >
              <div className="certificates-showcase-visual">
                <div className="certificates-showcase-preview">
                  <img
                    src={assetUrl(activeCertificate.image)}
                    alt={`${activeCertificate.title} - ${activeCertificate.issuer}`}
                  />
                </div>

                <div
                  className="certificates-showcase-thumbnails"
                  role="tablist"
                  aria-label={
                    language === "es"
                      ? "Seleccionar certificado"
                      : "Select certificate"
                  }
                >
                  {certificates.map((certificate, index) => {
                    const isActive = index === certificateIndex;

                    return (
                      <button
                        key={certificate.title}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`certificates-showcase-thumbnail ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => setCertificateIndex(index)}
                        title={certificate.title}
                      >
                        <img
                          src={assetUrl(certificate.image)}
                          alt=""
                          aria-hidden="true"
                        />
                        <span>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className="certificates-showcase-details">
                <span className="certificates-showcase-count">
                  {String(certificateIndex + 1).padStart(2, "0")} /{" "}
                  {String(certificates.length).padStart(2, "0")}
                </span>

                <span className="certificates-showcase-label">
                  {language === "es" ? "Credencial" : "Credential"}
                </span>

                <h3>{activeCertificate.title}</h3>

                <dl className="certificates-showcase-metadata">
                  <div>
                    <dt>{content.issuedBy}</dt>
                    <dd>{activeCertificate.issuer}</dd>
                  </div>
                  <div>
                    <dt>{content.detailLabel}</dt>
                    <dd>{activeCertificate.detail[language]}</dd>
                  </div>
                </dl>

                <a
                  href={assetUrl(activeCertificate.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificates-showcase-open"
                >
                  <FaFilePdf aria-hidden="true" />
                  <span>{content.openCertificate}</span>
                  <FaExternalLinkAlt aria-hidden="true" />
                </a>

                <div className="certificates-showcase-controls">
                  <button
                    type="button"
                    onClick={handlePrevCertificate}
                    aria-label={content.previous}
                  >
                    <FaChevronLeft aria-hidden="true" />
                  </button>

                  <div
                    className="certificates-showcase-dots"
                    aria-label={
                      language === "es"
                        ? "Posición del certificado"
                        : "Certificate position"
                    }
                  >
                    {certificates.map((certificate, index) => (
                      <button
                        key={certificate.title}
                        type="button"
                        className={
                          index === certificateIndex ? "active" : ""
                        }
                        onClick={() => setCertificateIndex(index)}
                        aria-label={`${
                          language === "es"
                            ? "Mostrar certificado"
                            : "Show certificate"
                        } ${index + 1}`}
                        aria-current={
                          index === certificateIndex ? "true" : undefined
                        }
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextCertificate}
                    aria-label={content.next}
                  >
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Portfolio;
