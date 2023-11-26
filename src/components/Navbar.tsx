import React, { useEffect, useState } from "react";
import VarianLogo from "../assets/varianLogoSvg.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutApi } from "../api";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logoutApi();

    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-lightBlue w-full lg:w-4/5 py-3 flex items-center justify-between px-5 border-b-[1px] border-darkerGray">
      <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
        <img
          src={VarianLogo}
          alt="Varian Logo"
          className="w-28 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <Link
          to="/"
          className={`ml-0 lg:ml-6 text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/" ? "text-primary" : "text-grayOne"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/patients"
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/patients" ? "text-primary" : "text-grayOne"
          }`}
        >
          Patients
        </Link>

        <Link
          to="/statistics"
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/statistics"
              ? "text-primary"
              : "text-grayOne"
          }`}
        >
          Statistics
        </Link>

        <Link
          to="/logs"
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/logs" ? "text-primary" : "text-grayOne"
          }`}
        >
          Logs
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm lg:text-2xl font-bold text-grayOne border-grayOne border-r-2 pr-5">
          {currentTime}
        </p>

        <Link
          to="/settings"
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/settings" ? "text-primary" : "text-grayOne"
          } hover:text-primary`}
        >
          Settings
        </Link>
        <div
          className="flex items-center justify-center border-2 border-primary rounded-lg px-2 py-1 font-bold text-lg text-primary cursor-pointer hover:bg-primary hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
