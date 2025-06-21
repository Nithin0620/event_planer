import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setknowmoremodal,
  setknowmoredata,
  setupdatemodal,
  setUpdateeventID
} from "../Reducer/slices/modalSlics";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const updateeventID = useSelector((state)=>state.modal);

  const handleKnowMoreClick = () => {
    dispatch(setknowmoremodal(true));
    dispatch(setknowmoredata(event));
  };
  const handleUpdateClick= ()=>{
    setupdatemodal(true);
    setUpdateeventID(event._id)

  }

  return (
    <div className="bg-white rounded-md shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition">
      {/* Event Info */}
      <div className="space-y-1 text-gray-800">
        <h2 className="text-lg font-semibold">{event.eventName}</h2>
        <p className="text-sm text-gray-600">
          {event.date}, {event.time} • {event.location}
        </p>
        <p className="text-sm text-gray-500">
          By {event.creatorname} • {event.category}
        </p>
        <p className="text-sm">
          {event.description.length > 50
            ? event.description.slice(0, 50).trim() + "..."
            : event.description}
        </p>
      </div>

      {/* Know More Button */}
      <div className="flex flex-col justify-center">
        <button onClick={handleUpdateClick} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded border border-gray-300">
          Update Event
        </button>
        <button
          onClick={handleKnowMoreClick}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded border border-gray-300"
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default EventCard;
