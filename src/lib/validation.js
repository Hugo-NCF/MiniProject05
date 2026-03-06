export function isValidEmail(email) {
  const cleaned = String(email ?? "").trim();
  if (!cleaned) return false;

  // Basic format check (intentionally simple; not RFC-perfect).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
}

export function getEmailError(email) {
  const cleaned = String(email ?? "").trim();
  if (!cleaned) return "Email is required.";
  if (!isValidEmail(cleaned)) return "Please enter a valid email address.";
  return null;
}

export function getDisplayNameError(displayName) {
  const cleaned = String(displayName ?? "").trim();
  if (!cleaned) return null; // optional
  if (cleaned.length < 2) return "Name must be at least 2 characters.";
  if (cleaned.length > 40) return "Name must be 40 characters or fewer.";
  return null;
}

export function getPasswordError(password, { minLength = 6 } = {}) {
  const cleaned = String(password ?? "");
  if (!cleaned) return "Password is required.";
  if (cleaned.length < minLength) return `Password must be at least ${minLength} characters.`;
  return null;
}
