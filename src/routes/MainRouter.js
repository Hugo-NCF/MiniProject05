import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

import LandingHome from "../components/LandingHome.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/SignUp.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Unauthorized from "../components/Unauthorized.jsx";
import NotFound from "../components/NotFound.jsx";

const MainRouter = [
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingHome },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },

      // second error page (in addition to 404)
      { path: "401", Component: Unauthorized },

      // 404 for public pages
      { path: "*", Component: NotFound },
    ],
  },

  // App shell (dashboard) routes
  {
    path: "/dashboard",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      // 404 for /dashboard/*
      { path: "*", Component: NotFound },
    ],
  },
];

export default MainRouter;
