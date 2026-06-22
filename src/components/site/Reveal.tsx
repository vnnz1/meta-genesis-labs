import { createElement, useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal — scroll-driven cinematic emergence.
 *
 * Mounts hidden (blurred + lifted + transparent) and toggles
 * `.is-visible` when it crosses the viewport, letting CSS handle
 * the smooth resolve. Default behaviour reveals once; pass
 * `once={false}` to also re-blur as the element leaves the
 * viewport ("disappear into depth" exit).
 */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** "blur" = blur + translateY. "scale" = blur + scale (glass). */
  variant?: "blur" | "scale";
  /** Stagger delay in ms. */
  delay?: number;
  /** Underlying tag — defaults to a div. */
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
  /** Reveal once and stop, or also fade out on exit. */
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  variant = "blur",
  delay = 0,
  as: As = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const base = variant === "scale" ? "mf-reveal-scale" : "mf-reveal";

  return createElement(
    As,
    {
      ref,
      className: `${base} ${className}`.trim(),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
