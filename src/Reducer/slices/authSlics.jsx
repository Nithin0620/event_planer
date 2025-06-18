import { createSlice } from "@reduxjs/toolkit";

const getFromLocalStorage = (key)=>{
   try{
      const item = localStorage.getItem(key);
      return item? JSON.parse(item) : null;
   }
   catch(e){
      console.log("error occured in fetching the token from the localstorage",e)
   }
}

const initialState={
   signUpData : null,
   loading:false,
   token:getFromLocalStorage("token"),
}

const authSlice =createSlice({
   name:"auth",
   initialState:initialState,
   reducers:{
      setSignupData(state,action){
         state.signUpData = action.payload
      },

      setLoading(state,action){
         state.loading = action.payload
      },

      setToken(state,action){
         state.token = action.payload;
         if(action.payload){
            try{
               localStorage.setItem("token",JSON.stringify(action.payload));
               console.log("token set in local Storage",action.payload);
            }
            catch (error) {
               console.error("Error setting token in localStorage:", error);
            }
         } else {
            localStorage.removeItem("token");
            console.log("Token removed from localStorage");
         }
         
      }

   }
})


export const{setToken,setLoading,setSignupData} = authSlice.actions;

export default authSlice.reducer;