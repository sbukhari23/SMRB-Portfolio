// ANIMATION_SPEC.md §1. CSS mirrors these via var(--ease) etc. in globals.css.
export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const GSAP_EASE = "expo.out";
export const DUR = {
  micro: 0.15,
  fast: 0.2,
  base: 0.3,
  camera: 0.8,
} as const;
export const STAGGER = { lines: 0.08, codeLines: 0.04 } as const;

export const BOARD_WIDTH = 6000;
export const BOARD_HEIGHT = 3600;
