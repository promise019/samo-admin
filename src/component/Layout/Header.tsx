// import google from "./../../assets/logo/google logo.svg";

import { useLocation } from "react-router";

export default function Header() {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard";
        break;
      case "/admin/posts":
        return "Published Daily Posts";
        break;
      case "/admin/analytics":
        return "Analytics";
        break;
      case "/admin/settings":
        return "Settings";
        break;
    }
  };
  return (
    <header className="sticky top-0 p-3 w-full bg-red-950 text-white flex justify-between z-10">
      <h1 className="font-bold text-xl">{getTitle()}</h1>
    </header>
  );
}
