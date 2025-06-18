import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   MyEventmodal: false,
   createEventmodal: false,
   heroPagemodal:false,
}

const  modalSlice = createSlice({
   name:modal,
   initialState:initialState,
   reducer:{
      setMyEventmodal(state,action){
         state.MyEventmodal = action.payload;
      },
      setcreateEventmodal(state,action){
         state.createEventmodal = action.payload;
      },
      setheroPagemodal(state,action){
         state.heroPagemodal = action.payload;
      }
   }
})

export const {setMyEventmodal,setcreateEventmodal,setheroPagemodal} = modalSlice.action

export default modalSlice.reducer;