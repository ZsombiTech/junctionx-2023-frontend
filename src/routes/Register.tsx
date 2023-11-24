import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../api";
import { StatusCodes } from "http-status-codes";
import Loading from "../components/Loading";

export default function Register() {
  const isMobile = window.innerWidth <= 640;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (type: number) => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      toast.error("Please fill out all fields", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    setLoading(true);

    const registerRequest = await registerApi({
      email,
      password,
      firstName,
      lastName,
    });

    setLoading(false);

    if (registerRequest.status === StatusCodes.OK) {
      toast.success("Successful register", {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      navigate("/login");
    } else {
      toast.error(registerRequest.data.msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div
        className={`${
          isMobile
            ? "bg-[url('assets/mobileLoginBackground.png')]"
            : "bg-[url('assets/desktopLoginBackground.jpg')]"
        } h-[100vh] w-full bg-contain bg-cover flex justify-center items-center`}
      >
        <div className="bg-purple m-5 w-full md:w-3/4 lg:w-1/3 p-8 bg-opacity-10 backdrop-blur-sm flex flex-col items-center rounded-lg">
          <h2 className="text-white text-5xl">Register</h2>
          <input
            type="text"
            placeholder="First Name"
            className="w-72 h-10 mt-8 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-72 h-10 mt-6 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-72 h-10 mt-6 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-72 h-10 mt-6 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center gap-2 w-full lg:w-1/3">
            <button
              className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white"
              onClick={() => handleRegister(0)}
            >
              Nurse
            </button>
            <button
              className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white"
              onClick={() => handleRegister(1)}
            >
              Patient
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
    </>
  );
}
