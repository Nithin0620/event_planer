import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  setcreateEventmodal,
  setMyEventmodal
} from '../Reducer/slices/modalSlics';
import {
  getAllEventfunction,
  getEventByCategoryfunction
} from '../services/operations/Event';
import EventCard from '../components/EventCard';
import Knowmoremodal from '../components/Knowmoremodal';
import Heromodal from "../components/Heromodal";
import Updatemodal from '../components/Updatemodal';
import CreateEventmodal from '../components/Createeventmodal';
import Myeventsmodal from '../components/Myeventsmodal';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [timeline, setTimeline] = useState("upcoming");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const {
    knowmoremodal,
    heroPagemodal,
    createEventmodal,
    updatemodal,
    MyEventmodal
  } = useSelector((state) => state.modal);

  const [allEvents, setAllEvents] = useState([]);
  const categories = ["All", "Conference", "Workshop", "Webinar", "Hackathon", "Meetup"];

  const splitEvents = (events) => {
    const now = new Date();
    const upcoming = [];
    const past = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      if (eventDate >= now) upcoming.push(event);
      else past.push(event);
    });

    return {
      upcoming: upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)),
      past: past.sort((a, b) => new Date(b.date) - new Date(a.date))
    };
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await getAllEventfunction(dispatch);
        if (Array.isArray(response?.data)) {
          setAllEvents(response.data);
        } else {
          toast.error("Invalid event data format.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Error while fetching events");
      }
    };

    fetchAllEvents();
  }, [dispatch]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (category === "All") {
          const { upcoming, past } = splitEvents(allEvents);
          setFilteredEvents(timeline === "upcoming" ? upcoming : past);
        } else {
          const response = await getEventByCategoryfunction(category, dispatch);
          if (Array.isArray(response?.data)) {
            const { upcoming, past } = splitEvents(response.data);
            setFilteredEvents(timeline === "upcoming" ? upcoming : past);
          } else {
            toast.error("Invalid category event data format.");
          }
        }
      } catch (error) {
        console.error("Error fetching category events:", error);
        toast.error("Error while fetching category events");
      }
    };

    fetchEvents();
  }, [category, timeline, allEvents, dispatch]);

  const handleCreateEventClick = () => {
    if (token) {
      dispatch(setcreateEventmodal(true));
    } else if(!token) {
      toast.error("Login to creat New events",{position:"top-right"});
    }
  };

  const handleMyEventClick = () => {
    if (token) {
      dispatch(setMyEventmodal(true));
    } else if(!token) {
      toast.error("Login to view your events",{position:"top-right"});
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 z-0 relative text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="flex flex-col justify-start items-center gap-20 w-72 h-screen px-6 py-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">Event Planner</h1>
          <div className="flex flex-col gap-9">
            <button onClick={handleMyEventClick} className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300">
              My Events
            </button>
            <button onClick={handleCreateEventClick} className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300">
              Add Event
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex flex-col gap-5 w-full">
          {/* Timeline Tabs */}
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${timeline === "past" ? "bg-orange-300" : "bg-orange-100"}`}
              onClick={() => setTimeline("past")}
            >
              Past
            </button>
            <button
              className={`px-4 py-2 rounded ${timeline === "upcoming" ? "bg-orange-300" : "bg-orange-100"}`}
              onClick={() => setTimeline("upcoming")}
            >
              Upcoming
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 border rounded-full ${category === cat ? "bg-orange-400 text-white" : "bg-white border-orange-300 text-gray-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Event List */}
          <div className="p-4 space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard key={index} data={event} />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10">No events found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {knowmoremodal && <Knowmoremodal />}
      {heroPagemodal && <Heromodal />}
      {createEventmodal && <CreateEventmodal />}
      {updatemodal && <Updatemodal />}
      {MyEventmodal && <Myeventsmodal />}
    </div>
  );
};

export default Home;
