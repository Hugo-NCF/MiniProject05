import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import {
  getDisplayNameError,
  getEmailError,
  getPasswordError,
} from "../lib/validation.js";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const cleanedName = displayName.trim();
    const cleanedEmail = email.trim();

    const nameErr = getDisplayNameError(cleanedName);
    if (nameErr) {
      setErrorMsg(nameErr);
      return;
    }

    const emailErr = getEmailError(cleanedEmail);
    if (emailErr) {
      setErrorMsg(emailErr);
      return;
    }

    const pwErr = getPasswordError(password, { minLength: 6 });
    if (pwErr) {
      setErrorMsg(pwErr);
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await signup(cleanedEmail, password, cleanedName);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setErrorMsg(err?.message ?? "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onGoogle() {
    setErrorMsg("");
    setSubmitting(true);

    try {
      await loginWithGoogle();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setErrorMsg(err?.message ?? "Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-3xl font-bold">Signup</h1>

      {errorMsg && (
        <div className="alert alert-error mt-4">
          <span>{errorMsg}</span>
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name (optional)</span>
          </div>
          <input
            className="input input-bordered w-full"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            maxLength={40}
          />
        </label>

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
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Confirm password</span>
          </div>
          <input
            className="input input-bordered w-full"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        <button
          className="btn btn-primary w-full mt-2"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Creating account…" : "Create account"}
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
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
