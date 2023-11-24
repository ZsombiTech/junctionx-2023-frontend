import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSSOIcon from "../assets/googleIcon.webp";
import { toast } from "react-toastify";
import { getMeApi, loginApi } from "../api";
import { StatusCodes } from "http-status-codes";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentUser } from "../redux/reducers/appReducer";

export default function Login() {
  const isMobile = window.innerWidth <= 640;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill out all fields", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    const loginRequest = await loginApi({ email, password });

    if (loginRequest.status === StatusCodes.OK) {
      toast.success("Successful login", {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      const getMeRequest = await getMeApi();

      if (getMeRequest.status === StatusCodes.OK) {
        dispatch(setCurrentUser(getMeRequest.data));
        navigate("/");
      } else {
        toast.error("Error getting your account information", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } else {
      toast.error(loginRequest.data.msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <div
      className={`${
        isMobile
          ? "bg-[url('assets/mobileLoginBackground.png')]"
          : "bg-[url('assets/healthcareBackground.webp')]"
      } h-[100vh] w-full bg-contain bg-cover flex justify-center items-center`}
    >
      <div className="bg-purple m-5 w-full md:w-3/4 lg:w-1/3 p-8 bg-opacity-10 backdrop-blur-sm flex flex-col items-center rounded-lg">
        <h2 className="text-white text-5xl">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-72 h-10 mt-8 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
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
            onClick={handleLogin}
          >
            Management
          </button>
          <button
            className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <Link to="/register" className="text-white mt-4 text-sm">
          Haven’t created an account yet?
          <span className="text-primary underline font-bold ml-2">
            Register here
          </span>
        </Link>

        <h2 className="text-center text-white uppercase text-xl mt-4">OR</h2>
        <a
          className="mt-3 px-10 py-1 flex items-center justify-center bg-white rounded-full text-black hover:bg-black hover:text-white"
          href={`${process.env.REACT_APP_BACKEND_URL}/v1/auth/google`}
        >
          <img
            src={GoogleSSOIcon}
            alt="Google SSO Icon"
            className="w-8 h-8 mr-5"
          />
          <h3 className="text-base">Login with Google</h3>
        </a>
      </div>
    </div>
  );
}
