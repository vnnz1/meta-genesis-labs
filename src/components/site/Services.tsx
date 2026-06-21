import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    code: "001",
    name: "Desenvolvimento SaaS",
    headline: "Produtos que escalam de 0 a milhões.",
    body:
      "Arquitetamos plataformas multi-tenant com observabilidade de primeira linha, billing nativo e ciclos de release diários.",
    stack: ["React 19", "TypeScript", "Postgres", "Edge"],
  },
  {
    code: "002",
    name: "Automações Inteligentes",
    headline: "Operações que rodam sozinhas, 24/7.",
    body:
      "Mapeamos cada fricção do seu negócio e a substituímos por agentes determinísticos — sem planilhas, sem retrabalho, sem ruído.",
    stack: ["n8n", "Temporal", "Workers", "APIs"],
  },
  {
    code: "003",
    name: "Inteligência Artificial",
    headline: "IA aplicada a margem, não a hype.",
    body:
      "Modelos próprios, RAG, agentes e copilots integrados ao seu fluxo. Métrica única: dinheiro economizado e receita gerada.",
    stack: ["LLM", "RAG", "Agents", "Vector"],
  },
  {
    code: "004",
    name: "Plataformas Empresariais",
    headline: "Sistemas internos de nível corporativo.",
    body:
      "Portais, ERPs sob medida, painéis de comando e integrações com legado — engenharia que sobrevive ao próximo ciclo.",
    stack: ["SSO", "RBAC", "Audit", "BI"],
  },
  {
    code: "005",
    name: "Web Experiences",
    headline: "Sites que existem em outra liga.",
    body:
      "Experiências cinematográficas que vendem por você — performance Lighthouse 95+, SEO, animação física.",
    stack: ["Three.js", "GSAP", "Lenis", "Edge"],
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  // Drive the active service from scroll position over each panel.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    itemsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="relative bg-ink">
      {/* Section header */}
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-10 sm:pt-40">
        <div className="flex flex-col gap-6 border-b border-bone/10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel sm:text-[11px]">
              [ 02 ] — Operações
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.85rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-bone">
              Cinco disciplinas. Uma única engenharia.
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel sm:text-right">
            {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Sticky split layout */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid gap-10 py-12 sm:gap-12 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left — sticky title board */}
          <div className="lg:sticky lg:top-32 lg:h-[60vh]">
            <div className="space-y-6">
              <div className="overflow-hidden">
                {SERVICES.map((s, i) => (
                  <div
                    key={s.code}
                    aria-hidden={active !== i}
                    className={`transition-all duration-700 ${
                      active === i
                        ? "max-h-[600px] translate-y-0 opacity-100"
                        : "pointer-events-none absolute max-h-0 translate-y-4 opacity-0"
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-steel">
                      {s.code} — Disciplina
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.02] tracking-[-0.02em] text-bone">
                      {s.name}
                    </h3>
                    <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-bone/80">
                      {s.headline}
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-steel">{s.body}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {s.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-bone/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — scroll-driven index list */}
          <ol className="divide-y divide-bone/10 border-y border-bone/10">
            {SERVICES.map((s, i) => (
              <li
                key={s.code}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                data-idx={i}
                className="group relative flex min-h-[40vh] cursor-default items-center py-10"
                onMouseEnter={() => setActive(i)}
              >
                <div
                  className={`absolute inset-y-0 left-0 w-px transition-all duration-500 ${
                    active === i ? "bg-bone" : "bg-transparent"
                  }`}
                />
                <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 pl-6 sm:pl-8">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.32em] transition-colors ${
                      active === i ? "text-bone" : "text-steel"
                    }`}
                  >
                    {s.code}
                  </span>
                  <span
                    className={`font-display text-2xl font-light leading-tight tracking-[-0.01em] transition-colors sm:text-3xl ${
                      active === i ? "text-bone" : "text-steel"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span
                    className={`font-mono text-xl transition-transform ${
                      active === i ? "translate-x-0 text-bone" : "-translate-x-2 text-steel/60"
                    }`}
                  >
                    →
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
