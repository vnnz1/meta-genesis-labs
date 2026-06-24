import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ---------------------------------------------------------------
 * METAFORGE AI REVENUE ENGINE™
 * Proprietary inference-engine experience. Terminal aesthetic in
 * the spirit of Apple / Linear / Stripe / Vercel / OpenAI.
 * Pure monochrome — no neon, no cyberpunk.
 * ------------------------------------------------------------- */

type NicheKey =
  | "advocacia"
  | "clínica médica"
  | "imobiliária"
  | "restaurante"
  | "academia"
  | "contabilidade"
  | "estética"
  | "e-commerce"
  | "engenharia"
  | "arquitetura";

const NICHES: NicheKey[] = [
  "advocacia",
  "clínica médica",
  "imobiliária",
  "restaurante",
  "academia",
  "contabilidade",
  "estética",
  "e-commerce",
  "engenharia",
  "arquitetura",
];

const BOOT_LINES = [
  "> conectando banco de dados setorial...",
  "> analisando comportamento de mercado...",
  "> processando oportunidades ocultas...",
  "> avaliando concorrência digital...",
  "> calculando eficiência operacional...",
  "> gerando projeção estratégica...",
];

/** Stable, plausible per-niche projections. */
const NICHE_DATA: Record<
  string,
  {
    growth: number; // %
    saving: number; // R$
    revenue: number; // R$
    efficiency: number; // %
    investmentTraditional: number;
    investmentMetaforge: number;
    summary: (n: string) => string;
  }
> = {
  advocacia: {
    growth: 38, saving: 42800, revenue: 318000, efficiency: 71,
    investmentTraditional: 92000, investmentMetaforge: 18900,
    summary: () =>
      "Empresas do segmento jurídico normalmente desperdiçam entre 18% e 35% do tempo operacional em tarefas repetitivas. Com automação inteligente, captura de leads e otimização da experiência digital, existe potencial real para multiplicar oportunidades comerciais e reduzir custos administrativos.",
  },
  "clínica médica": {
    growth: 44, saving: 56400, revenue: 412000, efficiency: 76,
    investmentTraditional: 110000, investmentMetaforge: 22400,
    summary: () =>
      "Clínicas perdem em média 27% dos agendamentos por falhas de follow-up, fricção no atendimento e ausência de jornada digital estruturada. Automação de pré-atendimento, captação ativa e CRM clínico desbloqueiam receita recorrente.",
  },
  imobiliária: {
    growth: 52, saving: 71200, revenue: 624000, efficiency: 69,
    investmentTraditional: 138000, investmentMetaforge: 24800,
    summary: () =>
      "Imobiliárias operam, em média, com 41% dos leads sem qualquer follow-up estruturado. Plataformas com IA conversacional, scoring e distribuição inteligente elevam a taxa de fechamento em múltiplos dígitos.",
  },
  restaurante: {
    growth: 31, saving: 28900, revenue: 196000, efficiency: 64,
    investmentTraditional: 64000, investmentMetaforge: 12400,
    summary: () =>
      "Operações de food service ainda dependem de canais fragmentados. Centralização de pedidos, fidelização orientada por dados e automações de marketing local geram ganho operacional imediato.",
  },
  academia: {
    growth: 36, saving: 33500, revenue: 248000, efficiency: 68,
    investmentTraditional: 72000, investmentMetaforge: 14600,
    summary: () =>
      "Academias possuem churn médio entre 38% e 52% ao ano. Inteligência preditiva de evasão, jornadas digitais personalizadas e CRM esportivo recuperam receita silenciosamente perdida.",
  },
  contabilidade: {
    growth: 41, saving: 47600, revenue: 286000, efficiency: 78,
    investmentTraditional: 88000, investmentMetaforge: 17200,
    summary: () =>
      "Escritórios contábeis ainda gastam até 40% do tempo em tarefas repetitivas. Automação fiscal, agentes de IA para atendimento e portais inteligentes elevam margem operacional drasticamente.",
  },
  estética: {
    growth: 47, saving: 38900, revenue: 312000, efficiency: 73,
    investmentTraditional: 76000, investmentMetaforge: 16400,
    summary: () =>
      "Clínicas de estética perdem receita em três pontos: agendamento, retenção e upsell. Uma jornada digital estruturada com IA de relacionamento transforma cada cliente em ciclo recorrente.",
  },
  "e-commerce": {
    growth: 58, saving: 84200, revenue: 712000, efficiency: 81,
    investmentTraditional: 156000, investmentMetaforge: 28600,
    summary: () =>
      "E-commerces operam com taxas médias de conversão abaixo de 1,8%. Personalização em tempo real, recuperação ativa de carrinho com IA e otimização de funil elevam margem com baixo CAC.",
  },
  engenharia: {
    growth: 34, saving: 62800, revenue: 388000, efficiency: 66,
    investmentTraditional: 124000, investmentMetaforge: 21800,
    summary: () =>
      "Empresas de engenharia normalmente carecem de infraestrutura digital para gestão de propostas, leads B2B e acompanhamento de obra. Plataformas internas sob medida desbloqueiam escala.",
  },
  arquitetura: {
    growth: 39, saving: 36400, revenue: 264000, efficiency: 70,
    investmentTraditional: 78000, investmentMetaforge: 15800,
    summary: () =>
      "Escritórios de arquitetura ainda dependem de processos manuais para captação e qualificação. Presença digital cinematográfica somada a automação posiciona o estúdio em outra liga competitiva.",
  },
};

const DEFAULT_DATA = {
  growth: 42, saving: 48000, revenue: 364000, efficiency: 74,
  investmentTraditional: 96000, investmentMetaforge: 19200,
  summary: (n: string) =>
    `Negócios do segmento "${n}" geralmente operam com 20% a 35% da capacidade ociosa em processos repetitivos. Automação inteligente, IA aplicada e experiência digital de alto padrão liberam receita oculta e reduzem custo operacional.`,
};

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}

/** Animated count-up using framer-motion springs. */
function Counter({ value, prefix = "", suffix = "", duration = 1.8 }: {
  value: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 });
  const display = useTransform(spring, (v) =>
    `${prefix}${formatBRL(Math.round(v))}${suffix}`,
  );
  useEffect(() => {
    mv.set(0);
    const t = setTimeout(() => mv.set(value), 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);
  return <motion.span>{display}</motion.span>;
}

/** SVG projection chart — Situação Atual vs Projeção MetaForge. */
function ProjectionChart({ growth }: { growth: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // Build two normalized series.
  const { current, projected, pathCurrent, pathProjected, area } = useMemo(() => {
    const months = 12;
    const base = 40;
    const current = Array.from({ length: months }, (_, i) =>
      base + i * 1.4 + Math.sin(i * 0.7) * 2,
    );
    const projected = current.map((v, i) =>
      v * (1 + (growth / 100) * (i / (months - 1))),
    );
    const W = 800, H = 240, padX = 24, padY = 24;
    const all = [...current, ...projected];
    const min = Math.min(...all), max = Math.max(...all);
    const xs = (i: number) => padX + (i * (W - padX * 2)) / (months - 1);
    const ys = (v: number) =>
      H - padY - ((v - min) / (max - min || 1)) * (H - padY * 2);
    const toPath = (arr: number[]) =>
      arr.map((v, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");
    const pathProjected = toPath(projected);
    const areaPath = `${pathProjected} L${xs(months - 1).toFixed(1)},${H - padY} L${xs(0).toFixed(1)},${H - padY} Z`;
    return { current, projected, pathCurrent: toPath(current), pathProjected, area: areaPath };
  }, [growth]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 800 240"
      className="h-[180px] w-full sm:h-[240px]"
      preserveAspectRatio="none"
      aria-label="Projeção MetaForge vs situação atual"
    >
      {/* grid */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1="24" x2="776" y1={24 + p * 192} y2={24 + p * 192} />
        ))}
      </g>
      {/* current — steel dashed */}
      <motion.path
        d={pathCurrent}
        fill="none"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1.25"
        strokeDasharray="4 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* projection area */}
      <motion.path
        d={area}
        fill="url(#mf-grad)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.4 }}
      />
      {/* projection line — pure bone */}
      <motion.path
        d={pathProjected}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      <defs>
        <linearGradient id="mf-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* marker dot on last projected */}
      <motion.circle
        cx="776"
        cy={(() => {
          const last = projected[projected.length - 1];
          const all = [...current, ...projected];
          const min = Math.min(...all), max = Math.max(...all);
          return 240 - 24 - ((last - min) / (max - min || 1)) * (240 - 48);
        })()}
        r="3"
        fill="#FFFFFF"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.4 }}
      />
    </svg>
  );
}

const OPPORTUNITIES = [
  "Automatização de atendimento",
  "Captação digital",
  "Conversão de leads",
  "Follow-up inteligente",
  "Agendamento automatizado",
  "Integração CRM",
  "Inteligência operacional",
];

type Phase = "idle" | "running" | "result";

export function AIRevenueEngine() {
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [printed, setPrinted] = useState<string[]>([]);
  const [partial, setPartial] = useState("");
  const [analyzedNiche, setAnalyzedNiche] = useState<string>("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const data = useMemo(() => {
    const key = analyzedNiche.trim().toLowerCase();
    return NICHE_DATA[key] ?? { ...DEFAULT_DATA };
  }, [analyzedNiche]);

  // Typewriter sequence.
  useEffect(() => {
    if (phase !== "running") return;
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= BOOT_LINES.length) {
        setTimeout(() => !cancelled && setPhase("result"), 320);
        return;
      }
      const line = BOOT_LINES[lineIdx];
      if (charIdx <= line.length) {
        setPartial(line.slice(0, charIdx));
        charIdx++;
        setTimeout(tick, 14 + Math.random() * 12);
      } else {
        setPrinted((p) => [...p, line]);
        setPartial("");
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 140);
      }
    };
    tick();
    return () => { cancelled = true; };
  }, [phase]);

  const startAnalysis = () => {
    if (phase === "running") return;
    const niche = value.trim() || "empresas em geral";
    setAnalyzedNiche(niche);
    setPrinted([]);
    setPartial("");
    setPhase("running");
  };

  const resetAnalysis = () => {
    setPhase("idle");
    setPrinted([]);
    setPartial("");
  };

  const waLink = `https://wa.me/5511925111411?text=${encodeURIComponent(
    "Olá, realizei a análise da MetaForge AI Revenue Engine e gostaria de receber um diagnóstico estratégico personalizado.",
  )}`;

  return (
    <section
      id="ai-revenue-engine"
      ref={sectionRef}
      className="relative bg-[#050505] py-16 sm:py-24 lg:py-36"
      style={{ ["--mf-card" as string]: "#0A0A0A", ["--mf-line" as string]: "rgba(255,255,255,0.08)" }}
    >
      {/* Ambient glow — extremely subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A] sm:text-[11px]">
            [ proprietary ] — inference engine
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.04] tracking-[-0.025em] text-white">
            MetaForge AI Revenue Engine
            <span className="ml-1 align-super text-[0.45em] text-[#8A8A8A]">™</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#8A8A8A] sm:text-base">
            Nossa IA analisa seu nicho, identifica gargalos invisíveis e projeta o
            potencial de crescimento da sua empresa através de automação,
            inteligência artificial e experiência digital.
          </p>
        </motion.div>

        {/* Terminal container */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)", scale: 0.985 }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-10 overflow-hidden rounded-2xl border border-[var(--mf-line)] bg-[var(--mf-card)] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:mt-14"
        >
          {/* Terminal chrome */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--mf-line)] px-4 py-3 sm:px-7 sm:py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>
              <span className="ml-1 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A8A8A] sm:ml-2 sm:text-[11px] sm:tracking-[0.22em]">
                meta-genesis :: inference engine
              </span>
            </div>
            <div className="hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8A8A] sm:flex">
              <span className="flex items-center gap-2">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                status: online
              </span>
              <span className="text-[#8A8A8A]/70">version 7.3</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            {/* Input row — visible in idle / running */}
            {phase !== "result" && (
              <div className="mx-auto max-w-2xl">
                <label className="block font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A]">
                  input :: setor / nicho
                </label>
                <div className="mt-3 flex items-stretch gap-1.5 rounded-xl border border-[var(--mf-line)] bg-black/40 p-1.5 transition-colors focus-within:border-white/25">
                  <span className="flex items-center pl-2 font-mono text-sm text-[#8A8A8A] sm:pl-3">›</span>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && startAnalysis()}
                    placeholder="Digite seu nicho..."
                    disabled={phase === "running"}
                    className="min-w-0 flex-1 bg-transparent px-2 py-2.5 font-mono text-[13px] text-white outline-none placeholder:text-[#5a5a5a] disabled:opacity-50 sm:text-sm"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <button
                    onClick={startAnalysis}
                    disabled={phase === "running"}
                    className="group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-black transition-all hover:bg-[#D4D4D4] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[#8A8A8A] sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.28em]"
                  >
                    {phase === "running" ? "analisando" : "analisar"}
                  </button>
                </div>

                {/* Niche chips */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {NICHES.map((n) => (
                    <button
                      key={n}
                      onClick={() => setValue(n)}
                      disabled={phase === "running"}
                      className="rounded-full border border-[var(--mf-line)] bg-white/[0.015] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8A8A] transition-all hover:border-white/25 hover:text-white disabled:opacity-40"
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {phase === "running" && (
                  <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--mf-line)] bg-black/40 p-4 font-mono text-[11.5px] leading-6 text-[#D4D4D4] sm:mt-8 sm:p-5 sm:text-[13px] sm:leading-7">
                    {printed.map((l, i) => (
                      <div key={i} className="text-[#D4D4D4]">{l}</div>
                    ))}
                    {partial && (
                      <div>
                        {partial}
                        <span className="ml-0.5 inline-block h-[1em] w-[6px] -translate-y-[2px] bg-white align-middle [animation:mf-caret_1s_steps(2)_infinite]" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Result */}
            {phase === "result" && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10 sm:space-y-12"
              >
                <div className="flex flex-col gap-4 border-b border-[var(--mf-line)] pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A]">
                      analysis :: complete
                    </p>
                    <p className="mt-2 font-display text-xl font-light text-white sm:text-2xl">
                      Diagnóstico para{" "}
                      <span className="text-[#D4D4D4]">{analyzedNiche}</span>
                    </p>
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="self-start rounded-lg border border-[var(--mf-line)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8A8A8A] transition-colors hover:border-white/25 hover:text-white"
                  >
                    nova análise
                  </button>
                </div>

                {/* 4 KPI tiles */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
                  {[
                    { label: "Potencial de crescimento", value: <Counter value={data.growth} prefix="+" suffix="%" /> },
                    { label: "Economia operacional", value: <Counter value={data.saving} prefix="R$ " /> },
                    { label: "Receita adicional anual", value: <Counter value={data.revenue} prefix="R$ " /> },
                    { label: "Eficiência operacional", value: <Counter value={data.efficiency} suffix="%" /> },
                  ].map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl border border-[var(--mf-line)] bg-black/40 p-4 sm:p-5 lg:p-6"
                    >
                      <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8A8A8A] sm:text-[10px] sm:tracking-[0.28em]">
                        {kpi.label}
                      </div>
                      <div className="mt-3 font-display text-[clamp(1.35rem,4.5vw,2.4rem)] font-light leading-none tracking-[-0.02em] text-white sm:mt-4">
                        {kpi.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Executive summary */}
                <div className="rounded-xl border border-[var(--mf-line)] bg-black/40 p-5 sm:p-7 lg:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A]">
                    análise executiva
                  </p>
                  <p className="mt-4 max-w-3xl text-[14px] font-light leading-relaxed text-[#D4D4D4] sm:text-base">
                    {data.summary(analyzedNiche)}
                  </p>
                </div>

                {/* Chart */}
                <div className="rounded-xl border border-[var(--mf-line)] bg-black/40 p-5 sm:p-7 lg:p-8">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A]">
                        projeção :: 12 meses
                      </p>
                      <p className="mt-2 font-display text-lg font-light text-white sm:text-xl">
                        Situação atual vs Projeção MetaForge
                      </p>
                    </div>
                    <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8A8A]">
                      <span className="flex items-center gap-2">
                        <span className="h-px w-6 border-t border-dashed border-white/40" />
                        atual
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-px w-6 bg-white" />
                        metaforge
                      </span>
                    </div>
                  </div>
                  <ProjectionChart growth={data.growth} />
                </div>

                {/* Opportunities */}
                <div className="rounded-xl border border-[var(--mf-line)] bg-black/40 p-5 sm:p-7 lg:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A]">
                    oportunidades identificadas
                  </p>
                  <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {OPPORTUNITIES.map((op, i) => (
                      <motion.li
                        key={op}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                        className="flex items-center gap-3 text-[14px] font-light text-[#D4D4D4]"
                      >
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.25 + i * 0.08, type: "spring", stiffness: 200, damping: 14 }}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
                        >
                          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M2.5 6.5 L5 9 L9.5 3.5" />
                          </svg>
                        </motion.span>
                        {op}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* ROI estimation */}
                <div className="rounded-xl border border-[var(--mf-line)] bg-gradient-to-b from-white/[0.025] to-transparent p-5 sm:p-8 lg:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8A8A8A]">
                    estimativa de retorno
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-8 lg:gap-10">
                    {[
                      { l: "Investimento tradicional", v: `R$ ${formatBRL(data.investmentTraditional)}`, dim: true },
                      { l: "MetaForge Performance System", v: `R$ ${formatBRL(data.investmentMetaforge)}` },
                      { l: "Economia estimada", v: `R$ ${formatBRL(data.investmentTraditional - data.investmentMetaforge)}` },
                      {
                        l: "ROI projetado",
                        v: `${(data.revenue / data.investmentMetaforge).toFixed(1)}x`,
                      },
                    ].map((item) => (
                      <div key={item.l}>
                        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8A8A8A]">
                          {item.l}
                        </div>
                        <div
                          className={`mt-3 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-none tracking-[-0.02em] ${
                            item.dim ? "text-[#8A8A8A] line-through decoration-white/15" : "text-white"
                          }`}
                        >
                          {item.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[var(--mf-line)] bg-[#0A0A0A] p-6 text-center sm:p-10 lg:p-12">
                  <h3 className="mx-auto max-w-2xl font-display text-[clamp(1.4rem,4.5vw,2.4rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
                    Sua empresa está operando abaixo do potencial.
                  </h3>
                  <p className="mx-auto mt-4 max-w-xl text-[13.5px] font-light leading-relaxed text-[#8A8A8A] sm:mt-5 sm:text-[14.5px]">
                    Receba gratuitamente um diagnóstico estratégico personalizado e
                    descubra quais oportunidades estão sendo perdidas neste momento.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition-all hover:bg-[#D4D4D4] sm:mt-8 sm:px-8 sm:text-[11px] sm:tracking-[0.28em]"
                  >
                    Falar no WhatsApp · +55 11 92511-1411
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Terminal footer */}
          <div className="flex items-center justify-between gap-3 border-t border-[var(--mf-line)] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A8A8A] sm:px-7 sm:text-[10px] sm:tracking-[0.22em]">
            <span className="truncate">secure :: tls 1.3</span>
            <span className="hidden sm:inline">© metaforge — proprietary tech</span>
            <span className="shrink-0">br-sa-1</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}