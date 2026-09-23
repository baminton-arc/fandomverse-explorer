import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { items } from "@/data/items";
import { categoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.creator.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  React.useEffect(() => setActive(0), [query]);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (index: number) => {
    const hit = results[index];
    if (!hit) return;
    setOpen(false);
    setQuery("");
    void navigate({
      to: "/category/$slug/$itemId",
      params: { slug: hit.category, itemId: hit.id },
    });
  };

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-surface/70 transition-all duration-300",
          open ? "w-56 px-3 py-2 sm:w-80" : "w-10 justify-center p-2 hover:border-primary",
        )}
      >
        <button
          type="button"
          aria-label="Search FandomVerse"
          onClick={() => setOpen(true)}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Search className="size-4" />
        </button>
        {open && (
          <>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter") {
                  go(active);
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
              placeholder="Search every fandom…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {open && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="glass-panel absolute right-0 z-50 mt-2 w-[min(92vw,26rem)] overflow-hidden rounded-xl p-1.5 shadow-2xl"
          >
            {results.length === 0 ? (
              <p className="px-3 py-4 text-sm text-muted-foreground">
                Nothing in this universe matches “{query}”.
              </p>
            ) : (
              results.map((hit, i) => (
                <motion.button
                  key={`${hit.category}-${hit.id}`}
                  type="button"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.25 }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    i === active ? "bg-secondary" : "hover:bg-secondary/60",
                  )}
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: categoryBySlug(hit.category)?.color ?? "#a855f7",
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{hit.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {categoryBySlug(hit.category)?.name} · {hit.creator}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">{hit.year}</span>
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
