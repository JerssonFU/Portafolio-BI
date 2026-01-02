import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { projectAccess } from "./utils/projectGuard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageWithNavbar from "./pages/PageWithNavbar";

/* Proyectos principales */
import MegahilosSAC from "./pages/MegahilosSAC";
import CasoParking from "./pages/CasoParking";
import CasoSamsung from "./pages/CasoSamsung";

/* Otros planes */
import PlanBeta from "./pages/PlanBeta";
import PlanGamma from "./pages/PlanGamma";
import PlanDelta from "./pages/PlanDelta";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inicio" element={<PageWithNavbar />} />

        <Route
          path="/megahilos"
          element={projectAccess.megahilos ? <MegahilosSAC /> : <Navigate to="/Inicio" replace />}
        />

        <Route
          path="/caso-parking"
          element={projectAccess.parking ? <CasoParking /> : <Navigate to="/Inicio" replace />}
        />

        <Route
          path="/caso-samsung"
          element={projectAccess.samsung ? <CasoSamsung /> : <Navigate to="/Inicio" replace />}
        />

        <Route
          path="/plan-beta"
          element={projectAccess.beta ? <PlanBeta /> : <Navigate to="/Inicio" replace />}
        />

        <Route
          path="/plan-gamma"
          element={projectAccess.gamma ? <PlanGamma /> : <Navigate to="/Inicio" replace />}
        />

        <Route
          path="/plan-delta"
          element={projectAccess.delta ? <PlanDelta /> : <Navigate to="/Inicio" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
