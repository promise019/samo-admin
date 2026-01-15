import { LayoutDashboardIcon, Settings } from "lucide-react";
import { NavLink } from "react-router";
import google from "../../assets/logo/google logo.svg";

export default function NavBar() {
  return (
    <nav className="h-screen w-[12%] space-y-2 bg-gray-200 pt-4 sticky top-0">
      <div className="flex space-x-2 mb-5 px-3">
        <img src={google} alt="" className="w-10 h-10" />{" "}
        <h1 className="font-bold text-2xl text-blue-700">GooGle</h1>
      </div>
      <NavLink
        to="dashboard"
        className={({ isActive }) =>
          `flex space-x-2 lg:p-3 font-bold rounded-r-lg ${
            isActive ? "bg-blue-700 text-white font-bold" : ""
          }`
        }
      >
        <LayoutDashboardIcon />
        <h1 className="hidden lg:inline-block">Dashboard</h1>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `flex space-x-2 lg:p-3 rounded-r-lg ${
            isActive ? "bg-blue-700 text-white font-bold" : ""
          }`
        }
      >
        <Settings />
        <h1 className="hidden lg:inline-block">Settings</h1>
      </NavLink>
    </nav>
  );
}
