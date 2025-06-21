import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoLogOut } from "react-icons/io5"
import { setMyEventmodal } from '../Reducer/slices/modalSlics'
import { setToken } from '../Reducer/slices/authSlics'

const ProfileDropDown = ({setOpenProfileDropDown}) => {
   const setOpenProfileDropDown = setOpenProfileDropDown;
  const dispatch = useDispatch();

//   const {setMyEventmodal} =useSelector((state)=>state.modal); 
//   const {setToken} = useSelector((state)=>state.auth);
  const { signUpData } = useSelector((state) => state.auth);

  const handleMyeventModal=()=>{
   dispatch(setMyEventmodal(true));
   setOpenProfileDropDown(false);
  }
  const handleLogout = ()=>{
    console.warn("You will be logged out of your account. Are you sure?");
    const Confirmclose = window.confirm("Are You sure you want to LogOut");
    if(Confirmclose) dispatch(setToken(null));
  } 

  return (
    <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 space-y-3 text-sm text-gray-800 z-50">
      
      <div className="text-gray-600 font-medium truncate pb-2 border-b border-gray-200">
        {signUpData?.email || "user@example.com"}
      </div>

      
      <div className="hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer transition" onClick={handleMyeventModal}>
        My Events
      </div>

      
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg transition"
      >
        <IoLogOut className="text-lg" />
        Log Out
      </button>
    </div>
  )
}

export default ProfileDropDown
