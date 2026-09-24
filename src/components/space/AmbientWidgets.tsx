import * as React from "react";
import { Clock, Users } from "lucide-react";

export function AmbientWidgets() {
  const [now, setNow] = React.useState<Date | null>(null);
  const [visitors, setVisitors] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    const key = "fandomverse.visits";
    const visits = Number(localStorage.getItem(key) ?? 0) + 1;
    localStorage.setItem(key, String(visits));
    const base = 128_400 + visits;
    setVisitors(base);
    const v = setInterval(() => setVisitors((n) => (n ?? base) + Math.floor(Math.random() * 3)), 4000);
    return () => {
      clearInterval(t);
      clearInterval(v);
    };
  }, []);

  const widget =
    "glass-panel pointer-events-auto rounded-2xl px-4 py-3 shadow-[0_20px_50px_-10px_oklch(0_0_0/0.7)]";

  return (
    <>
      <div className={`${widget} absolute top-4 left-4 z-10`}>
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <Clock className="size-3" /> Local time
        </div>
        <div className="mt-1 font-display text-2xl font-semibold tabular-nums">
          {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
        </div>
        <div className="text-xs text-muted-foreground">
          {now ? now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) : "\u00a0"}
        </div>
      </div>
      <div className={`${widget} absolute top-4 right-4 z-10 text-right`}>
        <div className="flex items-center justify-end gap-1.5 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <Users className="size-3" /> Visitors
        </div>
        <div className="mt-1 font-display text-2xl font-semibold tabular-nums">
          {visitors ? visitors.toLocaleString() : "—"}
        </div>
        <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" /> live
        </div>
      </div>
    </>
  );
}
