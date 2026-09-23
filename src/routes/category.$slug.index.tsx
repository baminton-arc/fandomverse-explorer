import * as React from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { categories, categoryBySlug } from "@/data/categories";
import { itemsByCategory } from "@/data/items";
import { ItemCard } from "@/components/ItemCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug/")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — FandomVerse" }, { name: "robots", content: "noindex" }],
      };
    }
    const { name, tagline } = loaderData.category;
    const title = `${name} — FandomVerse`;
    return {
      meta: [
        { title },
        { name: "description", content: `${tagline} Browse the best of ${name} on FandomVerse.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `${tagline} Browse the best of ${name}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

type Sort = "rating" | "year" | "title";

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const all = React.useMemo(() => itemsByCategory(category.slug), [category.slug]);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<Sort>("rating");
  const [tag, setTag] = React.useState<string | null>(null);

  React.useEffect(() => {
    setQuery("");
    setTag(null);
  }, [category.slug]);

  const tags = React.useMemo(
    () => Array.from(new Set(all.flatMap((i) => i.tags))).sort(),
    [all],
  );

  const shown = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((i) => (tag ? i.tags.includes(tag) : true))
      .filter(
        (i) =>
          !q || i.title.toLowerCase().includes(q) || i.creator.toLowerCase().includes(q),
      )
      .sort((a, b) =>
        sort === "rating"
          ? b.rating - a.rating
          : sort === "year"
            ? b.year - a.year
            : a.title.localeCompare(b.title),
      );
  }, [all, query, tag, sort]);

  return (
    <div>
      <div
        className="border-b border-border/70"
        style={{
          background: `radial-gradient(90% 120% at 15% 0%, ${category.color}22, transparent 60%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  c.slug === category.slug
                    ? "border-transparent text-background"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
                style={
                  c.slug === category.slug ? { backgroundColor: c.color } : undefined
                }
              >
                {c.name}
              </Link>
            ))}
          </div>
          <motion.h1
            key={category.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-4xl font-bold sm:text-5xl"
            style={{ color: category.color }}
          >
            {category.name}
          </motion.h1>
          <p className="mt-2 max-w-lg text-muted-foreground">{category.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-56 flex-1 items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category.name}…`}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-border bg-surface/60 px-4 py-2 text-sm outline-none"
          >
            <option value="rating">Top rated</option>
            <option value="year">Newest</option>
            <option value="title">A–Z</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              tag === null
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                tag === t
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No titles match that filter yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 pb-16 sm:grid-cols-3 lg:grid-cols-5">
            {shown.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
