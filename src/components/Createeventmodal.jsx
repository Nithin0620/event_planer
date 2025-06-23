import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setcreateEventmodal } from "../Reducer/slices/modalSlics";
import { createEventfunction } from "../services/operations/Event";
import toast from "react-hot-toast";

const CreateEventmodal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const categories = [
    "Conference",
    "Workshop",
    "Webinar",
    "Hackathon",
    "Meetup",
  ];

  const handleClose = () => {
    console.warn(
      "The data would not be saved before creating event. Are you sure?"
    );
    const Confirmclose = window.confirm("Are You sure you want to close");
    if (Confirmclose) dispatch(setcreateEventmodal(false));
  };

  const onSubmit = async (data) => {
    try {
      const response = await createEventfunction(data,dispatch);
      if (response) toast.success("Event Dispatched from the UI");
      else toast.error("Event can't be created due to some Problems");
    } catch (e) {
      console.log(e);
      console.log("error occurred in the createEventModal component");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#ffe5b4] w-full max-w-3xl mx-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-orange-300">
          <h2 className="text-xl font-semibold text-orange-800">
            Create Event
          </h2>
          <button
            onClick={handleClose}
            className="text-orange-600 hover:text-red-600 text-xl"
          >
            <AiOutlineClose />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="eventName" className="text-orange-900 font-medium">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              placeholder="Enter Event Name"
              {...register("eventName", { required: "This field is required" })}
              className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.eventName && (
              <span className="text-red-500 text-sm">
                {errors.eventName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-orange-900 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Write a brief description"
              {...register("description", {
                required: "Description of the event is required",
              })}
              className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
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
              {...register("creatorname", {
                required: "Name of the creator is required",
              })}
              className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.creatorname && (
              <span className="text-red-500 text-sm">
                {errors.creatorname.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="location" className="text-orange-900 font-medium">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="City or Venue"
                {...register("location", {
                  required: "This field is required",
                })}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  {errors.location.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="date" className="text-orange-900 font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                {...register("date", { required: "This field is required" })}
                min="1920-01-01"
                max="2025-12-31"
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="time" className="text-orange-900 font-medium">
                Time
              </label>
              <input
                type="time"
                id="time"
                {...register("time", { required: "This field is required" })}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.time && (
                <span className="text-red-500 text-sm">
                  {errors.time.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="category" className="text-orange-900 font-medium">
                Category
              </label>
              <select
                id="category"
                {...register("category", {
                  required: "This field is required",
                })}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="mode" className="text-orange-900 font-medium">
                Mode
              </label>
              <input
                type="text"
                id="mode"
                placeholder="Online / Offline"
                {...register("mode", {
                  required: "Mode of the event field is compulsory",
                })}
                className="p-2 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.mode && (
                <span className="text-red-500 text-sm">
                  {errors.mode.message}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition-all"
            >
              Create This Event
            </button>
          </div>
        </form>

        <div className="bg-orange-100 text-center py-3 text-sm text-orange-800 rounded-b-lg border-t border-orange-300">
          All rights reserved &copy; Nithin
        </div>
      </div>
    </div>
  );
};

export default CreateEventmodal;
