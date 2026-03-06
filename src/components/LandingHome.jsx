import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function LandingHome() {
  const { user } = useAuth();
  const dashboardHref = user ? "/dashboard" : "/guest";
  const dashboardLabel = user ? "Dashboard" : "Preview";

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-5xl font-bold text-center">Movies HD</h1>
      <div className="mt-4 space-y-2 text-base-content/70 text-center">
        <p>
          Browse a curated movie catalog and quickly narrow down what you want to watch.
          Use the dashboard’s browse menu to filter by age group, genre, or decade, then
          sort your results by release year, IMDb rating, or title.
        </p>
        <p>
          Selecting a movie opens a detailed view where you can see key info at a glance
          (like rating, runtime, year, and more), read a short description, and mark how
          you feel about it with like/dislike. You can also add movies to your wishlist so
          you can come back to them later.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="btn btn-primary" to={dashboardHref}>
          {dashboardLabel}
        </Link>
        <Link className="btn btn-outline" to="/login">
          Login
        </Link>
        <Link className="btn btn-outline" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}
