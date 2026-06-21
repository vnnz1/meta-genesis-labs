const WORDS = [
  "Sistemas",
  "Automações",
  "Inteligência",
  "Plataformas",
  "Infraestrutura",
  "Escala",
  "Precisão",
  "Receita",
];

export function Marquee() {
  // duplicate the list so the translateX(-50%) loop is seamless
  const items = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-ink py-8 sm:py-10">
      <div
        className="flex w-max items-center gap-12 whitespace-nowrap sm:gap-20"
        style={{ animation: "mf-marquee 38s linear infinite" }}
      >
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-12 sm:gap-20">
            <span className="font-display text-4xl font-light tracking-[-0.02em] text-bone/90 sm:text-6xl">
              {w}
            </span>
            <span className="font-mono text-xs text-steel">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
