import { useState } from "react";
import Login from "../component/Layout/Login";
import Button from "../component/UI/Button";
import Logo from "../assets/image/Group 1 (2).svg";
import Signup from "../component/Layout/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthenticationPage() {
  const [LoginPage, setPage] = useState<boolean>(true);
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <div
        className="bg-[] w-screen h-screen md:flex justify-center px-3 overflow-hidden pt-10 
    md:px-25 md:pt-0 md:items-center lg:px-55 xl:px-40 space-y-10"
      >
        <div className="flex space-x-2 mb-21 md:absolute top-5 left-5">
          <img src={Logo} alt="logo" className="w-10" />
          <h1 className="font-bold text-red-950 mt-2 text-xl">
            Daily Starters
          </h1>
        </div>
        <div
          className=" rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-full h-fit p-4 space-y-3
      md:p-10 xl:w-130"
        >
          {LoginPage ? (
            <>
              <Login />
            </>
          ) : (
            <>
              <Signup />
            </>
          )}
          {/* <br />
        <Button className="p-3 h-fit w-fit self-center">
          <img
            src={Google}
            alt="Google Signin/SignUp logo"
            className="w-9 h-9 bg-white rounded-md"
          />
        </Button> */}
          <p className="text-center">
            {LoginPage ? (
              <>
                {" "}
                Don't have an accouunt?{" "}
                <Button
                  onClick={() => setPage(false)}
                  className="font-bold text-green-800"
                  disabled={false}
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                Already have an accouunt?{" "}
                <Button
                  disabled={false}
                  onClick={() => setPage(true)}
                  className="font-bold text-green-800"
                >
                  Login
                </Button>
              </>
            )}
          </p>
        </div>
        {/* <Welcome /> */}
      </div>
    </>
  );
}
