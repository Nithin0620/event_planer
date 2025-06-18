import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { setcreateEventmodal, setMyEventmodal } from '../Reducer/slices/modalSlics'
import toast from "react-hot-toast"

const Home = () => {
  const [allEvents,seyAllEvent] = useState([]);
  const {token} = useSelector((state)=>state.auth)

  const handleMyEventClick=()=>{
    if(token !==null){
      setMyEventmodal(true);
    }
    if(token === null){
      toast.warning("Login first to see your Events");
    }
  }

  const handleCreateEventClick=()=>{
    if(token !== null){
      setcreateEventmodal(true);
    }
    if(token === null) {
      toast.warning("Login yourSelf to create Events");
    }
  }

  useEffect({
    
  },[])

  return (
    
    <div>
      <div>
        <button onClick={handleMyEventClick}>
          My Events
        </button>
        <button onClick={handleCreateEventClick}>
          Create Event
        </button>
      </div>
      <div>
        

      </div>
    </div>
  )
}

export default Home
