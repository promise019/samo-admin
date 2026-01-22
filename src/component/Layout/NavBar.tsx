import {
  AlignStartVerticalIcon,
  Clock,
  LayoutDashboardIcon,
  PodcastIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import logo from "../../assets/image/Group 1 (2).svg";

export default function NavBar() {
  /**
   * Adaptive dynamic classes:
   * Mobile: Stacked icon/text, small font, no wrapping
   * Desktop: Row layout, larger font, left-aligned
   */
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl flex flex-col md:flex-row items-center justify-center md:justify-start 
     p-2 md:p-3 md:rounded-l-none md:rounded-r-lg md:space-x-3 transition-all duration-200
     ${isActive ? "bg-red-900 text-white font-bold shadow-lg" : "text-gray-400 hover:text-white hover:bg-red-900/20"}`;

  return (
    <nav
      className="w-screen z-50 px-2 bottom-0 fixed flex flex-row justify-around items-center h-20 
                    md:h-screen md:w-64 md:flex-col md:justify-start md:space-y-2 md:bg-red-950 md:sticky md:top-0 
                    bg-red-950 border-t border-red-900/30 md:border-t-0 text-white pb-safe"
    >
      {/* BRANDING - Hidden on mobile, prominent on Desktop */}
      <div className="hidden md:flex items-center space-x-4 mb-8 px-4 pt-6 w-full">
        <img src={logo} alt="Thought Starters Logo" className="w-10 h-10" />
        <h1 className="font-bold text-xl lg:text-2xl tracking-tight text-white">
          Thought Starters
        </h1>
      </div>

      {/* NAVIGATION LINKS CONTAINER */}
      <div className="flex flex-row justify-around w-full md:flex-col md:px-0 md:space-y-1">
        <NavLink to="dashboard" className={navLinkClass}>
          <LayoutDashboardIcon size={22} className="md:w-5 md:h-5" />
          <span className="text-[10px] md:text-sm lg:text-base whitespace-nowrap mt-1 md:mt-0">
            Dashboard
          </span>
        </NavLink>

        <NavLink to="posts" className={navLinkClass}>
          <PodcastIcon size={22} className="md:w-5 md:h-5" />
          <span className="text-[10px] md:text-sm lg:text-base whitespace-nowrap mt-1 md:mt-0">
            Posts
          </span>
        </NavLink>

        <NavLink to="scheduleposts" className={navLinkClass}>
          <Clock size={22} className="md:w-5 md:h-5" />
          <span className="text-[10px] md:text-sm lg:text-base whitespace-nowrap mt-1 md:mt-0">
            {/* Shortened for mobile space, full for desktop */}
            <span className="md:hidden">Scheduled</span>
            <span className="hidden md:inline">Scheduled Posts</span>
          </span>
        </NavLink>

        <NavLink to="analytics" className={navLinkClass}>
          <AlignStartVerticalIcon size={22} className="md:w-5 md:h-5" />
          <span className="text-[10px] md:text-sm lg:text-base whitespace-nowrap mt-1 md:mt-0">
            Statistics
          </span>
        </NavLink>
      </div>

      {/* Spacer for Desktop to push content up */}
      <div className="hidden md:flex flex-grow" />
    </nav>
  );
}
