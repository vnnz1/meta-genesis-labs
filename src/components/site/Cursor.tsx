import { useEffect, useRef, useState } from "react";

/**
 * Lightweight custom cursor — a thin ring that lags behind the pointer
 * and dilates over interactive elements. Hidden on touch devices.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!ringRef.current) return;
      if (t && t.closest("a, button, [data-magnetic], [data-cursor='hover']")) {
        ringRef.current.dataset.state = "hover";
      } else {
        ringRef.current.dataset.state = "idle";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        data-state="idle"
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-bone/70 mix-blend-difference transition-[width,height,margin,border-color] duration-200 ease-out data-[state=hover]:-ml-7 data-[state=hover]:-mt-7 data-[state=hover]:h-14 data-[state=hover]:w-14 data-[state=hover]:border-bone"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-0.5 -mt-0.5 h-1 w-1 rounded-full bg-bone mix-blend-difference"
      />
    </>
  );
}
