import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { GoPersonFill } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-[#122B49] p-4">
            <BsPerson className="text-white text-3xl" />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/30 p-2 rounded-md mb-4">
          <GoPersonFill className="text-[#122B49]" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ID"
            className="bg-transparent outline-none w-full text-[#122B49] placeholder-[#122B49]"
          />
        </div>

        <div className="flex items-center bg-white/30 p-2 rounded-md mb-4">
          <TbLockPassword className="text-[#122B49]" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent outline-none w-full ml-2 text-[#122B49] placeholder-[#122B49]"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-[#122B49]"
          >
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mb-6 text-[#122B49]">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              id="rememberme"
              className="accent-[#122B49]"
            />
            Remember me
          </label>
          <button className="hover:underline">Forgot Password?</button>
        </div>

        <div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#122B49] text-white py-2 rounded-full hover:bg-[#0f223b] transition"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
