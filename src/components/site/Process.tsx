const STEPS = [
  {
    code: "P / 01",
    name: "Diagnóstico",
    body: "Imersão silenciosa. Mapeamos arquitetura, fricções e oportunidades antes de escrever uma linha.",
  },
  {
    code: "P / 02",
    name: "Arquitetura",
    body: "Desenhamos a infraestrutura — modelos de dados, contratos de API, fronteiras de domínio e SLAs.",
  },
  {
    code: "P / 03",
    name: "Forja",
    body: "Engenharia em ciclos curtos com observabilidade desde o dia zero. Releases diários, zero drama.",
  },
  {
    code: "P / 04",
    name: "Operação",
    body: "Mantemos o sistema vivo, evoluindo e medido. Acompanhamento de receita, custo e confiabilidade.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="atmos-glow atmos-glow-warm left-[-15%] top-[20%] h-[50vmax] w-[50vmax] opacity-20" />
        <div className="atmos-glow atmos-glow-cool right-[-10%] bottom-[-10%] h-[55vmax] w-[55vmax] opacity-25" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-40">
        <div className="border-b border-bone/10 pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
            [ 04 ] — Método
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.85rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-bone">
            Um processo. Sem improviso. Sem ruído.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.code} className="glass-panel group relative rounded-sm p-7 sm:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel">
                {s.code}
              </div>
              <h3 className="mt-10 font-display text-3xl font-light tracking-[-0.01em] text-bone sm:text-4xl">
                {s.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-steel">{s.body}</p>
              <span className="absolute right-6 top-6 font-mono text-[10px] text-steel/60 transition-colors group-hover:text-bone">
                ◇
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
