import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import CasoParking from "./pages/CasoParking";
import "./styles/base/TemaVisual.css";
import "./styles/base/AjustesVisuales.css";
import "./styles/responsive/AjustesResponsiveOriginales.css";
import "./styles/responsive/VistaMovilSecciones.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/caso-parking" element={<CasoParking />} />

        {/* Compatibilidad con enlaces publicados anteriormente. */}
        <Route path="/Inicio" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
