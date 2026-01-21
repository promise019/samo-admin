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
    <nav className="w-screen z-10 px-2 md:px-0 justify-between bottom-0 fixed flex md:block md:h-screen md:w-fit space-y-2 bg-red-950 pt-4 md:sticky md:top-0 text-white">
      <div className="hidden md:flex space-x-4 mb-5 px-3">
        <img src={logo} alt="" className="w-10 h-10" />{" "}
        <h1 className="font-bold text-2xl text-white">Thought Starters</h1>
      </div>
      <NavLink
        to="dashboard"
        // className={({ isActive }) =>
        //   `rounded-full grid grid-cols-1 p-2 md:rounded-l-none md:flex md:space-x-2 lg:p-3 md:rounded-r-lg ${
        //     isActive ? "bg-red-900 text-white font-bold" : ""
        //   }`
        // }
        className={({ isActive }) =>
          `rounded-full grid grid-cols-1 justify-items-center text-center p-2 md:rounded-l-none md:flex md:items-center md:justify-start md:text-left md:space-x-2 
          lg:p-3 md:rounded-r-lg ${isActive ? "bg-red-900 text-white font-bold" : "text-gray-400"}`
        }
      >
        <LayoutDashboardIcon />
        <h1 className=" lg:inline-block">Dashboard</h1>
      </NavLink>
      <NavLink
        to="posts"
        className={({ isActive }) =>
          `rounded-full grid grid-cols-1 justify-items-center text-center p-2 md:rounded-l-none md:flex md:items-center md:justify-start md:text-left md:space-x-2 
          lg:p-3 md:rounded-r-lg ${isActive ? "bg-red-900 text-white font-bold" : "text-gray-400"}`
        }
      >
        <PodcastIcon />
        <h1 className="lg:inline-block">Posts</h1>
      </NavLink>
      <NavLink
        to="statistics"
        className={({ isActive }) =>
          `rounded-full grid grid-cols-1 justify-items-center text-center p-2 md:rounded-l-none md:flex md:items-center md:justify-start md:text-left md:space-x-2 
          lg:p-3 md:rounded-r-lg ${isActive ? "bg-red-900 text-white font-bold" : "text-gray-400"}`
        }
      >
        <AlignStartVerticalIcon />
        <h1 className="lg:inline-block">Statistics</h1>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `rounded-full grid grid-cols-1 justify-items-center text-center p-2 md:rounded-l-none md:flex md:items-center md:justify-start md:text-left md:space-x-2 
          lg:p-3 md:rounded-r-lg ${isActive ? "bg-red-900 text-white font-bold" : "text-gray-400"}`
        }
      >
        <Settings />
        <h1 className="lg:inline-block">Settings</h1>
      </NavLink>
    </nav>
  );
}
