import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   MyEventmodal: false,
   createEventmodal: false,
   heroPagemodal:false,
   knowmoremodal:false,
   updatemodal:false,
   knowmoredata:null
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
      },
      setknowmoremodal(state,action){
         state.knowmoremodal = action.payload;
      },
      setknowmoredata(state,action){
         state.knowmoredata = action.payload;
      },
      setupdatemodal(state,action){
         state.updatemodal = action.payload;
      }
   }
})

export const {setMyEventmodal,setcreateEventmodal,setheroPagemodal,setknowmoremodal,setupdatemodal} = modalSlice.action

export default modalSlice.reducer;