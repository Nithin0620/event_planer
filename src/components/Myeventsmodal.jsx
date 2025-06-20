import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setMyEventmodal } from '../Reducer/slices/modalSlics';
import { getMyEventfunction } from "../services/operations/Event";
import EventCard from "./EventCard";
import toast from 'react-hot-toast';

const Myeventsmodal = () => {
  const [myEvents, setMyEvents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyEvent = async () => {
      try {
        const response = await getMyEventfunction();
        if (!response) {
          toast.error("Unable to fetch My Events");
        } else {
          setMyEvents(response);
        }
      } catch (e) {
        console.error(e);
        console.log("Error occurred in the Myeventsmodal.jsx page");
      }
    };
    getMyEvent();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#FFE5B4] w-[90%] max-w-2xl max-h-[80vh] rounded-2xl shadow-lg flex flex-col overflow-hidden">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800">My Events</h2>
          <button
            onClick={() => dispatch(setMyEventmodal(false))}
            className="text-gray-600 hover:text-red-500 transition-all"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {myEvents.length > 0 ? (
            myEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-600">No events found.</p>
          )}
        </div>

        <div className="bg-gray-200 text-center py-2 text-sm text-gray-700">
          All rights reserved &copy; Nithin
        </div>
      </div>
    </div>
  );
};

export default Myeventsmodal;
