# Portafolio profesional de Jersson Fernández

Portafolio desarrollado con React y Vite, organizado en una sola página principal con cinco secciones:

1. Inicio
2. Perfil
3. Competencias
4. Proyecto destacado: Caso Parking
5. Certificados

También incluye la página interna del Caso Parking y navegación en español/inglés.

## Cambios incluidos en esta versión

- Franja de contacto debajo de los botones principales con Lima, correo y LinkedIn.
- Tema claro predeterminado con fondos blancos.
- Botón de luna/sol junto al selector de idioma.
- Persistencia del tema elegido mediante `localStorage`.
- Modo oscuro aplicado al portafolio y a la página interna del Caso Parking.
- Se conserva únicamente Caso Parking como proyecto.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Validar el proyecto

```bash
npm run lint
npm run build
```

## Publicar en GitHub Pages

```bash
npm run deploy
```

El repositorio configurado en `package.json` utiliza la ruta de GitHub Pages `/Portafolio-BI/`.
