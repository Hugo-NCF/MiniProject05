import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function navLinkClass({ isActive }) {
  return `btn btn-ghost btn-sm ${isActive ? "btn-active" : ""}`;
}

export default function SharedNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar bg-base-100 shadow-md px-4 sm:px-6 w-full sticky top-0 z-50">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Movies HD
        </NavLink>
      </div>

      <nav className="flex-none flex items-center gap-1">
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
              className="btn btn-ghost btn-sm"
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
    </header>
  );
}
