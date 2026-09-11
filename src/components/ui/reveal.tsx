"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Tracks `prefers-reduced-motion`, staying in sync if the user changes the
 * setting mid-session.
 *
 * `useSyncExternalStore` is the right tool rather than `useState` +
 * `useEffect`: its server snapshot is always `false`, so the SSR markup and
 * the first client render agree (no hydration mismatch), and React then
 * re-renders with the real value.
 */
function useReducedMotion() {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Scroll-reveal wrapper.
 *
 * The fig is a static file, so it carries no motion spec of its own. RIF
 * asked for the rebuild to be animated, so every section enters the same
 * way: a short rise-and-fade on first scroll into view, played once.
 *
 * Deliberately built on IntersectionObserver rather than a scroll handler —
 * it costs nothing off-screen, and unobserving after the first hit means an
 * element never animates twice.
 *
 * Respects `prefers-reduced-motion`: when the user has asked for less
 * motion the content is simply shown, with no transition at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as: Tag = "div",
  className,
  once = true,
}: {
  children: ReactNode;
  /** Stagger, in ms — used to cascade cards within a row. */
  delay?: number;
  /** Distance to rise, in px. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  // Reduced motion shows the content outright; everyone else waits for the
  // observer below.
  const shown = reduced || revealed;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setRevealed(false);
        }
      },
      // Fire a little before the element reaches the fold, so the motion
      // reads as "already underway" rather than starting late.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, reduced]);

  return (
    <Tag
      ref={ref as never}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? undefined : `translateY(${y}px)`,
      }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
