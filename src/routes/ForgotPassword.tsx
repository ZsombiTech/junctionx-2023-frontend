import React, { useState } from "react";
import { Link } from "react-router-dom";
import VarianLogo from "../assets/varianLogo.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-[url('assets/healthcareBackground.webp')] h-[100vh] w-full bg-contain bg-cover flex justify-center items-center">
      <div className="bg-blue-700 m-5 w-full md:w-3/4 lg:w-1/3 p-8 bg-opacity-90 flex flex-col items-center rounded-lg">
        <img src={VarianLogo} alt="Varian Logo" className="w-72 mt-5" />
        <input
          type="email"
          placeholder="Email"
          className="w-72 h-10 mt-12 p-2 rounded-md bg-blue-300 text-white border-2 border-blue-300 focus:outline-none placeholder-white placeholder:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="h-10 px-2 mt-6 p-2 rounded-md bg-blue-500 font-bold text-white focus:outline-none placeholder-white hover:bg-blue-300"
          onClick={() => {}}
        >
          Reset your password
        </button>

        <Link to="/login" className="text-white font-bold mt-4 text-sm">
          or <span className="underline">Login to your account</span>
        </Link>
      </div>
    </div>
  );
}
