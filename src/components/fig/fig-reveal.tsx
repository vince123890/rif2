"use client";

import { useEffect } from "react";

/**
 * Drives the scroll-reveal on the fig canvas.
 *
 * Every node marked `data-fig-reveal` starts lowered and transparent (see
 * globals.css) and is released when this adds `.is-in`. One observer serves
 * the whole page rather than one per node, and each element is unobserved
 * after its first hit so nothing animates twice.
 *
 * Respects `prefers-reduced-motion`: there the CSS already shows everything,
 * and this marks each node immediately so no transition ever runs.
 */
export function FigReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fig-reveal]"),
    );
    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      // fire slightly before the node reaches the fold, so the motion reads
      // as already underway rather than starting late
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
