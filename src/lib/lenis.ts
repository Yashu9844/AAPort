import type Lenis from "lenis";

// Single app-wide Lenis instance, created by <SmoothScroll /> in the root layout.
// It stays null when the user prefers reduced motion (native scrolling is used instead).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

// Lock page scroll while an overlay (modal, preloader) is open.
export const lockScroll = (locked: boolean) => {
  if (locked) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
};
