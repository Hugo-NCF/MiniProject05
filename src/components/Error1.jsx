import { Link } from "react-router";

export default function Error1() {
	return (
		<div className="mx-auto max-w-xl px-6 py-16 text-center">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="mt-3 text-base-content/70">
				Page not found. The link may be broken, or the page may have been moved.
			</p>
			<div className="mt-6 flex justify-center gap-3">
				<Link className="btn btn-primary" to="/">
					Go Home
				</Link>
				<Link className="btn btn-ghost" to="/dashboard">
					Dashboard
				</Link>
			</div>
		</div>
	);
}