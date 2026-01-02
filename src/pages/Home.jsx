import "../styles/Home.css";
import { FaFilePdf, FaWhatsapp, FaProjectDiagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="text-container">
        <h1 className="main-title">Jersson Jair Fernández Uchuya</h1>
        <h2 className="sub-title wave-effect">
        📶 Business Intelligence & Data Analyst 🌎
        </h2>
        <p className="simple">
          Aquí podrás ver mis proyectos más recientes y contactarme para cualquier consulta.
        </p>
      </div>
      <div className="buttons-container">
        {/* Botón Ver Proyectos con icono */}
        <button onClick={() => navigate("/Inicio")} className="animated-button">
          <FaProjectDiagram className="button-icon" /> Proyectos
        </button>

        {/* Botón de Descargar CV con icono */}
        <a 
  href="/Portafolio-BI/CV_Jersson_Fernández.pdf"
  download="CV_Jersson_Fernández.pdf" 
  className="cv-download-button animated-button"
>
  <FaFilePdf className="button-icon" /> Descargar CV
</a>



        {/* Botón de WhatsApp con icono mejor alineado */}
        <a 
          href="https://wa.me/938798477" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-link animated-button"
        >
          <FaWhatsapp className="button-icon" /> Contáctame
        </a>
      </div>
    </div>
  );
}

export default Home;
