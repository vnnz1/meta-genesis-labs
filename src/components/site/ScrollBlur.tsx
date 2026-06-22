import { useEffect } from "react";

/**
 * ScrollBlur — continuous depth-of-field on scroll.
 *
 * Every element marked with `.scroll-blur` gets a live blur and
 * opacity tied to its distance from the viewport centre. The
 * effect is symmetrical: content above the fold and below the
 * fold both dissolve into the background, while whatever sits
 * in the middle of the screen is razor-sharp.
 *
 * This produces the "cinematic focus" pass used by Apple, Linear
 * and high-end product sites — the page reads like a tracking
 * shot instead of a static document.
 */
export function ScrollBlur() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const centerY = vh / 2;
      const els = document.querySelectorAll<HTMLElement>(".scroll-blur");

      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const elCenter = r.top + r.height / 2;
        // Normalised distance (0 = centred, ~1 = a full viewport away).
        const dist = Math.abs(elCenter - centerY) / vh;

        // No blur in the focused band (±25% of viewport height),
        // then ramps to a maximum of 14px around the edges.
        const blur = Math.min(14, Math.max(0, (dist - 0.25) * 26));
        // Opacity stays full while close, then floors at 0.35 so
        // distant sections are still visible during fast scrolls.
        const opacity = Math.max(0.35, 1 - Math.max(0, dist - 0.45) * 1.1);

        el.style.setProperty("--sb-blur", `${blur.toFixed(2)}px`);
        el.style.setProperty("--sb-opacity", opacity.toFixed(3));
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
