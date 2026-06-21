import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Wraps any inline-block child to give it a subtle magnetic pull toward
 * the cursor. Intended for primary CTAs and nav links.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      data-magnetic
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      <span ref={ref} className="inline-block transition-transform duration-300 ease-out will-change-transform">
        {children}
      </span>
    </span>
  );
}
