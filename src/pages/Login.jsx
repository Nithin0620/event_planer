import React, { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { GoPersonFill } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { logInfunction } from "../services/operations/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const callLogin = async()=>{
      try{
        const response = await logInfunction(email,password); 
        if(response.data.success){
          navigate("/");
        }
      }
      catch(e){
        console.log(e);
        console.log("Error occured in the api calling function in login.jsx")
      }
    }
    callLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 px-4 py-8">
      <div className="bg-white/20 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm">
        {/* Avatar Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-[#122B49] p-4 shadow-md">
            <BsPerson className="text-white text-3xl" />
          </div>
        </div>

        {/* Email Input */}
        <div className="flex items-center gap-2 bg-white/30 p-2 rounded-md mb-4">
          <GoPersonFill className="text-[#122B49]" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ID"
            className="bg-transparent outline-none w-full text-[#122B49] placeholder-[#122B49] text-sm"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center bg-white/30 p-2 rounded-md mb-4">
          <TbLockPassword className="text-[#122B49]" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent outline-none w-full ml-2 text-[#122B49] placeholder-[#122B49] text-sm"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-[#122B49]"
          >
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-6 text-[#122B49] gap-2 sm:gap-0">
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

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#122B49] text-white py-2 rounded-full hover:bg-[#0f223b] transition"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
