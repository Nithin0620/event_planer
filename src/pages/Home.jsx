import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setcreateEventmodal, setMyEventmodal } from '../Reducer/slices/modalSlics';
import toast from 'react-hot-toast';
import { getAllEventfunction, getEventByCategoryfunction } from '../services/operations/Event';
import EventCard from '../components/EventCard';
import Knowmoremodal from '../components/Knowmoremodal';
import Heromodal from "../components/Heromodal" ;
import Updatemodal from '../components/Updatemodal';
import CreateEventmodal from '../components/Createeventmodal';
import Myeventsmodal from '../components/Myeventsmodal';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [timeline, setTimeline] = useState("upcoming");
  const [allEvents, setAllEvents] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);
  const dispatch  = useDispatch();
  // const [past, setPast] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const {knowmoremodal , heroPagemodal , createEventmodal , updatemodal , MyEventmodal} = useSelector((state)=> state.modal)

  
  const categories = ["All", "Conference", "Workshop", "Webinar", "Hackathon", "Meetup"];

  // Split events into upcoming and past
  function splitEvents(events) {
    const now = new Date();
    const upcoming = [], past = [];

    events.forEach((event) => {
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
        const response = await getAllEventfunction(dispatch);
        setAllEvents(response?.data);
        console.log("inside function")
        console.log(response?.data)
        // Ensure response.data is an array
       
        
        
        
        
      } catch (error) {
        console.log(error, "in Home.jsx useEffect");
        toast.error("Error while fetching events");
      }
    };

    fetchAllEvents();
  }, []);
  useEffect(() => {
    console.log("allEvents updated:", allEvents);
  }, [allEvents]);

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        if (category === "All") {
          const { upcoming, past } = splitEvents(allEvents);
          // setUpcoming(upcoming);
          // setPast(past);
          return;
        }

        const response = await getEventByCategoryfunction(category, dispatch);
        // Ensure response.data is an array
        // const eventsArray = Array.isArray(response?.data) ? response.data : [];
        // const { upcoming, past } = splitEvents(eventsArray);
        // setUpcoming(upcoming);
        // setPast(past);
      } catch (error) {
        console.log(error, "in category fetch");
        toast.error("Error while fetching category events");
      }
    };

    fetchEventsByCategory();
  }, [category]);

  const handleCreateEventClick = () => {
    if (token) {
      dispatch(setcreateEventmodal(true)); // <-- dispatch the action
    } else {
      toast.warning("Login yourself to create Events");
    }
  };

  const handleMyEventClick = () => {
    if (token) {
      dispatch(setMyEventmodal(true)); // <-- dispatch the action
    } else {
      toast.warning("Login first to see your Events");
    }
  };


  return (
    <div className="min-h-screen bg-orange-50 z-0 relative text-gray-800">
      {/* Top Bar */}
      <div className='flex'>
        <div className="flex flex-col justify-start items-center gap-20 w-72 h-screen px-6 py-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">Event Planner</h1>
          <div className="space-x-2 flex flex-col gap-9">
            <button onClick={handleMyEventClick} className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300">My Events</button>
            <button onClick={handleCreateEventClick} className="px-4 py-2 bg-orange-200 rounded hover:bg-orange-300">Add Event</button>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="p-4 flex flex-col md:flex md:items-center gap-5 md:justify-start">
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
          <div className="flex flex-wrap mb-10 gap-2">
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

          {/* Events List */}
          <div className="p-4 space-y-4 hover:scale-105">
            {allEvents.length > 0 ? (
              allEvents.map((event, index) => (
                <div key={index}>
                  <EventCard data={event} />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10">No events found.</div>
            )}
          </div>
        </div>
      </div>
      {knowmoremodal && <Knowmoremodal/>}
      {heroPagemodal && <Heromodal/>}
      {createEventmodal && <CreateEventmodal/>}
      {updatemodal && <Updatemodal/>}
      {MyEventmodal && <Myeventsmodal/>}
    </div>
  );
};

export default Home;
