import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io";
import { IMG } from "../assets/image.png";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { sendOtpfunction } from "../services/operations/Auth";

const Signup = () => {
  const {
    register,
    // getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(beforeSignupdata(data));
    const response = await sendOtpfunction(data.email);
    if(!response?.success){
      toast.error("Failed to send otp for email Verification");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-300 to-blue-300 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden"
      >

        <div className="w-full md:w-2/3 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-[#122B49] mb-6 text-center md:text-left">
            Sign Up for Free
          </h1>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                placeholder="First Name"
                className="w-full p-2 rounded-md bg-white/30 placeholder-[#122B49] text-[#122B49] outline-none"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last Name is required" })}
                placeholder="Last Name"
                className="w-full p-2 rounded-md bg-white/30 placeholder-[#122B49] text-[#122B49] outline-none"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>


          <div className="mb-4">
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email Id is required" })}
              placeholder="Email"
              className="w-full p-2 rounded-md bg-white/30 placeholder-[#122B49] text-[#122B49] outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>


          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full p-2 rounded-md bg-white/30 placeholder-[#122B49] text-[#122B49] outline-none pr-10"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-[#122B49] cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              placeholder="Confirm Password"
              className="w-full p-2 rounded-md bg-white/30 placeholder-[#122B49] text-[#122B49] outline-none pr-10"
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-[#122B49] cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>


          <div className="flex items-center mb-4 text-[#122B49]">
            <input
              type="checkbox"
              id="AcceptTerms"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              className="accent-[#122B49] mr-2"
            />
            <label htmlFor="AcceptTerms">I accepted the terms.</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#122B49] text-white py-2 px-6 rounded-full hover:bg-[#0f223b] transition"
          >
            Create Account
          </button>
        </div>


        <div className="hidden md:flex w-full md:w-1/3 items-center justify-center p-6 bg-white/10">
          <div className="flex flex-col items-center rounded-full shadow-[0px_0px_65px_44px_#ffdbee]">
            <img src={IMG} alt="Glassmorphism" className="max-w-[200px]" />
            <h2 className="text-[#122B49] mt-4 font-semibold">WELCOME TO</h2>
            <p className="text-[#122B49] text-sm">Event Manager</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;