import React, { useEffect } from 'react'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setheroPagemodal } from './Reducer/slices/modalSlics'

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setheroPagemodal(true));
  },[])
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default App
