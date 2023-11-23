import React, { useState } from "react";
import { Link } from "react-router-dom";
import VarianLogo from "../assets/varianLogo.jpg";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-[url('assets/healthcareBackground.webp')] h-[100vh] w-full bg-contain bg-cover flex justify-center items-center">
      <div className="bg-blue-700 m-5 w-full md:w-3/4 lg:w-1/3 p-8 bg-opacity-90 flex flex-col items-center rounded-lg">
        <img src={VarianLogo} alt="Varian Logo" className="w-72 mt-5" />
        <input
          type="text"
          placeholder="First Name"
          className="w-72 h-10 mt-12 p-2 rounded-md bg-blue-300 text-white border-2 border-blue-300 focus:outline-none placeholder-white placeholder:text-sm"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-72 h-10 mt-6 p-2 rounded-md bg-blue-300 text-white border-2 border-blue-300 focus:outline-none placeholder-white placeholder:text-sm"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-72 h-10 mt-6 p-2 rounded-md bg-blue-300 text-white border-2 border-blue-300 focus:outline-none placeholder-white placeholder:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-72 h-10 mt-6 p-2 rounded-md bg-blue-300 text-white border-2 border-blue-300 focus:outline-none placeholder-white placeholder:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="h-10 mt-6 p-2 rounded-md bg-blue-500 font-bold text-white focus:outline-none placeholder-white w-1/3 hover:bg-blue-300"
          onClick={() => {}}
        >
          Register
        </button>

        <Link to="/login" className="text-white font-bold mt-4 text-sm">
          or <span className="underline">Login to your account</span>
        </Link>
        <Link
          to="/forgotpassword"
          className="cursor-pointer text-white font-bold mt-1 text-sm"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
