import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Orbit, Rocket, Telescope, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — FandomVerse" },
      {
        name: "description",
        content:
          "Who builds FandomVerse and why we mapped seven fandom worlds into one interactive solar system.",
      },
      { property: "og:title", content: "About Us — FandomVerse" },
      {
        property: "og:description",
        content: "The small team behind FandomVerse and the idea that started it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "John Cepe", role: "Design & 3D" },
  { name: "Hosam Mohamed", role: "Engineering" },
  { name: "Abdulrahman Asif", role: "Curation" },
  { name: "James Estilles", role: "Community" },
];

function AboutPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <div>
      <div ref={ref} className="relative h-[80vh] min-h-[480px] overflow-hidden">
        <motion.div style={{ y: y1 }} className="starfield absolute inset-0 scale-125" />
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0"
          aria-hidden
        >
          <div className="absolute top-1/4 left-[12%] size-64 rounded-full bg-nebula/30 blur-3xl" />
          <div className="absolute right-[10%] bottom-1/4 size-80 rounded-full bg-accent/20 blur-3xl" />
        </motion.div>
        <motion.div
          style={{ opacity: fade }}
          className="relative flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <Orbit className="size-10 text-primary" />
          <h1 className="text-glow mt-5 font-display text-4xl font-bold sm:text-6xl">
            We map what people love
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            FandomVerse started as an argument about whether a manga shelf and a games library
            belong on the same website. They do — they just needed a better map.
          </p>
        </motion.div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Telescope, title: "Curated, not scraped", body: "Every title here was picked by a person who has actually finished it." },
            { icon: Rocket, title: "Fast and playful", body: "A 3D front door that still loads on a mid-range phone." },
            { icon: Users, title: "Yours to keep", body: "Favourites and notes stay in your browser. No account, no tracking pixel." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <f.icon className="size-5 text-accent" />
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="mt-20 text-3xl font-bold">The crew</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary font-display text-lg font-bold text-primary">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-display text-base font-semibold">{m.name}</h3>
                <p className="text-xs text-primary">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
