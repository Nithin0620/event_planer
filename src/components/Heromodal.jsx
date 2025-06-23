import React from "react";
import IMG from "../assets/Heropage-bg.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setcreateEventmodal,setheroPagemodal} from "../Reducer/slices/modalSlics";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";

const Heromodal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleCreateEventClick = () => {
    if (token === null) {
      toast.error("Please login yourself to create Events");
    } else {
      dispatch(setcreateEventmodal(true));
      dispatch(setheroPagemodal(false));
    }
  };

  const handleViewEventsClick = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen z-10 place-items-center w-[440px] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${IMG})` }}
    >
      <div className="bg-peach-50 bg-opacity-90 w-full max-w-2xl rounded-2xl p-6 shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(setheroPagemodal(false))}
            className="text-2xl text-gray-700 hover:text-red-500 transition"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-800">
            🚀 Discover, Create & Join Amazing Tech Events
          </h1>
          <h2 className="text-lg md:text-xl text-orange-700">
            Browse webinars, hackathons & more. Connect with peers.
          </h2>
          {token === null && (
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
              <button
                onClick={() => navigate("/login")}
                className="text-white px-6 py-2 rounded-lg border-0 border-white hover:border-2 hover:border-yellow-50 transition"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-white px-6 py-2 rounded-lg  border-0 border-white hover:border-2 hover:border-yellow-5 transition"
              >
                Sign Up
              </button>
            </div>
          )}
          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
            <button
              onClick={handleCreateEventClick}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Create Event
            </button>
            <button
              onClick={handleViewEventsClick}
              className="bg-orange-200 text-orange-800 px-6 py-2 rounded-lg hover:bg-orange-300 transition"
            >
              View Upcoming Events
            </button>
          </div>
          <div className="mt-6 text-orange-900 italic font-medium">
            Empowering communities through collaboration and code.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heromodal;
