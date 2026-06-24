import { Magnetic } from "./Magnetic";

const WA_URL =
  "https://wa.me/5511925111411?text=" +
  encodeURIComponent(
    "Olá MetaForge, quero contratar os serviços e iniciar um diagnóstico estratégico.",
  );

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-36 lg:py-48">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
          [ 05 ] — Próximo ciclo
        </p>
        <h2 className="mt-6 max-w-[1100px] font-display text-[clamp(2.1rem,7vw,6.5rem)] font-light leading-[1] tracking-[-0.03em] text-bone">
          <span className="text-steel">Se o seu negócio</span> precisa de um
          sistema que <span className="text-bone">não exista ainda</span>, nós o forjamos.
        </h2>

        <div className="mt-12 grid gap-8 border-t border-bone/10 pt-10 sm:mt-14 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
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
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-bone/90 sm:px-8 sm:py-4 sm:text-[11px]"
            >
              Contratar via WhatsApp
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
