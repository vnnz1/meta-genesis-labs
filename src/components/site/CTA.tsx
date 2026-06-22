import { Magnetic } from "./Magnetic";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink">
      {/* Atmospheric light pools — deep, far, out of focus */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="atmos-glow atmos-glow-cool left-[-10%] top-[-20%] h-[60vmax] w-[60vmax]" />
        <div className="atmos-glow atmos-glow-warm right-[-15%] bottom-[-10%] h-[55vmax] w-[55vmax] opacity-30" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 sm:px-10 sm:py-48">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
          [ 05 ] — Próximo ciclo
        </p>
        <h2 className="relative mt-6 max-w-[1100px] font-display text-[clamp(2.1rem,7vw,6.5rem)] font-light leading-[1] tracking-[-0.03em] text-bone">
          <span aria-hidden className="bloom-soft" />
          <span className="text-steel">Se o seu negócio</span> precisa de um
          sistema que <span className="text-bone">não exista ainda</span>, nós o forjamos.
        </h2>

        <div className="mt-12 grid gap-8 border-t border-bone/10 pt-10 sm:mt-14 sm:gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0 space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel">
              Canal direto
            </div>
            <a
              href="mailto:hello@metaforge.studio"
              className="block break-all font-display text-2xl font-light tracking-[-0.01em] text-bone underline-offset-8 hover:underline sm:text-4xl lg:text-5xl"
            >
              hello@metaforge.studio
            </a>
          </div>

          <Magnetic>
            <a
              href="mailto:hello@metaforge.studio"
              className="group relative inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-bone/90"
            >
              <span aria-hidden className="bloom-cta" />
              Iniciar conversa
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Massive wordmark watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-bone/10"
      >
        <div className="-mb-[0.18em] mt-2 px-2 text-center font-display text-[clamp(5rem,22vw,18rem)] font-light leading-[0.85] tracking-[-0.04em] text-bone/[0.06]">
          METAFORGE
        </div>
      </div>
    </section>
  );
}
