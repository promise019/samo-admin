import { Outlet } from "react-router";
import NavBar from "../component/Layout/NavBar";

export default function AdminDashboard() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}
