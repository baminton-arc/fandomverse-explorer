# FandomVerse — Interactive Fandom Universe

A fandom discovery site with a 3D solar-system landing page, category browsing, detail pages, favourites, notes, global search, and static pages. All content comes from local JSON data files (no backend), and user state lives in the browser.

## Pages

- **Home (`/`)** — Full-screen 3D scene: a glowing central "FandomVerse" sun with 7 orbiting planets (Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga). Drag to rotate, scroll to zoom, hover highlights a planet with its label, click flies the camera in and navigates to that category. Below the scene: a short intro, trending items strip, and footer.
- **Category (`/category/$slug`)** — Grid of items for one category with search-within-category, sort, and tag filters. Cards animate in with a staggered fade.
- **Item detail (`/category/$slug/$itemId`)** — Cover art, synopsis, metadata (year, studio/creator, rating, tags), favourite toggle, personal notes panel, and related items.
- **Favourites (`/favourites`)** — Everything the user starred, grouped by category, with a remove action and empty state.
- **About (`/about`)** — Parallax scrolling background with team/project info.
- **Contact (`/contact`)** — Contact form (client-side validation) plus an embedded Google Map presented on a tilted 3D-perspective plane.

## Global UI

- **Navbar** — Logo, category links, expanding search field, favourites counter, theme toggle.
- **Global search** — Expands on click; typing filters across all categories instantly, results drop down in a cascading slide-in, keyboard navigable, click jumps to the item.
- **Motion** — Page transitions, card stagger, hover lifts, scroll reveals throughout.

## Data & persistence

- Item data: static JSON per category in `src/data/` — roughly 10–14 entries each with title, image, synopsis, tags, year, rating.
- Favourites: persisted in `localStorage`, survives refresh.
- Notes: kept in `sessionStorage` per item, cleared when the browser closes (as specified).

## Technical notes

- 3D: `three`, `@react-three/fiber` v9, `@react-three/drei` v10 on a client-only route (`ssr: false`) so the canvas never server-renders. Planets are procedural spheres with emissive/atmosphere materials, a starfield background, local `Environment` lightformers (no CDN presets), and delta-time orbital motion. Custom `OrbitControls` damping; capped pixel ratio and low-poly geometry for mobile.
- Animation: `motion` (Motion for React) for DOM transitions and stagger.
- Design system: dark cosmic theme — deep indigo/near-black backgrounds, per-category accent colours, one display typeface for headings. All colours as semantic tokens in `src/styles.css`, no hardcoded utility colours.
- Cover art is generated per item as bundled image assets.
- Each route gets its own `head()` with a unique title, description, and og/twitter tags.
- No backend: all data is local JSON, state is browser storage only.

## Build order

1. Design tokens, fonts, layout shell, navbar/footer.
2. JSON data + generated cover art.
3. 3D solar-system hero and home page.
4. Category grid + item detail pages.
5. Favourites, notes, global search.
6. About and Contact pages.
7. Browser verification of the 3D scene and flows.
