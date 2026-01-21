import { Outlet, useNavigate } from "react-router"; // Added useNavigate
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Loader2 } from "lucide-react";

import NavBar from "../component/Layout/NavBar";
import Header from "../component/Layout/Header";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is logged in, redirect to login page
        navigate("/");
      } else {
        // User is authenticated
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Show a full-screen loader while checking the session
  // This prevents the "flash" of the dashboard before the redirect
  if (checkingAuth) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-red-900" size={48} />
        <p className="mt-4 text-gray-600 font-medium">Verifying Session...</p>
      </div>
    );
  }
  return (
    <main className="w-full min-h-screen flex">
      <NavBar />
      <main className="w-screen md:w-[90%]">
        <Header />
        <Outlet />
      </main>
    </main>
  );
}
