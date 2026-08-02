let instantScrollSnapshot = null;
let pendingRestoreFrame = 0;
let pendingRestoreTimer = 0;

function captureInlineStyle(element, property) {
  return {
    value: element.style.getPropertyValue(property),
    priority: element.style.getPropertyPriority(property),
  };
}

function restoreInlineStyle(element, property, snapshot) {
  if (snapshot.value) {
    element.style.setProperty(property, snapshot.value, snapshot.priority);
  } else {
    element.style.removeProperty(property);
  }
}

function enableInstantScrollMode() {
  const root = document.documentElement;
  const body = document.body;

  if (!instantScrollSnapshot) {
    instantScrollSnapshot = {
      rootBehavior: captureInlineStyle(root, "scroll-behavior"),
      bodyBehavior: captureInlineStyle(body, "scroll-behavior"),
      rootSnap: captureInlineStyle(root, "scroll-snap-type"),
      bodySnap: captureInlineStyle(body, "scroll-snap-type"),
      rootAnchor: captureInlineStyle(root, "overflow-anchor"),
      bodyAnchor: captureInlineStyle(body, "overflow-anchor"),
      restoration: window.history.scrollRestoration,
    };
  }

  window.cancelAnimationFrame(pendingRestoreFrame);
  window.clearTimeout(pendingRestoreTimer);

  window.history.scrollRestoration = "manual";

  root.style.setProperty("scroll-behavior", "auto", "important");
  body.style.setProperty("scroll-behavior", "auto", "important");
  root.style.setProperty("scroll-snap-type", "none", "important");
  body.style.setProperty("scroll-snap-type", "none", "important");
  root.style.setProperty("overflow-anchor", "none", "important");
  body.style.setProperty("overflow-anchor", "none", "important");
}

function disableInstantScrollMode() {
  if (!instantScrollSnapshot) return;

  const root = document.documentElement;
  const body = document.body;
  const snapshot = instantScrollSnapshot;

  restoreInlineStyle(root, "scroll-behavior", snapshot.rootBehavior);
  restoreInlineStyle(body, "scroll-behavior", snapshot.bodyBehavior);
  restoreInlineStyle(root, "scroll-snap-type", snapshot.rootSnap);
  restoreInlineStyle(body, "scroll-snap-type", snapshot.bodySnap);
  restoreInlineStyle(root, "overflow-anchor", snapshot.rootAnchor);
  restoreInlineStyle(body, "overflow-anchor", snapshot.bodyAnchor);

  window.history.scrollRestoration = snapshot.restoration || "auto";
  instantScrollSnapshot = null;
}

/**
 * Se ejecuta justo antes de cambiar de ruta cuando el destino debe aparecer
 * directamente en una posición concreta. Evita que el navegador intente
 * restaurar la posición de la ruta anterior o anime el cambio de hash.
 */
export function prepareInstantRouteScroll() {
  enableInstantScrollMode();
}

/**
 * Cambia la posición sin heredar scroll suave, scroll-snap ni scroll anchoring.
 * Repite el valor durante varios frames para impedir que el montaje de la nueva
 * ruta o la carga de fuentes desplace la pantalla después del primer salto.
 */
export function jumpToScrollPosition(top, left = 0, options = {}) {
  const { settleFrames = 4 } = options;
  const targetTop = Math.max(0, Number(top) || 0);
  const targetLeft = Math.max(0, Number(left) || 0);

  enableInstantScrollMode();

  const applyPosition = () => {
    const scrollingElement = document.scrollingElement;

    if (scrollingElement) {
      scrollingElement.scrollTop = targetTop;
      scrollingElement.scrollLeft = targetLeft;
    }

    window.scrollTo(targetLeft, targetTop);
  };

  let remainingFrames = Math.max(1, settleFrames);

  const settle = () => {
    applyPosition();
    remainingFrames -= 1;

    if (remainingFrames > 0) {
      pendingRestoreFrame = window.requestAnimationFrame(settle);
      return;
    }

    // Un último ajuste después de las tareas pendientes del navegador.
    pendingRestoreTimer = window.setTimeout(() => {
      applyPosition();
      disableInstantScrollMode();
    }, 0);
  };

  applyPosition();
  pendingRestoreFrame = window.requestAnimationFrame(settle);
}

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

  const moveToSection = () => {
    const navbar = document.querySelector(".navbar");

    const navbarHeight =
      navbar?.getBoundingClientRect().height ?? 72;

    const sectionRect = section.getBoundingClientRect();
    const absoluteSectionTop = window.scrollY + sectionRect.top;
    const rawDestination = absoluteSectionTop - navbarHeight;

    const maximumScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );

    const destination = Math.min(
      maximumScroll,
      Math.max(0, rawDestination),
    );

    if (behavior === "instant") {
      jumpToScrollPosition(destination);
      return;
    }

    window.scrollTo({
      top: destination,
      behavior,
    });
  };

  if (behavior === "instant") {
    moveToSection();
  } else {
    window.requestAnimationFrame(moveToSection);
  }

  return true;
}
