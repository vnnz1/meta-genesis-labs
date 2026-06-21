import { Magnetic } from "./Magnetic";

const links = [
  { label: "Sistemas", href: "#services" },
  { label: "Cases", href: "#cases" },
  { label: "Processo", href: "#process" },
  { label: "Contato", href: "#contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-bone" />
          MetaForge<span className="text-steel">®</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Magnetic key={l.href} strength={0.25}>
              <a
                href={l.href}
                className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-steel transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        <Magnetic>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.02] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone backdrop-blur transition-colors hover:border-bone/40 sm:px-5"
          >
            <span className="relative h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-bone" />
              <span className="absolute inset-0 animate-ping rounded-full bg-bone/70" />
            </span>
            Iniciar projeto
          </a>
        </Magnetic>
      </div>
      <div className="hairline" />
    </header>
  );
}
