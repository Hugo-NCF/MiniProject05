import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const REQUIRED_FIREBASE_ENV_VARS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const missingFirebaseEnvVars = REQUIRED_FIREBASE_ENV_VARS.filter(
  (key) => !import.meta.env[key],
);

if (missingFirebaseEnvVars.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(
    `[firebase] Missing env vars: ${missingFirebaseEnvVars.join(
      ", ",
    )}. Create a .env (see .env.example).`,
  );
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const shouldInitFirebase = missingFirebaseEnvVars.length === 0;

export const app = (() => {
  if (!shouldInitFirebase) return null;
  try {
    return initializeApp(firebaseConfig);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[firebase] Failed to initialize Firebase: ${String(err)}`);
    return null;
  }
})();

export const auth = app ? getAuth(app) : null;
export const googleProvider = app ? new GoogleAuthProvider() : null;
