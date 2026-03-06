/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase.js";

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
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }
        return cred.user;
      },

      async login(email, password) {
        requireFirebaseAuth();
        const cred = await signInWithEmailAndPassword(auth, email, password);
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
