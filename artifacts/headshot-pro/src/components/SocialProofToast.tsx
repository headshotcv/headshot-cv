import { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";

type Event = {
  username: string;
  action: string;
};

const EVENTS: Event[] = [
  { username: "louna_u64", action: "a commandé sa photo pro" },
  { username: "thomas.d", action: "vient de générer son CV" },
  { username: "sofia_m", action: "a téléchargé son pack photo + CV" },
  { username: "yanis.b", action: "a commandé sa photo pro" },
  { username: "camille.l", action: "vient de générer son CV" },
  { username: "marc_p33", action: "a téléchargé son pack photo + CV" },
  { username: "ines.r", action: "a commandé sa photo pro" },
  { username: "julien92", action: "vient de générer son CV" },
  { username: "emma.k", action: "a téléchargé son pack photo + CV" },
  { username: "noah_b", action: "a commandé sa photo pro" },
  { username: "lina.t", action: "vient de générer son CV" },
  { username: "lucas.r", action: "a téléchargé son pack photo + CV" },
];

const SHOW_MS = 5000;
const HIDDEN_MS = 7000;
const INITIAL_DELAY_MS = 3500;

export function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const cycle = (delay: number) => {
      timer = setTimeout(() => {
        if (cancelled) return;
        setIndex((i) => (i + 1) % EVENTS.length);
        setVisible(true);
        timer = setTimeout(() => {
          if (cancelled) return;
          setVisible(false);
          cycle(HIDDEN_MS);
        }, SHOW_MS);
      }, delay);
    };

    cycle(INITIAL_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const event = EVENTS[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg pl-2 pr-3 py-2">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <ShoppingCart className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-tight text-foreground truncate">
            <span className="font-semibold">{event.username}</span>{" "}
            <span className="text-muted-foreground">{event.action}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">À l'instant</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Fermer"
          className="shrink-0 text-muted-foreground/60 hover:text-foreground transition-colors p-1 -mr-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
