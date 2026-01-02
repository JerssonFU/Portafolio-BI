import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Portafolio-BI/", // Asegurar que GitHub Pages use la ruta correcta
});
