import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, IMAGES, unsplash, type Category } from "@/lib/gallery-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Image Gallery — Nature, Cities, Animals & Food" },
      { name: "description", content: "A responsive photo gallery with category filters and a keyboard-friendly lightbox." },
      { property: "og:title", content: "Image Gallery" },
      { property: "og:description", content: "Browse curated photos of nature, cities, animals and food." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

type Filter = "All" | Category;

function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  // Index into the *filtered* list; null = lightbox closed.
  const [active, setActive] = useState<number | null>(null);

  const images = useMemo(
    () => (filter === "All" ? IMAGES : IMAGES.filter((i) => i.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-7xl px-4 pt-14 pb-8 text-center sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Image Gallery</h1>
        <p className="mt-3 text-muted-foreground">A curated collection of moments from around the world.</p>

        {/* Category filters */}
        <nav aria-label="Filter by category" className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`min-h-11 rounded-full px-5 text-sm font-medium transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-foreground hover:bg-secondary border border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* Keyed by filter so the grid re-animates on change */}
        <ul key={filter} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, i) => (
            <li key={img.id} className="animate-card-in" style={{ animationDelay: `${i * 40}ms` }}>
              <button
                onClick={() => setActive(i)}
                aria-label={`Open ${img.title}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted shadow-soft transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={unsplash(img.photo, 600)}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay with title + category */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-overlay/80 via-overlay/30 to-transparent p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-xs uppercase tracking-widest text-overlay-foreground/80">{img.category}</span>
                  <span className="text-lg font-semibold text-overlay-foreground">{img.title}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </main>

      {active !== null && (
        <Lightbox images={images} index={active} onChange={setActive} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

interface LightboxProps {
  images: typeof IMAGES;
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}

/** Full-screen accessible lightbox with wrap-around navigation. */
function Lightbox({ images, index, onChange, onClose }: LightboxProps) {
  const [closing, setClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[index];
  const total = images.length;

  // Play the exit animation before unmounting.
  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);
  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);

  // Keyboard support, focus management and scroll lock.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, next, prev]);

  // Guard against an out-of-range index (e.g. list changed).
  if (!img) return null;

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-overlay-foreground/10 text-2xl text-overlay-foreground backdrop-blur transition hover:bg-overlay-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-overlay-foreground";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${img.title}, image ${index + 1} of ${total}`}
      onClick={close}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-overlay/90 p-4 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
    >
      <button ref={closeRef} onClick={close} aria-label="Close" className={`${navBtn} right-4 top-8 translate-y-0`}>
        ✕
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image" className={`${navBtn} left-2 sm:left-6`}>
        ‹
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image" className={`${navBtn} right-2 sm:right-6`}>
        ›
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-full flex-col items-center ${closing ? "animate-zoom-out" : "animate-zoom-in"}`}
      >
        {/* key forces a fade each time the image changes */}
        <img
          key={img.id}
          src={unsplash(img.photo, 1600)}
          alt={img.alt}
          className="animate-fade-in max-h-[78vh] max-w-[88vw] rounded-xl object-contain shadow-lift"
        />
        <figcaption className="mt-4 text-center text-overlay-foreground">
          <span className="font-semibold">{img.title}</span>
          <span className="mx-2 opacity-50">·</span>
          <span className="opacity-70">{img.category}</span>
          <div className="mt-1 text-sm opacity-60" aria-live="polite">
            {index + 1} / {total}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
