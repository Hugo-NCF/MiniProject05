import { FaChevronDown, FaFilm } from "react-icons/fa";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function navLinkClass({ isActive }) {
  return `btn btn-ghost ${isActive ? "btn-active" : ""}`;
}

export default function AppNavbar({
  loading = false,
  ageGroups = [],
  genres = [],
  decades = [],
  onBrowseSelect,
  wishlistCount = 0,
  wishlistOpen = false,
  onToggleWishlist,
  showBrowseWishlist = true,
}) {
  const { user } = useAuth();

  const userLabel = user?.displayName || user?.email || "Guest";
  const avatarSrc = user?.photoURL || null;
  const avatarFallbackLetter = (userLabel?.trim?.()?.[0] || "?").toUpperCase();

  function closeBrowseDropdown(e) {
    const details = e?.currentTarget?.closest?.("details.dropdown");
    if (details) details.removeAttribute("open");
  }

  return (
    <header className="navbar bg-base-100 shadow-md px-6 w-full sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-6">
        <FaFilm className="text-2xl text-primary" />
        <h1 className="text-2xl font-bold">Movies HD</h1>

        {showBrowseWishlist && (
          <details
            className={`dropdown group ${loading ? "opacity-70 pointer-events-none" : ""}`}
          >
            <summary className="btn btn-ghost list-none" aria-disabled={loading}>
              <span className="flex items-center gap-2">
                <span>Browse</span>
                {loading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <FaChevronDown className="transition-transform group-open:rotate-180" />
                )}
              </span>
            </summary>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-10 mt-2 w-52 p-2 shadow">
              {loading ? (
                <li>
                  <div className="flex items-center justify-center py-6">
                    <span className="loading loading-spinner loading-md" />
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <details>
                      <summary>Age group</summary>
                      <ul>
                        {ageGroups.map((g) => (
                          <li key={g}>
                            <button
                              type="button"
                              onClick={(e) => {
                                onBrowseSelect?.({ type: "age_group", value: g });
                                closeBrowseDropdown(e);
                              }}
                            >
                              {g}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>Genre</summary>
                      <ul>
                        {genres.map((g) => (
                          <li key={g}>
                            <button
                              type="button"
                              onClick={(e) => {
                                onBrowseSelect?.({ type: "genre", value: g });
                                closeBrowseDropdown(e);
                              }}
                            >
                              {g}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>Year</summary>
                      <ul>
                        {decades.map((d) => (
                          <li key={d?.start ?? d?.label}>
                            <button
                              type="button"
                              onClick={(e) => {
                                onBrowseSelect?.({ type: "decade", value: d?.start });
                                closeBrowseDropdown(e);
                              }}
                            >
                              {d?.label ?? String(d)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                </>
              )}
            </ul>
          </details>
        )}
      </div>

      <div className="flex-none flex items-center gap-4">
        {!user && (
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={navLinkClass}>
              Signup
            </NavLink>
          </nav>
        )}

        {showBrowseWishlist && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onToggleWishlist}
            aria-expanded={wishlistOpen}
          >
            <span className="flex items-center gap-2">
              <span>Wishlist</span>
              <span className="badge badge-sm rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {wishlistCount}
              </span>
            </span>
          </button>
        )}

        <div className="flex flex-col items-center">
          {user ? (
            avatarSrc ? (
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img src={avatarSrc} alt="Profile" />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-base-300 text-base-content w-14 rounded-full flex items-center justify-center">
                  <span className="text-lg">{avatarFallbackLetter}</span>
                </div>
              </div>
            )
          ) : (
            <div className="avatar placeholder">
              <div className="bg-base-300 text-base-content w-14 rounded-full flex items-center justify-center">
                <span className="text-lg">G</span>
              </div>
            </div>
          )}
          <div className="mt-1 w-20 text-center text-xs opacity-70 truncate">
            {userLabel}
          </div>
        </div>
      </div>
    </header>
  );
}
