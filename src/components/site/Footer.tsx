export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-12 font-mono text-[11px] uppercase tracking-[0.22em] text-steel sm:grid-cols-[1fr_auto_auto] sm:px-10 sm:py-14">
        <div>
          <div className="text-bone">MetaForge®</div>
          <div className="mt-2 normal-case tracking-normal text-steel">
            Infraestrutura digital de próxima geração.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-bone">Operações</span>
          <a href="#services" className="hover:text-bone">Sistemas</a>
          <a href="#cases" className="hover:text-bone">Cases</a>
          <a href="#process" className="hover:text-bone">Processo</a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-bone">Contato</span>
          <a href="mailto:hello@metaforge.studio" className="lowercase hover:text-bone">
            hello@metaforge.studio
          </a>
          <span>São Paulo · Berlin</span>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-steel sm:px-10">
          <span>© {new Date().getFullYear()} MetaForge. Todos os sistemas reservados.</span>
          <span>Forjado com precisão · v.04</span>
        </div>
      </div>
    </footer>
  );
}
