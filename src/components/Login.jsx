import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { getEmailError } from "../lib/validation.js";

export default function Login() {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    const cleanedEmail = email.trim();
    const emailErr = getEmailError(cleanedEmail);
    if (emailErr) {
      setErrorMsg(emailErr);
      return;
    }

    if (!password) {
      setErrorMsg("Password is required.");
      return;
    }

    setSubmitting(true);

    try {
      await login(cleanedEmail, password);
      navigate(fromPath, { replace: true });
    } catch (err) {
      setErrorMsg(err?.message ?? "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onGoogle() {
    setErrorMsg("");
    setInfoMsg("");
    setSubmitting(true);

    try {
      await loginWithGoogle();
      navigate(fromPath, { replace: true });
    } catch (err) {
      setErrorMsg(err?.message ?? "Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onResetPassword() {
    setErrorMsg("");
    setInfoMsg("");

    const cleaned = email.trim();
    const emailErr = getEmailError(cleaned);
    if (emailErr) {
      setErrorMsg(emailErr === "Email is required." ? "Enter your email above to reset your password." : emailErr);
      return;
    }

    setResetting(true);
    try {
      await resetPassword(cleaned);
      setInfoMsg("Password reset email sent. Check your inbox.");
    } catch (err) {
      setErrorMsg(err?.message ?? "Password reset failed");
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-3xl font-bold">Login</h1>

      {errorMsg && (
        <div className="alert alert-error mt-4">
          <span>{errorMsg}</span>
        </div>
      )}

      {infoMsg && (
        <div className="alert alert-info mt-4">
          <span>{infoMsg}</span>
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            className="input input-bordered w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            className="input input-bordered w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            minLength={6}
            required
          />
        </label>

        <button
          type="button"
          className="btn btn-ghost w-full"
          onClick={onResetPassword}
          disabled={submitting || resetting}
        >
          {resetting ? "Sending reset email…" : "Change password"}
        </button>

        <button
          className="btn btn-primary w-full mt-2"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <button
          className="btn btn-outline w-full"
          disabled={submitting}
          type="button"
          onClick={onGoogle}
        >
          Continue with Google
        </button>

        <p className="text-sm text-base-content/70">
          No account?{" "}
          <Link className="link" to="/signup">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
