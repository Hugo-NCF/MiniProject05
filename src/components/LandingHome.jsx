import { Link } from "react-router";

export default function LandingHome() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">Mini Project 05</h1>
      <p className="mt-2 text-base-content/70">
        React Router is set up. Next step is adding Firebase authentication.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="btn btn-primary" to="/dashboard">
          Dashboard
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
