'use client';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4 font-mono text-xs">
          <a
            href="#"
            className="text-muted-foreground hover:text-emerald-accent transition-colors"
          >
            ~/links/github
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-emerald-accent transition-colors"
          >
            ~/links/linkedin
          </a>
        </div>

        <span className="text-xs text-muted-foreground/60 font-mono">
          © {year} Sajjad Tahmouresi
        </span>
      </div>
    </footer>
  );
}