import * as React from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Heart, NotebookPen, Star } from "lucide-react";
import { toast } from "sonner";
import { categoryBySlug } from "@/data/categories";
import { itemById, itemsByCategory } from "@/data/items";
import { CoverArt, ItemCard } from "@/components/ItemCard";
import { favKey, useFavourites, useNote } from "@/lib/fandom-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug/$itemId")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    const item = itemById(params.slug, params.itemId);
    if (!category || !item) throw notFound();
    return { category, item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — FandomVerse" }, { name: "robots", content: "noindex" }],
      };
    }
    const { item, category } = loaderData;
    const title = `${item.title} — ${category.name} on FandomVerse`;
    return {
      meta: [
        { title },
        { name: "description", content: item.synopsis },
        { property: "og:title", content: title },
        { property: "og:description", content: item.synopsis },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ItemDetail,
});

function ItemDetail() {
  const { item, category } = Route.useLoaderData();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { note, setNote } = useNote(item.category, item.id);
  const key = favKey(item.category, item.id);
  const fav = isFavourite(key);

  const related = React.useMemo(
    () =>
      itemsByCategory(item.category)
        .filter((i) => i.id !== item.id)
        .sort(
          (a, b) =>
            b.tags.filter((t) => item.tags.includes(t)).length -
            a.tags.filter((t) => item.tags.includes(t)).length,
        )
        .slice(0, 5),
    [item],
  );

  return (
    <div>
      <div
        className="border-b border-border/70"
        style={{
          background: `radial-gradient(80% 120% at 10% 0%, ${category.color}26, transparent 65%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <Link
            to="/category/$slug"
            params={{ slug: category.slug }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to {category.name}
          </Link>

          <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <CoverArt
                item={item}
                className="aspect-[3/4] w-full rounded-xl border border-border"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <span
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{ borderColor: `${category.color}80`, color: category.color }}
              >
                {category.name}
              </span>
              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{item.title}</h1>
              <p className="mt-1.5 text-muted-foreground">
                {item.creator} · {item.year}
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-star">
                  <Star className="size-4 fill-current" />
                  <span className="font-semibold">{item.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">/ 10</span>
                </span>
              </div>

              <p className="mt-5 max-w-2xl leading-relaxed text-foreground/85">
                {item.synopsis}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  toggleFavourite(key);
                  toast(fav ? "Removed from favourites" : "Saved to favourites", {
                    description: item.title,
                  });
                }}
                className={cn(
                  "mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03]",
                  fav
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface/60 text-foreground hover:border-primary",
                )}
              >
                <Heart className={cn("size-4", fav && "fill-current")} />
                {fav ? "In your favourites" : "Add to favourites"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <NotebookPen className="size-4 text-accent" />
            <h2 className="font-display text-lg font-semibold">Your notes</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Private to this browser session — notes clear when you close the browser.
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder={`Thoughts on ${item.title}…`}
            className="mt-4 w-full resize-y rounded-lg border border-input bg-background/60 p-3 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground"
          />
        </div>

        <h2 className="mt-14 text-2xl font-bold">More from {category.name}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {related.map((r, i) => (
            <ItemCard key={r.id} item={r} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
