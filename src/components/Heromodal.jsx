import React from 'react'
import IMG from "../assets/Heropage-bg.jpeg"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const heromodal = () => {
   const token = useSelector((state)=>state.auth)
   const handleCreateEventClick=()=>{
      
   }
   

   const handleViewEventsClick = ()=>{

   }

  return (
    <div className="bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${IMG})`}}>
      <div>
         <h1>
            🚀 Discover, Create & Join Amazing Tech Events   
         </h1>
         <h2>
            Browse webinars, hackathons & more. Connect with peers.
         </h2>
         {  token!==null && 
            <div>
               <button onClick={()=>Navigate("/login")}>LogIn</button>
            </div>
         }
         {  token!==null && 
            <div>
               <button onClick={()=>Navigate("/signup")}>SignUp</button>
            </div>
         }
         <div onClick={handleCreateEventClick}>
            Create Event
         </div>
         <div onClick={handleViewEventsClick}>
            view Upcoming Events
         </div>
         <div>
            Empowering communities through collaboration and code.
         </div>

      </div>
      
    </div>
  )
}

export default heromodal