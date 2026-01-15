import { Outlet } from "react-router";
import NavBar from "../component/Layout/NavBar";
import Header from "../component/Layout/Header";

export default function AdminDashboard() {
  return (
    <main className="w-full min-h-screen flex">
      <NavBar />
      <main className="w-[90%]">
        <Header />
        <Outlet />
      </main>
    </main>
  );
}
