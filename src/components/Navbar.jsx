import React, { useState } from 'react'
// import Login from '../pages/Login'
// import Signup from '../pages/Signup'
import { useSelector, useDispatch } from "react-redux"
import ProfileDropDown from './ProfileDropDown'
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { setheroPagemodal } from '../Reducer/slices/modalSlics'

const Navbar = () => {
  const { token, signUpData } = useSelector((state) => state.auth)
// const {setheroPagemodal} = useSelector((state)=>state.modal);

  const [openProfileDropDown, setOpenProfileDropDown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const firstName = N;
  // const lastName = A
  const image = signUpData?.image || `https://api.dicebear.com/5.x/initials/svg?seed=N A`


  const handleTitleclick=()=>{
    navigate("/")
    dispatch(setheroPagemodal(true))
  }

  return (
    <nav className="w-full px-4 py-3 bg-white shadow-md flex justify-between border-b border-gray-300 flex-wrap">
      <div>

      </div>
      {/* WEBSITE NAME CENTERED */}
      <div onClick={handleTitleclick} className="w-full cursor-pointer text-center md:w-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-xl font-semibold text-[#122B49] mb-2 md:mb-0">
        Events Manager
      </div>

      {/* RIGHT SIDE CONTROLS */}
      <div className='flex justify-end gap-6'>
        <div className='cursor-pointer px-4 py-1 rounded-md ml-auto border border-gray-500 text-gray-800 hover:bg-gray-100 transition' onClick={()=>navigate("/")}>
          Home
        </div>
        <div className="w-full md:w-auto ml-auto flex items-center justify-center md:justify-end space-x-4 mt-2 md:mt-0">
        {token === null ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 rounded-md border border-gray-500 text-gray-800 hover:bg-gray-100 transition"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1 rounded-md border border-gray-500 text-gray-800 hover:bg-gray-100 transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <div
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={() => setOpenProfileDropDown(!openProfileDropDown)}
          >
            <img
              src={image}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-400"
            />
            {openProfileDropDown ? <FaAngleUp /> : <FaAngleDown />}
            {openProfileDropDown && (
              <div className="absolute right-0 top-full mt-2 z-10">
                <ProfileDropDown setOpenProfileDropDown={setOpenProfileDropDown} />
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </nav>
  )
}

export default Navbar
