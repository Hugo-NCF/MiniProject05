import { NavLink } from "react-router";
import { FaFilm } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

function navLinkClass({ isActive }) {
  return `btn btn-ghost ${isActive ? "btn-active" : ""}`;
}

export default function SharedNavbar() {
  const { user, logout } = useAuth();

  const userLabel = user?.displayName || user?.email || "Guest";
  const avatarSrc = user?.photoURL || null;
  const avatarFallbackLetter = (userLabel?.trim?.()?.[0] || "?").toUpperCase();

  return (
    <header className="navbar bg-base-100 shadow-md px-4 w-full sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-4">
        <FaFilm className="text-xl text-primary" />
        <NavLink to="/" className="text-xl font-bold">
          Movies HD
        </NavLink>
      </div>

      <div className="flex-none flex items-center gap-4">
        <nav className="flex items-center gap-2">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={navLinkClass}>
              Signup
            </NavLink>
          </>
        )}
        </nav>

        <div className="flex flex-col items-center leading-tight">
          {user ? (
            avatarSrc ? (
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={avatarSrc} alt="Profile" />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-base-300 text-base-content w-10 rounded-full flex items-center justify-center">
                  <span className="text-base">{avatarFallbackLetter}</span>
                </div>
              </div>
            )
          ) : (
            <div className="avatar placeholder">
              <div className="bg-base-300 text-base-content w-10 rounded-full flex items-center justify-center">
                <span className="text-base">G</span>
              </div>
            </div>
          )}
          <div className="mt-0.5 w-16 text-center text-[11px] opacity-70 truncate">
            {userLabel}
          </div>
        </div>
      </div>
    </header>
  );
}
