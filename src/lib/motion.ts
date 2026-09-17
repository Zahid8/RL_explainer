/** True when the user (or environment) asks for reduced motion. */
export function reduced() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
