import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Orbit, X } from "lucide-react";
import { categories } from "@/data/categories";
import { useFavourites } from "@/lib/fandom-store";
import { GlobalSearch } from "@/components/GlobalSearch";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { favourites, hydrated } = useFavourites();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Orbit className="size-6 text-primary" />
          <span className="font-display text-lg font-bold tracking-tight">
            Fandom<span className="text-primary">Verse</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <GlobalSearch />
          <Link
            to="/favourites"
            className="relative rounded-full border border-border bg-surface/70 p-2 transition-colors hover:border-primary"
            aria-label="Favourites"
          >
            <Heart className="size-4" />
            {hydrated && favourites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {favourites.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full border border-border bg-surface/70 p-2 lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 lg:hidden",
          menuOpen ? "max-h-96" : "max-h-0",
        )}
        style={{ transition: "max-height 300ms ease" }}
      >
        <div className="grid grid-cols-2 gap-1 p-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
          <Link to="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Orbit className="size-5 text-primary" />
            <span className="font-display text-base font-bold">FandomVerse</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A map of the things people love, arranged as a solar system you can spin.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Universes</h4>
          <ul className="mt-3 grid grid-cols-2 gap-1.5 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Elsewhere</h4>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <Link to="/favourites" className="hover:text-foreground">
                My favourites
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FandomVerse. Built for fans, by fans.
      </div>
    </footer>
  );
}
