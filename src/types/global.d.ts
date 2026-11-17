export {};

declare global {
  interface Window {
    // Set by useScrollToSection so Projects can expand its cards before a programmatic scroll.
    __scrollTarget?: string | null;
  }
}
