import { LayoutDashboardIcon } from "lucide-react";
import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="" className={({ isActive }) => `flex space-x-2`}>
        <LayoutDashboardIcon />
        <h1>Dashboard</h1>
      </NavLink>
    </nav>
  );
}
