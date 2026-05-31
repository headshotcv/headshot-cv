import { useEffect, useState } from "react";

const BASE_MIN = 1140;
const BASE_MAX = 1320;

function pickInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextValue(prev: number): number {
  const delta = pickInRange(-12, 15);
  const next = prev + delta;
  if (next < BASE_MIN) return BASE_MIN + pickInRange(0, 8);
  if (next > BASE_MAX) return BASE_MAX - pickInRange(0, 8);
  return next;
}

export function LiveOnlineBadge({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number>(() => pickInRange(1180, 1240));

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = pickInRange(3500, 7000);
      timeoutId = setTimeout(() => {
        setCount((c) => nextValue(c));
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ${className}`}
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        <span className="font-semibold tabular-nums">{count.toLocaleString("fr-FR")}</span>
        <span className="hidden sm:inline"> personnes en ligne</span>
        <span className="sm:hidden"> en ligne</span>
      </span>
    </div>
  );
}
