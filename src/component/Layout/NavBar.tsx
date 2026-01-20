import {
  AlignStartVerticalIcon,
  LayoutDashboardIcon,
  PodcastIcon,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router";
import logo from "../../assets/image/Group 1 (2).svg";

export default function NavBar() {
  return (
    <nav className="w-screen z-10 px-8 md:px-0 justify-between bottom-0 fixed flex md:block md:h-screen md:w-fit space-y-2 bg-red-950 pt-4 md:sticky md:top-0 text-white">
      <div className="hidden md:flex space-x-4 mb-5 px-3">
        <img src={logo} alt="" className="w-10 h-10" />{" "}
        <h1 className="font-bold text-2xl text-white">Daily Starters</h1>
      </div>
      <NavLink
        to="dashboard"
        className={({ isActive }) =>
          `rounded-full p-2 md:rounded-l-none md:flex md:space-x-2 lg:p-3 font-bold md:rounded-r-lg ${
            isActive ? "bg-red-900 text-white font-bold" : ""
          }`
        }
      >
        <LayoutDashboardIcon />
        <h1 className="hidden lg:inline-block">Dashboard</h1>
      </NavLink>
      <NavLink
        to="posts"
        className={({ isActive }) =>
          `rounded-full p-2 md:rounded-l-none md:flex md:space-x-4 lg:p-3 font-bold md:rounded-r-lg ${
            isActive ? "bg-red-900 text-white font-bold" : ""
          }`
        }
      >
        <PodcastIcon />
        <h1 className="hidden lg:inline-block">Posts</h1>
      </NavLink>
      <NavLink
        to="dashboard"
        className={({ isActive }) =>
          `rounded-full p-2 md:rounded-l-none md:flex md:space-x-4 lg:p-3 font-bold md:rounded-r-lg ${
            isActive ? "bg-red-900 text-white font-bold" : ""
          }`
        }
      >
        <AlignStartVerticalIcon />
        <h1 className="hidden lg:inline-block">Statistics</h1>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `rounded-full p-2 md:rounded-l-none md:flex md:space-x-4 lg:p-3 md:rounded-r-lg ${
            isActive ? "bg-red-900 text-white font-bold" : ""
          }`
        }
      >
        <Settings />
        <h1 className="hidden lg:inline-block">Settings</h1>
      </NavLink>
    </nav>
  );
}
