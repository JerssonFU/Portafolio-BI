import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function PlanGamma() {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Plan Gamma</h1>

      <p style={styles.text}>
        Diseñado para usuarios que buscan reforzar temas específicos sin necesidad
        de seguir una ruta completa. Ideal para reforzar habilidades puntuales.
      </p>

      <Link to="/Inicio" style={styles.button}>Volver</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "120px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    animation: "fadeIn 0.6s ease"
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    fontWeight: "bold"
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    lineHeight: "1.6"
  },
  button: {
    textDecoration: "none",
    background: "black",
    padding: "12px 25px",
    borderRadius: "25px",
    color: "white",
    fontSize: "1.1rem"
  }
};
