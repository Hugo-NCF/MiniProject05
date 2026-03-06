import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-base-content/70">Page not found.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link className="btn btn-primary" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
