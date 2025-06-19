import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setcreateEventmodal, setMyEventmodal } from '../Reducer/slices/modalSlics';
import toast from 'react-hot-toast';
import { getAllEventfunction, getEventByCategoryfunction } from '../services/operations/Event';
import EventCard from '../components/EventCard';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [timeline, setTimeline] = useState("upcoming");
  const [allEvents, setAllEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const categories = ["All", "Conference", "Workshop", "Webinar", "Hackathon", "Meetup"];

  // Split events into upcoming and past
  function splitEvents(events) {
    const now = new Date();
    const upcoming = [], past = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= now) upcoming.push(event);
      else past.push(event);
    });

    return {
      upcoming: upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)),
      past: past.sort((a, b) => new Date(b.date) - new Date(a.date)),
    };
  }

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await getAllEventfunction();
        if (!response) {
          toast.error("Failed to fetch all events");
          return;
        }
        setAllEvents(response.data);
        const { upcoming, past } = splitEvents(response.data);
        setUpcoming(upcoming);
        setPast(past);
      } catch (error) {
        console.log(error, "in Home.jsx useEffect");
        toast.error("Error while fetching events");
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        if (category === "All") {
          const { upcoming, past } = splitEvents(allEvents);
          setUpcoming(upcoming);
          setPast(past);
          return;
        }

        const response = await getEventByCategoryfunction(category);
        if (!response) {
          toast.error("Failed to fetch category events");
          return;
        }

        const { upcoming, past } = splitEvents(response.data);
        setUpcoming(upcoming);
        setPast(past);
      } catch (error) {
        console.log(error, "in category fetch");
        toast.error("Error while fetching category events");
      }
    };

    fetchEventsByCategory();
  }, [category]);

  const handleCreateEventClick = () => {
    if (token) setcreateEventmodal(true);
    else toast.warning("Login yourself to create Events");
  };

  const handleMyEventClick = () => {
    if (token) setMyEventmodal(true);
    else toast.warning("Login first to see your Events");
  };

  const filteredEvents = timeline === "upcoming" ? upcoming : past;

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Event Planner</h1>
        <div className="space-x-2">
          <button onClick={handleMyEventClick} className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300">My Events</button>
          <button onClick={handleCreateEventClick} className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300">Add Event</button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="p-4 md:flex md:items-center md:justify-between">
        {/* Timeline Tabs */}
        <div className="flex space-x-4 mb-4 md:mb-0">
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
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4 hover:scale-105">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index}>
              <EventCard data={event} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">No events found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
