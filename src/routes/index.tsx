import * as React from "react";
import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, MousePointerClick, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { trendingItems } from "@/data/items";
import { ItemCard } from "@/components/ItemCard";

const SolarSystem = React.lazy(() => import("@/components/space/SolarSystem"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FandomVerse — Explore fandoms as a 3D universe" },
      {
        name: "description",
        content:
          "Spin an interactive solar system of seven fandom worlds: anime, gaming, movies, TV shows, K-pop, comics and manga.",
      },
      { property: "og:title", content: "FandomVerse — Explore fandoms as a 3D universe" },
      {
        property: "og:description",
        content:
          "Spin an interactive solar system of seven fandom worlds and save the ones you love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SceneFallback() {
  return (
    <div className="starfield grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="size-14 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-sm">Charting the universe…</p>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div>
      <section className="relative h-[calc(100vh-4rem)] min-h-[560px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ClientOnly fallback={<SceneFallback />}>
            <React.Suspense fallback={<SceneFallback />}>
              <SolarSystem />
            </React.Suspense>
          </ClientOnly>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-8 z-10 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-glow font-display text-4xl font-bold sm:text-6xl"
          >
            Every fandom, one orbit away
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
          >
            Drag to spin the system, scroll to zoom, and click a planet to enter its world.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3 px-6">
          <span className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted-foreground">
            <MousePointerClick className="size-3.5" /> Drag · scroll · click a planet
          </span>
          <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:scale-105"
                style={{ borderColor: `${c.color}66`, color: c.color }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm text-primary">
              <Sparkles className="size-4" /> Trending across the verse
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">What fans are orbiting now</h2>
          </div>
          <Link
            to="/favourites"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            My favourites <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {trendingItems.slice(0, 10).map((item, i) => (
            <ItemCard key={`${item.category}-${item.id}`} item={item} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Seven worlds",
              body: "Anime, gaming, movies, TV, K-pop, comics and manga — each with its own curated shelf.",
            },
            {
              title: "Save what you love",
              body: "Favourite anything and it stays with you between visits, no account required.",
            },
            {
              title: "Think out loud",
              body: "Jot private notes on any title. They live only for this browsing session.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
