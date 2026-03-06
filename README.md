# Movies HD (MiniProject05)

**Group Members:** Darius Beckford, Hugo Cruz

Movies HD is a Vite + React **SPA** that uses **React Router (data mode)** for client-side routing and **Firebase Authentication** for user accounts.

It loads a local dataset from `public/movies.json` and provides a dashboard-style browsing experience. Unauthenticated users can view a **Preview** route, while authenticated users can access the full **Dashboard** route.

## Live Link

Add your deployed link here (Netlify/Vercel/Firebase Hosting):

- TBD

## Tech Stack

- Vite + React
- React Router (data router via `createBrowserRouter`)
- Firebase Auth (Email/Password + Google)
- React Context API for global auth state
- TailwindCSS + DaisyUI for UI
- React Icons

## How to Run

Install dependencies:

```bash
npm install
```

Create your environment file (required for auth):

1) Copy `.env.example` to `.env`
2) Fill in your Firebase web app config values

Start dev server:

```bash
npm run dev
```

Build / preview:

```bash
npm run build
npm run preview
```

## Firebase Setup (Auth)

1) Go to https://console.firebase.google.com and create a project.
2) Build → Authentication → Sign-in method → enable:
	- Email/Password
	- Google
3) Project Settings (gear) → Your apps → Web app (`</>`)
4) Copy the config values into `.env` (do not commit `.env`).

This project reads these variables:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Routes (User Flow)

Public:

- `/` → Landing page
- `/login` → Login page
- `/signup` → Signup page
- `/guest` → Preview (guest-friendly “dashboard style” view)

Protected:

- `/dashboard` → Full dashboard (requires authentication)

Errors:

- `/401` → Unauthorized (shown when guests try to access protected routes)
- `*` → 404 Not Found

## Authentication Features

- Signup (Email/Password)
- Login (Email/Password)
- Login with Google
- Logout
- Password reset email (“Change password” from Login page)

### Basic Validation

Client-side + context-level validation is included:

- **Email:** required + basic format check
- **Password:** required + minimum 6 characters
- **Name:** optional; if provided must be 2–40 characters
- **Confirm password:** must match password

## Project Structure (Key Files)

- `src/main.jsx` — Router bootstrapping (`createBrowserRouter`) + `<AuthProvider>`
- `src/routes/MainRouter.js` — Route table (public, guest preview, protected dashboard, error pages)
- `src/context/AuthContext.jsx` — Auth state + Firebase actions (signup/login/google/logout/reset)
- `src/lib/firebase.js` — Firebase initialization (reads `.env`)
- `src/lib/validation.js` — Shared validation helpers

Dashboard UI (reused from MP04 and expanded for MP05 routing/auth):

- `src/App.jsx` — loads movies + shared state (browse selection, wishlist)
- `src/components/MovieSiteLayout.jsx` — dashboard-style navbar + wishlist panel + footer
- `src/components/Home.jsx` — selected movie panel + filtered/sorted list logic
- `src/components/SelectedMovieDetails.jsx` — details panel UI

## MiniProject05 Rubric Alignment (High-Level)

1) SPA + Client-side routing
- Uses React Router with `createBrowserRouter` and nested layouts (`<Outlet />`).

2) Layouts and navigation
- Shared public layout/navbar for public pages.
- Protected dashboard routing for authenticated users.

3) Authentication & authorization
- Firebase Auth integration (Email/Password + Google).
- Auth state managed via React Context API.
- Private routing enforced via a protected layout.

4) Error handling pages
- Dedicated 401 Unauthorized page for protected-route access.
- Dedicated 404 Not Found page.

5) Environment configuration
- Firebase config lives in `.env` (see `.env.example`) and is intended to be excluded from git.
