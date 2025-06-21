import React from "react";
import { useState,useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import {
  setknowmoremodal,
  setknowmoredata,
} from "../Reducer/slices/modalSlics";

const Knowmoremodal = () => {
   const modalRef = useRef(null); 
  const dispatch = useDispatch();
  const knowmoredata = useSelector((state) => state.modal);
  const event = knowmoredata;

  const handleClose = () => {
    dispatch(setknowmoremodal(false));
    dispatch(setknowmoredata(null));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-orange-50 rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-orange-900">
            {event.eventName} - Details
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-700 hover:text-red-600 text-xl"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm md:text-base text-gray-800">
          <div>
            <p className="font-medium">Event Name:</p>
            <p>{event.eventName}</p>
          </div>
          <div>
            <p className="font-medium">Description:</p>
            <p>{event.description}</p>
          </div>
          <div className="md:flex gap-8">
            <div>
              <p className="font-medium">Category:</p>
              <p>{event.category}</p>
            </div>
            <div>
              <p className="font-medium">Mode:</p>
              <p>{event.mode}</p>
            </div>
          </div>
          <div className="md:flex gap-8">
            <div>
              <p className="font-medium">Date & Time:</p>
              <p>
                {event.date}, {event.time}
              </p>
            </div>
            <div>
              <p className="font-medium">Location:</p>
              <p>{event.location}</p>
            </div>
          </div>
          <div>
            <p className="font-medium">Created By:</p>
            <p>{event.creatorname}</p>
          </div>
          <div>
            <p className="font-medium">Created At:</p>
            <p>{event.createdAt}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t text-center text-xs text-gray-600">
          Rights reserved and Trademark registered by{" "}
          <span className="text-red-500">Nithin ❤️</span>
        </div>
      </div>
    </div>
  );
};

export default Knowmoremodal;
