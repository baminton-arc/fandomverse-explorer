import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeartCrack, Trash2 } from "lucide-react";
import { categories } from "@/data/categories";
import { itemById } from "@/data/items";
import { CoverArt } from "@/components/ItemCard";
import { useFavourites } from "@/lib/fandom-store";

export const Route = createFileRoute("/favourites")({
  head: () => ({
    meta: [
      { title: "My Favourites — FandomVerse" },
      {
        name: "description",
        content: "Every title you've starred across anime, gaming, movies, TV, K-pop, comics and manga.",
      },
      { property: "og:title", content: "My Favourites — FandomVerse" },
      {
        property: "og:description",
        content: "Your saved fandom titles, grouped by universe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavouritesPage,
});

function FavouritesPage() {
  const { favourites, removeFavourite, hydrated } = useFavourites();

  const resolved = favourites
    .map((key) => {
      const [category, id] = key.split("/");
      const item = category && id ? itemById(category, id) : undefined;
      return item ? { key, item } : null;
    })
    .filter((v): v is { key: string; item: NonNullable<ReturnType<typeof itemById>> } => !!v);

  const grouped = categories
    .map((c) => ({ category: c, entries: resolved.filter((r) => r.item.category === c.slug) }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold sm:text-5xl">My favourites</h1>
      <p className="mt-2 text-muted-foreground">
        {hydrated
          ? `${resolved.length} title${resolved.length === 1 ? "" : "s"} saved in this browser.`
          : "Loading your saved titles…"}
      </p>

      {hydrated && resolved.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-20 text-center">
          <HeartCrack className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">Nothing saved yet — go find something you love.</p>
          <Link
            to="/"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Explore the universe
          </Link>
        </div>
      )}

      <div className="mt-12 space-y-12">
        {grouped.map((group) => (
          <section key={group.category.slug}>
            <div className="flex items-center gap-2.5">
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: group.category.color }}
              />
              <h2 className="text-xl font-bold">{group.category.name}</h2>
              <span className="text-sm text-muted-foreground">({group.entries.length})</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.entries.map(({ key, item }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <Link
                    to="/category/$slug/$itemId"
                    params={{ slug: item.category, itemId: item.id }}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <CoverArt item={item} className="size-14 shrink-0 rounded-lg" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{item.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.creator} · {item.year}
                      </span>
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-label={`Remove ${item.title} from favourites`}
                    onClick={() => removeFavourite(key)}
                    className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
