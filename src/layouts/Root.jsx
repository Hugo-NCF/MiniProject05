import { Outlet } from "react-router";
import SharedNavbar from "../components/SharedNavbar.jsx";

export default function Root() {
  return (
    <div className="min-h-screen">
      <SharedNavbar />
      <Outlet />
    </div>
  );
}
