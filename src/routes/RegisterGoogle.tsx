import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../api";
import { StatusCodes } from "http-status-codes";

export default function RegisterGoogle() {
  const isMobile = window.innerWidth <= 640;

  const navigate = useNavigate();
  const [cancerType, setCancerType] = useState("");
  const [age, setAge] = useState(0);
  const [disablities, setDisabilities] = useState("");
  const [weight, setWeight] = useState(0);

  const handleRegister = async (type: number) => {};

  return (
    <div
      className={`${
        isMobile
          ? "bg-[url('assets/mobileLoginBackground.png')]"
          : "bg-[url('assets/healthcareBackground.webp')]"
      } h-[100vh] w-full bg-contain bg-cover flex justify-center items-center`}
    >
      <div className="bg-purple m-5 w-full px-3 p-8 bg-opacity-10 backdrop-blur-sm flex flex-col items-center rounded-lg">
        <h2 className="text-white text-5xl">Register</h2>
        <button
          className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white"
          onClick={() => handleRegister(1)}
        >
          Register as Nurse
        </button>

        <h2 className="text-center text-white uppercase text-lg my-4">OR</h2>

        <div className="flex flex-col items-center justify-center w-full gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none py-1 bg-lighterGray shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] rounded-full px-8 text-light-gray focus:outline-none cursor-pointer"
                value={cancerType}
                onChange={(e) => {
                  setCancerType(e.target.value);
                }}
                placeholder="Cancer Type"
              >
                <option value="LINAC #2 - VitalBeam">
                  LINAC #2 - VitalBeam
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                <svg
                  className="w-6 h-6 fill-current text-black"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </div>
            <input
              type="number"
              placeholder="Age"
              className="w-10 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none py-1 bg-lighterGray shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] rounded-full px-8 text-light-gray focus:outline-none cursor-pointer"
                value={disablities}
                onChange={(e) => {
                  setDisabilities(e.target.value);
                }}
                placeholder="Disabilities"
              >
                <option value="LINAC #2 - VitalBeam">
                  LINAC #2 - VitalBeam
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                <svg
                  className="w-6 h-6 fill-current text-black"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </div>
            <input
              type="number"
              placeholder="Weight"
              className="w-10 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white"
            onClick={() => handleRegister(1)}
          >
            Register as Patient
          </button>
        </div>

        <Link to="/login" className="text-white mt-4 text-sm">
          Already have an account?
          <span className="text-primary underline font-bold ml-2">
            Login here
          </span>
        </Link>
      </div>
    </div>
  );
}
