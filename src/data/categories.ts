export interface Category {
  slug: string;
  name: string;
  tagline: string;
  /** hex accent used for the 3D planet + UI accents */
  color: string;
  /** orbit radius in the 3D scene */
  orbit: number;
  /** planet radius */
  size: number;
  /** orbital speed multiplier */
  speed: number;
  /** orbital inclination in radians */
  tilt: number;
  ring?: boolean;
}

export const categories: Category[] = [
  {
    slug: "anime",
    name: "Anime",
    tagline: "Hand-drawn worlds, impossible stakes.",
    color: "#ff5f9e",
    orbit: 4.2,
    size: 0.52,
    speed: 0.38,
    tilt: 0.05,
  },
  {
    slug: "gaming",
    name: "Gaming",
    tagline: "Worlds you play instead of watch.",
    color: "#4ade80",
    orbit: 5.6,
    size: 0.62,
    speed: 0.3,
    tilt: -0.09,
  },
  {
    slug: "movies",
    name: "Movies",
    tagline: "Two hours, one universe.",
    color: "#f59e0b",
    orbit: 7.0,
    size: 0.7,
    speed: 0.24,
    tilt: 0.13,
    ring: true,
  },
  {
    slug: "tv-shows",
    name: "TV Shows",
    tagline: "Seasons of obsession.",
    color: "#38bdf8",
    orbit: 8.4,
    size: 0.58,
    speed: 0.19,
    tilt: -0.05,
  },
  {
    slug: "k-pop",
    name: "K-Pop",
    tagline: "Choreography as spectacle.",
    color: "#c084fc",
    orbit: 9.8,
    size: 0.5,
    speed: 0.16,
    tilt: 0.17,
  },
  {
    slug: "comics",
    name: "Comics",
    tagline: "Panels, capes and continuity.",
    color: "#f87171",
    orbit: 11.2,
    size: 0.66,
    speed: 0.13,
    tilt: -0.14,
    ring: true,
  },
  {
    slug: "manga",
    name: "Manga",
    tagline: "Ink on paper, right to left.",
    color: "#e2e8f0",
    orbit: 12.6,
    size: 0.46,
    speed: 0.11,
    tilt: 0.08,
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
