import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";
import type { FandomItem } from "@/data/items";
import { categoryBySlug } from "@/data/categories";
import { favKey, useFavourites } from "@/lib/fandom-store";
import { cn } from "@/lib/utils";

export function CoverArt({
  item,
  className,
}: {
  item: FandomItem;
  className?: string;
}) {
  const color = categoryBySlug(item.category)?.color ?? "#a855f7";
  const initials = item.title
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 90% at 20% 0%, ${color}55, transparent 60%), radial-gradient(100% 80% at 90% 100%, ${color}33, transparent 55%), linear-gradient(160deg, oklch(0.2 0.04 278), oklch(0.13 0.035 275))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 9px)",
        }}
      />
      <div
        className="absolute -right-6 -bottom-8 size-28 rounded-full blur-2xl"
        style={{ backgroundColor: `${color}66` }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold tracking-tighter"
        style={{ color: `${color}` }}
      >
        {initials}
      </span>
    </div>
  );
}

export function ItemCard({ item, index = 0 }: { item: FandomItem; index?: number }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const key = favKey(item.category, item.id);
  const fav = isFavourite(key);
  const color = categoryBySlug(item.category)?.color ?? "#a855f7";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
    >
      <Link
        to="/category/$slug/$itemId"
        params={{ slug: item.category, itemId: item.id }}
        className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60"
        style={{ boxShadow: "0 0 0 0 transparent" }}
      >
        <CoverArt item={item} className="aspect-[3/4] w-full" />
        <button
          type="button"
          aria-label={fav ? "Remove from favourites" : "Add to favourites"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavourite(key);
          }}
          className="absolute top-2.5 right-2.5 rounded-full border border-border bg-background/70 p-2 backdrop-blur transition-colors hover:border-primary"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              fav ? "fill-primary text-primary" : "text-muted-foreground",
            )}
          />
        </button>
        <div className="space-y-1.5 p-3.5">
          <h3 className="line-clamp-1 font-display text-sm font-semibold">{item.title}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">{item.creator}</p>
          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-star">
              <Star className="size-3 fill-current" />
              {item.rating.toFixed(1)}
            </span>
            <span>·</span>
            <span>{item.year}</span>
            <span
              className="ml-auto size-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
