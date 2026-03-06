import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">401</h1>
      <p className="mt-3 text-base-content/70">
        Unauthorized. Please log in to access this page.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link className="btn btn-primary" to="/login">
          Go to Login
        </Link>
        <Link className="btn btn-ghost" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
