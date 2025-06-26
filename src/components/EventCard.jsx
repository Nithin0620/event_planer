import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setknowmoremodal,
  setknowmoredata,
  setupdatemodal,
  setUpdateeventID,
} from "../Reducer/slices/modalSlics";

const EventCard = ({ data }) => {
  const dispatch = useDispatch();
  // const updateeventID = useSelector((state) => state.modal);

  console.log("at event card");
  console.log(data);
  const handleKnowMoreClick = () => {
    dispatch(setknowmoremodal(true));
    dispatch(setknowmoredata(data));
  };
  const handleUpdateClick = () => {
    console.log("update event handler")
    dispatch(setupdatemodal(true));
    dispatch(setUpdateeventID(data._id));
  };

  return (
    <div className="bg-white hover:shadow-xl rounded-md shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition">
      {/* Event Info */}
      <div className="space-y-1 text-gray-800">
        <h2 className="text-lg font-semibold">{data.eventName}</h2>
        <p className="text-sm text-gray-600">
          {data.date}, {data.time} • {data.location}
        </p>
        <p className="text-sm text-gray-500">
          By {data.creatorname || "John Doe"} •{" "}
          {typeof data.category === "object" && data.category !== null
            ? data.category.creatorName || data.category.categoryName || ""
            : data.category || ""}
        </p>
        <p className="text-sm">
          {data.description.length > 50
            ? data.description.slice(0, 50).trim() + "..."
            : data.description}
        </p>
      </div>

      {/* Know More Button */}
      <div className="flex flex-col gap-5 justify-center">
        <button
          onClick={handleUpdateClick}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded border border-gray-300"
        >
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
