/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase.js";
import {
  getDisplayNameError,
  getEmailError,
  getPasswordError,
  isValidEmail,
} from "../lib/validation.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!auth) {
      setUser(null);
      setInitializing(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setInitializing(false);
    });

    return () => unsub();
  }, []);

  const value = useMemo(() => {
    const requireFirebaseAuth = () => {
      if (!auth) {
        throw new Error(
          "Firebase Auth is not configured yet. Create a .env (see .env.example) and restart `npm run dev`.",
        );
      }
    };

    return {
      user,
      initializing,

      async signup(email, password, displayName) {
        requireFirebaseAuth();

        const cleanedEmail = String(email ?? "").trim();
        const cleanedPassword = String(password ?? "");
        const cleanedName = String(displayName ?? "").trim();

        const emailErr = getEmailError(cleanedEmail);
        if (emailErr) throw new Error(emailErr);

        const pwErr = getPasswordError(cleanedPassword, { minLength: 6 });
        if (pwErr) throw new Error(pwErr);

        const nameErr = getDisplayNameError(cleanedName);
        if (nameErr) throw new Error(nameErr);

        const cred = await createUserWithEmailAndPassword(
          auth,
          cleanedEmail,
          cleanedPassword,
        );

        if (cleanedName) {
          await updateProfile(cred.user, { displayName: cleanedName });
        }
        return cred.user;
      },

      async login(email, password) {
        requireFirebaseAuth();

        const cleanedEmail = String(email ?? "").trim();
        const cleanedPassword = String(password ?? "");

        const emailErr = getEmailError(cleanedEmail);
        if (emailErr) throw new Error(emailErr);

        if (!cleanedPassword) {
          throw new Error("Password is required.");
        }

        const cred = await signInWithEmailAndPassword(
          auth,
          cleanedEmail,
          cleanedPassword,
        );
        return cred.user;
      },

      async loginWithGoogle() {
        requireFirebaseAuth();
        if (!googleProvider) {
          throw new Error(
            "Google provider is not configured. Check Firebase config and restart `npm run dev`.",
          );
        }
        const cred = await signInWithPopup(auth, googleProvider);
        return cred.user;
      },

      async resetPassword(email) {
        requireFirebaseAuth();
        const cleaned = String(email ?? "").trim();
        if (!cleaned) {
          throw new Error("Please enter your email address first.");
        }
        if (!isValidEmail(cleaned)) {
          throw new Error("Please enter a valid email address.");
        }
        await sendPasswordResetEmail(auth, cleaned);
      },

      async logout() {
        requireFirebaseAuth();
        await signOut(auth);
      },
    };
  }, [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}
