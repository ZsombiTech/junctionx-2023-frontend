import React from "react";
import VarianLogo from "../assets/varianLogoSvg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutApi } from "../api";
import { StatusCodes } from "http-status-codes";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const logoutRequest = await logoutApi();

    if (logoutRequest.status === StatusCodes.OK) navigate("/login");
  };

  return (
    <div className="bg-lightBlue w-full lg:w-4/5 py-3 flex items-center justify-between px-5 border-b-[1px] border-darkerGray">
      <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
        <img src={VarianLogo} alt="Varian Logo" className="w-28" />
        <p
          className={`ml-0 lg:ml-6 text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/" ? "text-primary" : "text-grayOne"
          }`}
        >
          Dashboard
        </p>

        <p
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/patients" ? "text-primary" : "text-grayOne"
          }`}
        >
          Patients
        </p>
        <p
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/nurses" ? "text-primary" : "text-grayOne"
          }`}
        >
          Nurses
        </p>
        <p
          className={`text-sm lg:text-lg font-medium cursor-pointer ${
            location.pathname === "/logs" ? "text-primary" : "text-grayOne"
          }`}
        >
          Logs
        </p>
      </div>
      <div
        className="flex items-center justify-center border-2 border-primary rounded-lg px-2 py-1 font-bold text-lg text-primary cursor-pointer hover:bg-primary hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}
