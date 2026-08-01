/**
 * Desplaza la vista al inicio real de una sección.
 *
 * La sección queda inmediatamente debajo del navbar fijo,
 * sin mostrar contenido de la sección anterior.
 */
export function scrollToSection(sectionId, options = {}) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return false;
  }

  const { behavior = "smooth" } = options;

  window.requestAnimationFrame(() => {
    const navbar = document.querySelector(".navbar");

    const navbarHeight =
      navbar?.getBoundingClientRect().height ?? 72;

    // Se calcula la posición de la sección completa,
    // no la posición de .section-shell.
    const sectionRect = section.getBoundingClientRect();

    const absoluteSectionTop =
      window.scrollY + sectionRect.top;

    // Coloca la sección exactamente debajo del navbar.
    const rawDestination =
      absoluteSectionTop - navbarHeight;

    const maximumScroll = Math.max(
      0,
      document.documentElement.scrollHeight -
        window.innerHeight,
    );

    const destination = Math.min(
      maximumScroll,
      Math.max(0, rawDestination),
    );

    window.scrollTo({
      top: destination,
      behavior,
    });
  });

  return true;
}