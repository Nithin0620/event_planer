import React from 'react'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Outlet } from 'react-router-dom'

const App = () => {
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
