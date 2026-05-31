import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { LANGUAGES, useI18n, type Lang } from "@/lib/i18n";

type Variant = "floating" | "inline";

export function LanguageBadge({ variant = "floating" }: { variant?: Variant }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  const wrapper =
    variant === "floating"
      ? "fixed top-3 right-3 z-[60]"
      : "relative";

  return (
    <div ref={ref} className={wrapper}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-background/90 backdrop-blur border border-border shadow-sm hover:bg-secondary/60 transition-colors text-sm font-medium text-foreground"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="uppercase tracking-wider text-xs">{current.code}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-[180px] rounded-xl border border-border bg-background shadow-xl overflow-hidden"
        >
          {LANGUAGES.map(l => {
            const active = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(l.code as Lang);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-secondary/60 transition-colors ${
                    active ? "bg-secondary/40 font-semibold" : ""
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {active && <Check className="w-4 h-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
