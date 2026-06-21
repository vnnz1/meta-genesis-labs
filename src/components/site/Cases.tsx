import case01 from "@/assets/case-01.jpg";
import case02 from "@/assets/case-02.jpg";
import case03 from "@/assets/case-03.jpg";

const CASES = [
  {
    code: "CASE / 01",
    sector: "Fintech B2B",
    title: "Plataforma de risco em tempo real",
    body:
      "Substituímos 14 planilhas críticas por um motor de decisão que processa 2.1M de eventos por dia com latência sub-200ms.",
    metrics: [
      ["—83%", "Tempo operacional"],
      ["+R$ 14M", "Receita anual incremental"],
      ["240ms", "Latência média"],
    ],
    image: case01,
  },
  {
    code: "CASE / 02",
    sector: "Infraestrutura SaaS",
    title: "Migração e re-arquitetura para edge",
    body:
      "Re-desenhamos a stack para edge compute multi-região. Custo de cloud cortado pela metade, conversão global em alta.",
    metrics: [
      ["—51%", "Custo de cloud"],
      ["+38%", "Conversão internacional"],
      ["99.99%", "Uptime auditado"],
    ],
    image: case02,
  },
  {
    code: "CASE / 03",
    sector: "Operações com IA",
    title: "Agentes para atendimento corporativo",
    body:
      "Agentes integrados ao CRM resolvem 71% dos tickets sem humano, com auditoria e fallback para especialista treinado.",
    metrics: [
      ["71%", "Tickets autônomos"],
      ["—4.2h", "TMA médio"],
      ["+62 NPS", "Pós-implantação"],
    ],
    image: case03,
  },
];

export function Cases() {
  return (
    <section id="cases" className="relative bg-ink">
      <div className="mx-auto max-w-[1400px] px-6 pt-28 sm:px-10 sm:pt-40">
        <div className="flex items-end justify-between gap-8 border-b border-bone/10 pb-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
              [ 03 ] — Operações em produção
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-bone">
              Resultado é a única forma de design.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-steel sm:block">
            Indicadores auditados com nossos parceiros. Nomes sob NDA — métricas são reais.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="divide-y divide-bone/10 border-b border-bone/10">
          {CASES.map((c, i) => (
            <article
              key={c.code}
              className="group grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-bone/10 bg-graphite">
                <img
                  src={c.image}
                  alt={`Captura do projeto ${c.title}`}
                  loading="lazy"
                  width={1280}
                  height={832}
                  className="h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:grayscale-[60%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/90">
                  {c.code}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel">
                    {c.sector}
                  </p>
                  <h3 className="mt-3 max-w-xl font-display text-3xl font-light leading-[1.1] tracking-[-0.01em] text-bone sm:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel sm:text-base">
                    {c.body}
                  </p>
                </div>

                <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-bone/10 bg-bone/10">
                  {c.metrics.map(([k, v]) => (
                    <div key={v} className="bg-ink px-4 py-5">
                      <dt className="font-display text-2xl font-light text-bone sm:text-3xl">{k}</dt>
                      <dd className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-steel sm:text-[10px]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel lg:col-span-2">
                {String(i + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")} — em produção
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
