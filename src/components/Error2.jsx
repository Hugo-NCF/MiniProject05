import { Link } from "react-router";

export default function Error2() {
	return (
		<div className="mx-auto max-w-xl px-6 py-16 text-center">
			<h1 className="text-4xl font-bold">403</h1>
			<p className="mt-3 text-base-content/70">
				Forbidden. You don’t have permission to access this page.
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