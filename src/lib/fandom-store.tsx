import * as React from "react";

const FAV_KEY = "fandomverse.favourites";
const NOTE_PREFIX = "fandomverse.note.";

export type FavouriteKey = string; // `${category}/${id}`

export const favKey = (category: string, id: string) => `${category}/${id}`;

interface FavContextValue {
  favourites: FavouriteKey[];
  isFavourite: (key: FavouriteKey) => boolean;
  toggleFavourite: (key: FavouriteKey) => void;
  removeFavourite: (key: FavouriteKey) => void;
  hydrated: boolean;
}

const FavContext = React.createContext<FavContextValue | null>(null);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = React.useState<FavouriteKey[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavourites(JSON.parse(raw) as FavouriteKey[]);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  const persist = React.useCallback((next: FavouriteKey[]) => {
    setFavourites(next);
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = React.useMemo<FavContextValue>(
    () => ({
      favourites,
      hydrated,
      isFavourite: (key) => favourites.includes(key),
      toggleFavourite: (key) =>
        persist(
          favourites.includes(key)
            ? favourites.filter((k) => k !== key)
            : [key, ...favourites],
        ),
      removeFavourite: (key) => persist(favourites.filter((k) => k !== key)),
    }),
    [favourites, hydrated, persist],
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavourites() {
  const ctx = React.useContext(FavContext);
  if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}

/** Notes live in sessionStorage — they clear when the browser closes. */
export function useNote(category: string, id: string) {
  const storageKey = NOTE_PREFIX + favKey(category, id);
  const [note, setNote] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      setNote(sessionStorage.getItem(storageKey) ?? "");
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, [storageKey]);

  const save = React.useCallback(
    (value: string) => {
      setNote(value);
      try {
        if (value.trim()) sessionStorage.setItem(storageKey, value);
        else sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  return { note, setNote: save, loaded };
}
