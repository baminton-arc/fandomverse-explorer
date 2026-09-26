import * as React from "react";
import { Clock, Users } from "lucide-react";

export function AmbientWidgets() {
  const [now, setNow] = React.useState<Date | null>(null);
  const [visitors, setVisitors] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    // Counts each new visitor once: a reload (or return visit) from the same browser never adds to it.
    const seenKey = "fandomverse.visitor-counted";
    const countKey = "fandomverse.visitor-count";
    let count = Number(localStorage.getItem(countKey) ?? 0);
    if (!localStorage.getItem(seenKey)) {
      count += 1;
      localStorage.setItem(seenKey, "1");
      localStorage.setItem(countKey, String(count));
    }
    setVisitors(count);
    return () => {
      clearInterval(t);
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
          {visitors !== null ? visitors.toLocaleString() : "—"}
        </div>
        <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" /> live
        </div>
      </div>
    </>
  );
}
