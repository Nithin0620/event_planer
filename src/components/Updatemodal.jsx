import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { updateEventfunction, getAllEventByIdfunction } from "../services/operations/Event";
import toast from "react-hot-toast";
import { setupdatemodal } from "../Reducer/slices/modalSlics";

const Updatemodal = () => {
  const [EventDetail, setEventDatail] = useState(null);
  const dispatch = useDispatch();
  const updateeventID = useSelector((state) => state.modal.updateeventID);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await getAllEventByIdfunction(updateeventID, dispatch);
        console.log("event details :" , response.data)
        if (response) setEventDatail(response.data);
      } catch (e) {
        console.log(e);
        console.log("error occurred in fetching Event by id in updateEventmodal.jsx");
      }
    };
    fetchAllEvents();
  }, [updateeventID, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {}, // Start with empty, will reset later
  });

  // Reset form values when EventDetail changes
  useEffect(() => {
    if (EventDetail) {
      reset(EventDetail);
    }
  }, [EventDetail, reset]);

  const onSubmit = async (data) => {
    try {
      if (JSON.stringify(data) === JSON.stringify(EventDetail)) {
        toast.warning("No changes have been made in the Event Details");
      } else {
        const response = await updateEventfunction(data, updateeventID, dispatch);
        if (response) toast.success("Event Updated in the UI");
        else toast.error("Event can't be Updated due to some Problems");
      }
    } catch (e) {
      console.log(e);
      console.log("error occurred in the UpdateEventmodal component");
    }
  };

  const handleClose = () => {
    dispatch(setupdatemodal(false));
  };

  const categories = ["Tech", "Design", "Business", "Workshop"]; // Sample categories

  // Only render the form after EventDetail is loaded
  if (!EventDetail) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-[#ffe5b4] w-full max-w-3xl mx-4 rounded-lg shadow-lg flex items-center justify-center min-h-[200px]">
          <span className="text-orange-800 text-lg">Loading event details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#ffe5b4] w-full max-w-3xl mx-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-orange-300">
          <h2 className="text-xl font-semibold text-orange-800">
            Update Event -
          </h2>
          <button
            onClick={handleClose}
            className="text-orange-600 hover:text-red-600 text-xl"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
          {/* Event Name */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="eventName" className="text-orange-900 font-medium">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              placeholder="Enter Event Name"
              {...register("eventName")}
              className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="description"
              className="text-orange-900 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Write a brief description"
              {...register("description")}
              className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Creator Name */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="creatorname"
              className="text-orange-900 font-medium"
            >
              Creator Name
            </label>
            <input
              type="text"
              id="creatorname"
              placeholder="Enter your name"
              {...register("creatorname")}
              className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Location, Date, Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="location" className="text-orange-900 font-medium">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="City or Venue"
                {...register("location")}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="date" className="text-orange-900 font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                {...register("date")}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="time" className="text-orange-900 font-medium">
                Time
              </label>
              <input
                type="time"
                id="time"
                {...register("time")}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Category & Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="category" className="text-orange-900 font-medium">
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="mode" className="text-orange-900 font-medium">
                Mode
              </label>
              <input
                type="text"
                id="mode"
                placeholder="Online / Offline"
                {...register("mode")}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded font-semibold text-white transition-all bg-orange-500 hover:bg-orange-600"
            >
              Update This Event
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-orange-100 text-center py-3 text-sm text-orange-800 rounded-b-lg border-t border-orange-300">
          All rights reserved &copy; Nithin
        </div>
      </div>
    </div>
  );
};

export default Updatemodal;
