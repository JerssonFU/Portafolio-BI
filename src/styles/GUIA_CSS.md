# Organización de estilos

## `styles/Navbar.css`

Archivo original de la barra de navegación. No fue renombrado ni modificado.

## `styles/base/`

Contiene únicamente reglas generales, sin bloques `@media`:

- `TemaVisual.css`: colores, modo claro/oscuro y apariencia global.
- `InicioYPerfil.css`: portada, resumen académico y perfil profesional.
- `EstructuraGeneral.css`: contenedores, secciones, botones y pie de página.
- `SeccionesContenido.css`: competencias, proyecto y certificados.
- `AjustesVisuales.css`: ajustes generales y acabados visuales existentes.

## `styles/responsive/`

Contiene solamente reglas adaptativas:

- `AjustesResponsiveOriginales.css`: conserva los bloques `@media` del proyecto original.
- `VistaMovilSecciones.css`: ajustes finales para que cada apartado se vea como una pantalla clara en celulares.

Los últimos ajustes están en `VistaMovilSecciones.css` para que sea fácil localizar y modificar la versión móvil sin tocar el CSS base.

## `projectstyles/`

Los estilos de Caso Parking están separados en:

- `base/CasoParkingBase.css`
- `responsive/CasoParkingResponsive.css`
