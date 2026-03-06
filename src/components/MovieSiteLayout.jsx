import {
  FaGithub,
  FaInfoCircle,
  FaLock,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AppNavbar from "./AppNavbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function defaultMovieKey(movie) {
  return `${movie?.title ?? "movie"}-${movie?.releasing_year ?? ""}-${movie?.director ?? ""}`;
}

function MovieSiteLayout({
  children,
  browseOptions,
  onBrowseSelect,
  movies = [],
  loading = false,
  wishlistedKeys,
  getMovieKey,
  onToggleWishlistKey,
  onClearWishlist,
}) {
  const { user } = useAuth();
  const isAuthed = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  const ageGroups = browseOptions?.ageGroups ?? [];
  const genres = browseOptions?.genres ?? [];
  const decades = browseOptions?.decades ?? [];

  const movieKey = useCallback(
    (movie) => (getMovieKey ?? defaultMovieKey)(movie),
    [getMovieKey],
  );

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const wishlistCount = wishlistedKeys?.size ?? 0;

  const wishlistedMovies = useMemo(() => {
    const set = wishlistedKeys ?? new Set();
    if (!set.size) return [];
    return movies.filter((m) => set.has(movieKey(m)));
  }, [movies, wishlistedKeys, movieKey]);

  function requireAuth() {
    if (isAuthed) return true;
    navigate("/login", { replace: false, state: { from: location } });
    return false;
  }

  function downloadWishlist() {
    if (!requireAuth()) return;

    const exportList = wishlistedMovies.map((m) => ({
      title: m?.title ?? "",
      director: m?.director ?? "",
      releasing_year: m?.releasing_year ?? null,
      genre: m?.genre ?? "",
      age_group: m?.age_group ?? "",
      runtime: m?.runtime ?? "",
      imdb_rating: m?.imdb_rating ?? null,
      budget: m?.budget ?? "",
      language: m?.language ?? "",
      short_description: m?.short_description ?? "",
    }));

    const json = JSON.stringify(exportList, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const filename = `wishlist-movies-${yyyy}-${mm}-${dd}.json`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200 w-full">
      <AppNavbar
        loading={loading}
        ageGroups={ageGroups}
        genres={genres}
        decades={decades}
        onBrowseSelect={(payload) => {
          if (!requireAuth()) return;
          onBrowseSelect?.(payload);
        }}
        wishlistCount={wishlistCount}
        wishlistOpen={wishlistOpen}
        onToggleWishlist={() => {
          if (!requireAuth()) return;
          setWishlistOpen((v) => !v);
        }}
        showBrowseWishlist={isAuthed}
      />

      {isAuthed && wishlistOpen && (
        <div className="fixed left-0 right-0 bottom-0 top-16 z-40">
          <button
            type="button"
            className="absolute inset-0 bg-base-300/60"
            aria-label="Close wishlist panel"
            onClick={() => setWishlistOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-80 bg-base-100 border-l border-base-300 shadow-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={downloadWishlist}
                  disabled={loading || wishlistCount === 0}
                  title={loading ? "Loading…" : wishlistCount === 0 ? "No wishlisted movies" : "Download wishlist"}
                >
                  <FaDownload />
                  Download
                </button>
                {wishlistCount > 0 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      if (!requireAuth()) return;
                      onClearWishlist?.();
                    }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => setWishlistOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <span className="loading loading-spinner loading-md" />
                </div>
              ) : wishlistedMovies.length === 0 ? (
                <div className="text-sm text-base-content/70">No wishlisted movies yet.</div>
              ) : (
                wishlistedMovies.map((m) => (
                  <div key={movieKey(m)} className="p-3 rounded-box border border-base-300 bg-base-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold leading-snug">{m?.title ?? "Untitled"}</div>
                      <button
                        type="button"
                        className="btn btn-xs btn-outline"
                        onClick={() => {
                          if (!requireAuth()) return;
                          onToggleWishlistKey?.(movieKey(m));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 items-center text-sm text-base-content/70">
                      {m?.releasing_year != null && (
                        <span className="badge badge-outline">{m.releasing_year}</span>
                      )}
                      {m?.genre && <span className="badge badge-outline">{m.genre}</span>}
                      {m?.age_group && <span className="badge badge-outline">{m.age_group}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="grow w-full p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-100 text-base-content shadow-inner w-full">
        <div className="space-y-2">
          <p className="text-sm text-base-content/80">Stream picks. Build your wishlist.</p>
          <p className="text-sm">© {new Date().getFullYear()} Movies HD</p>
          <p className="text-xs text-base-content/60">Data loaded locally from /movies.json</p>

          <div className="flex items-center justify-center gap-5 pt-1">
            <a
              href="#"
              className="link link-hover text-sm inline-flex items-center gap-2"
              onClick={(e) => e.preventDefault()}
            >
              <FaInfoCircle />
              About
            </a>
            <a
              href="#"
              className="link link-hover text-sm inline-flex items-center gap-2"
              onClick={(e) => e.preventDefault()}
            >
              <FaLock />
              Privacy
            </a>
            <a
              href="#"
              className="link link-hover text-sm inline-flex items-center gap-2"
              onClick={(e) => e.preventDefault()}
            >
              <FaGithub />
              GitHub
            </a>
            <a
              href="#"
              className="link link-hover text-sm inline-flex items-center gap-2"
              onClick={(e) => e.preventDefault()}
            >
              <FaEnvelope />
              Contact
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default MovieSiteLayout;