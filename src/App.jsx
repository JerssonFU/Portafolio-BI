import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import CasoParking from "./pages/CasoParking";
import "./styles/Theme.css";
import "./styles/ResponsiveLayout.css";

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
