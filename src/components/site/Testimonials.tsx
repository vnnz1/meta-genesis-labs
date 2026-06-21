const QUOTES = [
  {
    code: "T / 01",
    quote:
      "Em quatro meses substituíram uma operação inteira por um sistema. Hoje rodamos com metade do time e o dobro da margem.",
    name: "Carolina Aragão",
    role: "COO · Fintech B2B",
  },
  {
    code: "T / 02",
    quote:
      "Engenharia de outro patamar. Eles entregam o que outras agências prometem em apresentação — só que em produção, auditado e estável.",
    name: "Rafael Menezes",
    role: "CTO · Infraestrutura SaaS",
  },
  {
    code: "T / 03",
    quote:
      "Não contratamos uma agência. Contratamos uma extensão do nosso time técnico. A diferença está em cada decisão de arquitetura.",
    name: "Helena Vieira",
    role: "VP Engineering · Logística",
  },
  {
    code: "T / 04",
    quote:
      "O ROI apareceu no primeiro trimestre. No segundo, viramos referência interna de como um produto digital deve ser construído.",
    name: "Lucas Tavares",
    role: "Founder · Healthtech",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-ink">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 sm:px-10 sm:pt-32 lg:pt-40">
        <div className="flex flex-col gap-6 border-b border-bone/10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
              [ 04 ] — Sinal de campo
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-bone">
              Quem opera com a MetaForge.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-steel">
            Quatro depoimentos de líderes técnicos e fundadores que operam sistemas
            forjados por nós em produção.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10 sm:py-20">
        <div className="grid gap-px overflow-hidden border border-bone/10 bg-bone/10 md:grid-cols-2">
          {QUOTES.map((q) => (
            <figure
              key={q.code}
              className="relative flex flex-col justify-between gap-8 bg-ink p-7 sm:p-10"
            >
              <span
                aria-hidden
                className="font-display text-6xl font-light leading-none text-bone/15 sm:text-7xl"
              >
                “
              </span>
              <blockquote className="font-display text-xl font-light leading-[1.35] tracking-[-0.01em] text-bone sm:text-2xl">
                {q.quote}
              </blockquote>
              <figcaption className="flex items-center justify-between gap-4 border-t border-bone/10 pt-5">
                <div>
                  <div className="font-display text-base font-medium text-bone">{q.name}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
                    {q.role}
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
                  {q.code}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
