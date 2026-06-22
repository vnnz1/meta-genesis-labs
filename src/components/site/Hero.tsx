import { useEffect, useState } from "react";
import { ForgeCanvas } from "./ForgeCanvas";
import { Magnetic } from "./Magnetic";

const HEADLINE = "Nós construímos a infraestrutura digital da próxima geração.";

function Typewriter({ text }: { text: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) return;
    const t = setTimeout(() => setI(i + 1), 28 + Math.random() * 38);
    return () => clearTimeout(t);
  }, [i, text]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, i)}</span>
      <span
        aria-hidden
        className="ml-[2px] inline-block h-[0.85em] w-[2px] -translate-y-[0.05em] translate-x-0 bg-bone align-middle"
        style={{ animation: "mf-caret 1.05s steps(2) infinite" }}
      />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* ── Z-axis composition ───────────────────────────────────
         Layer 1 — atmospheric glows sit deepest, way out of focus.
         Layer 2 — the 3D forge is pushed back (scale + blur).
         Layer 3 — vignette anchors the type plane.
         Layer 4 — content (in flow, z-10) stays razor sharp.
         ─────────────────────────────────────────────────────── */}

      {/* Atmospheric glow field — large, low-opacity light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="atmos-glow atmos-glow-cool left-[-15%] top-[-10%] h-[55vmax] w-[55vmax]" />
        <div className="atmos-glow atmos-glow-warm right-[-20%] top-[20%] h-[45vmax] w-[45vmax] opacity-25" />
        <div className="atmos-glow atmos-glow-soft left-[20%] bottom-[-20%] h-[60vmax] w-[60vmax]" />
      </div>

      {/* Background 3D forge — pushed into the distance (cinema) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-cine absolute inset-0">
          <ForgeCanvas />
        </div>
        {/* Radial vignette to anchor type */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,transparent_0%,oklch(0.06_0_0/0.55)_55%,oklch(0.06_0_0)_85%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between gap-12 px-5 pb-10 pt-28 sm:gap-16 sm:px-10 sm:pt-40 lg:pt-48">
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-steel sm:text-[11px]">
          <div className="space-y-1">
            <div>// system.online</div>
            <div className="text-bone/70">v.04 — 2026</div>
          </div>
          <div className="hidden text-right sm:block">
            <div>São Paulo · Berlin · Remote</div>
            <div className="text-bone/70">lat —23.5505 / lng —46.6333</div>
          </div>
        </div>

        {/* Headline — sharp foreground, soft bloom behind */}
        <div className="relative max-w-[1100px] py-8 sm:py-20">
          <span aria-hidden className="bloom-soft" />
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
            [ 01 ] — Manifesto
          </p>
          <h1 className="font-display text-[clamp(2rem,6.4vw,5.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-bone">
            <Typewriter text={HEADLINE} />
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-steel sm:mt-8 sm:text-lg">
            Criamos sistemas, plataformas, automações e produtos digitais
            projetados para empresas que pretendem liderar seus mercados.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 rounded-full bg-bone px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-bone/90 sm:px-6 sm:py-3.5 sm:text-[11px]"
              >
                <span aria-hidden className="bloom-cta" />
                Forjar um sistema
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#cases"
                className="inline-flex items-center gap-3 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80 transition-colors hover:text-bone sm:py-3.5 sm:text-[11px]"
              >
                <span className="inline-block h-px w-8 bg-bone/40" />
                Ver operações
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="grid grid-cols-2 gap-px overflow-hidden border-y border-bone/10 bg-bone/10 sm:grid-cols-4">
          {[
            ["48", "Sistemas em produção"],
            ["12M+", "Requisições / mês"],
            ["99.99%", "SLA operacional"],
            ["7", "Mercados atendidos"],
          ].map(([k, v]) => (
            <div key={v} className="bg-ink px-4 py-5 sm:px-6 sm:py-7">
              <div className="font-display text-2xl font-light text-bone sm:text-4xl">{k}</div>
              <div className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-steel sm:text-[10px]">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
