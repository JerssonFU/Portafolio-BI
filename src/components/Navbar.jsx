import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBriefcase,
  FaCertificate,
  FaChartLine,
  FaHome,
  FaMoon,
  FaSun,
  FaUser,
} from "react-icons/fa";
import { scrollToSection } from "../utils/scrollToSection";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es",
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light",
  );

  const isProjectPage = location.pathname === "/caso-parking";

  const text = useMemo(
    () => ({
      es: {
        brand: "Jersson Fernández",
        back: "Volver al portafolio",
        home: "Inicio",
        profile: "Perfil",
        tools: "Competencias",
        projects: "Proyecto",
        certificates: "Certificados",
        summary: "Resumen",
        olap: "Modelo OLAP",
        sarimax: "Pronóstico",
        finalSummary: "Resultados",
        openMenu: "Abrir menú",
        closeMenu: "Cerrar menú",
        changeLanguage: "Cambiar idioma",
        darkMode: "Activar modo oscuro",
        lightMode: "Activar modo claro",
      },
      en: {
        brand: "Jersson Fernández",
        back: "Back to portfolio",
        home: "Home",
        profile: "Profile",
        tools: "Skills",
        projects: "Project",
        certificates: "Certificates",
        summary: "Summary",
        olap: "OLAP model",
        sarimax: "Forecast",
        finalSummary: "Results",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        changeLanguage: "Change language",
        darkMode: "Enable dark mode",
        lightMode: "Enable light mode",
      },
    }),
    [],
  );

  const portfolioItems = [
    { id: "home", label: text[language].home, icon: FaHome },
    { id: "profile", label: text[language].profile, icon: FaUser },
    { id: "tools", label: text[language].tools, icon: FaChartLine },
    { id: "projects", label: text[language].projects, icon: FaBriefcase },
    {
      id: "certificates",
      label: text[language].certificates,
      icon: FaCertificate,
    },
  ];

  const projectItems = [
    { id: "summary", label: text[language].summary },
    { id: "olap", label: text[language].olap },
    { id: "sarimax", label: text[language].sarimax },
    { id: "resumen-final", label: text[language].finalSummary },
  ];

  const navItems = isProjectPage ? projectItems : portfolioItems;
  const sectionIds = useMemo(
    () =>
      isProjectPage
        ? ["summary", "olap", "sarimax", "resumen-final"]
        : ["home", "profile", "tools", "projects", "certificates"],
    [isProjectPage],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsOpen(false);
    setActiveSection(isProjectPage ? "summary" : "home");
  }, [isProjectPage, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const navbarHeight =
        document.querySelector(".navbar")?.getBoundingClientRect().height ?? 72;
      const marker =
        window.scrollY + navbarHeight + Math.min(window.innerHeight * 0.3, 230);

      let current = sectionIds[0];
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    window.dispatchEvent(
      new CustomEvent("languageChange", { detail: newLanguage }),
    );
  };

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  };

  const goTo = (id) => {
    setActiveSection(id);
    scrollToSection(id);
    setIsOpen(false);
  };

  const themeLabel =
    theme === "light" ? text[language].darkMode : text[language].lightMode;

  const ThemeIcon = theme === "light" ? FaMoon : FaSun;

  return (
    <>
      <nav className={`navbar ${isProjectPage ? "project-mode" : ""}`}>
        <div className="navbar-inner">
          <div className="navbar-left">
            {isProjectPage ? (
              <Link
                to="/"
                className="navbar-back-btn"
                onClick={() => localStorage.setItem("goToSection", "projects")}
              >
                <span aria-hidden="true">←</span>
                {text[language].back}
              </Link>
            ) : (
              <button
                type="button"
                className="navbar-brand"
                aria-label={text[language].home}
                onClick={() => goTo("home")}
              >
                <span className="brand-mark" aria-hidden="true">
                  JF
                </span>
                <span>{text[language].brand}</span>
              </button>
            )}
          </div>

          <div className="navbar-actions-mobile">
            <button
              type="button"
              className="language-btn language-btn-mobile"
              onClick={toggleLanguage}
              aria-label={text[language].changeLanguage}
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <button
              type="button"
              className="theme-btn theme-btn-mobile"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              aria-pressed={theme === "dark"}
            >
              <ThemeIcon aria-hidden="true" />
            </button>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsOpen((current) => !current)}
              aria-label={
                isOpen ? text[language].closeMenu : text[language].openMenu
              }
              aria-expanded={isOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className={`navbar-right ${isOpen ? "open" : ""}`}>
            <div className="mobile-menu-header">
              <span>{text[language].brand}</span>
              <button
                type="button"
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label={text[language].closeMenu}
              >
                ×
              </button>
            </div>

            <div className="navbar-segments" aria-label="Navegación principal">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`navbar-link ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => goTo(item.id)}
                    aria-current={
                      activeSection === item.id ? "page" : undefined
                    }
                  >
                    {Icon && <Icon className="menu-icon" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="language-btn language-btn-desktop"
              onClick={toggleLanguage}
              aria-label={text[language].changeLanguage}
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <button
              type="button"
              className="theme-btn theme-btn-desktop"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              aria-pressed={theme === "dark"}
            >
              <ThemeIcon aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <button
          type="button"
          className="navbar-backdrop"
          onClick={() => setIsOpen(false)}
          aria-label={text[language].closeMenu}
        />
      )}
    </>
  );
}

export default Navbar;
