export const projectAccess = {
  megahilos: import.meta.env.VITE_MEGAHILOS === "true",
  parking: import.meta.env.VITE_PARKING === "true",
  samsung: import.meta.env.VITE_SAMSUNG === "true",
  beta: import.meta.env.VITE_BETA === "true",
  gamma: import.meta.env.VITE_GAMMA === "true",
  delta: import.meta.env.VITE_DELTA === "true"
};
