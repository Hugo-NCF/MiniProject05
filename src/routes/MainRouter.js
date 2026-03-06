import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

import LandingHome from "../components/LandingHome.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/SignUp.jsx";
import Dashboard from "../components/Dashboard.jsx";
import GuestPage from "../components/GuestPage.jsx";
import Error1 from "../components/Error1.jsx";
import Error2 from "../components/Error2.jsx";
import ProtectedLayout from "../layouts/ProtectedLayout.jsx";

const MainRouter = [
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingHome },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },

      // second error page (in addition to 404)
      { path: "401", Component: Error2 },

      // 404 for public pages
      { path: "*", Component: Error1 },
    ],
  },

  // Guest dashboard (public)
  {
    path: "/guest",
    Component: AppLayout,
    children: [
      { index: true, Component: GuestPage },
      // 404 for /guest/*
      { path: "*", Component: Error1 },
    ],
  },

  // App shell (dashboard) routes
  {
    path: "/dashboard",
    Component: ProtectedLayout,
    children: [
      { index: true, Component: Dashboard },
      // 404 for /dashboard/*
      { path: "*", Component: Error1 },
    ],
  },
];

export default MainRouter;
