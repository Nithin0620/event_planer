import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { signUpfunction } from "../services/operations/Auth";
import { toast } from "react-hot-toast";

const Verifyemail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const beforeSignupdata = useSelector((state) => state.auth.beforeSignupdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!beforeSignupdata) {
      navigate("/signup");
    }
  }, [beforeSignupdata, navigate]);

  const handleVerifySignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        beforeSignupdata;

      const payload = {firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp}
        console.log("data before calling signupfunction",payload)
      const response = await signUpfunction(
          payload , dispatch , navigate
      );
      console.log(response)

      if (response?.data?.success) {
        toast.success("Email Verified and Signup Successful!");
        navigate("/login");
      } else {
        toast.error("Invalid OTP or Signup Failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#fff3e6] px-4 py-10">
      {loading ? (
        <div className="spinner w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <div className="bg-white max-w-[500px] w-full shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">
            Verify Email
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            A verification code has been sent to your email. Enter the code
            below.
          </p>

          <form onSubmit={handleVerifySignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="number"
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px ",
                  }}
                  className="w-[48px] lg:w-[60px] border-[1.5px] bg-black-800 rounded-[0.5rem] text-orange-900 aspect-square border-orange-600 text-center focus:border-0 focus:outline-orange-200"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "5px",
              }}
            />

            <button
              type="submit"
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-orange-700">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-orange-900 transition"
              onClick={() => navigate("/signup")}
            >
              <BiArrowBack className="text-lg" />
              Back to Signup
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-orange-900 transition"
              onClick={() => {
                if (beforeSignupdata?.email) {

                  toast("OTP Resent to your email");
                } else {
                  toast.error("Missing email information.");
                }
              }}
            >
              <RxCountdownTimer className="text-lg" />
              Resend Code
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verifyemail;
