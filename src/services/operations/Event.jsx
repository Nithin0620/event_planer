import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Reducer/slices/authSlics";
import { apiConnector } from "../apiConnector";
import { event } from "../apis";

import toast from "react-hot-toast"

const {createEvent , getAllEvent , getAllEventById , updateEvent , deleteEvent , getEventByCategory , getMyEvent} = event;
const dispatch = useDispatch();

export const createEventfunction = async (eventName,description,location,date,time,category,mode)=>{
   
   const toastID = toast.loading("Loading..");
   try{
      dispatch(setLoading(true));
      if(!eventName || ! description || !location || !date || !time || !category || !mode){
         throw new Error("All details are required");
      }

      const payload = {
        eventName,description,location,date,time,category,mode
      }

      const response = await apiConnector("POST",createEvent , payload );

      if(!response?.data?.success){
         toast.error("Failed to create Event");
         throw new Error("Create Event failed");
      }
      dispatch(setLoading(false));
      toast.success("Event Created Successfully");
      return response.data;
   }
   catch(e){
      console.log("error occured during creating new event",e);
   }
   finally{
      toast.dismiss(toastID);
   }
}

export const getAllEventfunction = async()=>{
   const toastID = toast.loading();
   
   try{
      dispatch(setLoading(true));

      const response = await apiConnector("GET",getAllEvent);

      if(!response?.data?.success){
         throw new Error("Error occured while fetching all event from data base in getAllEventfunction")
      }

      dispatch(setLoading(false));
      // toast.success("AL)

      return response.data;

   }
   catch(e){
      console.log("error occured during fetching event",e);
   }
   finally{
      toast.dismiss(toastID);
   }
}

export const getAllEventByIdfunction = async(id)=>{
   const toastID = toast.loading("Loading...")
   try{  
      dispatch(setLoading(true));
      if(!id){
         throw new Error("ID is required to fetch event by id ");
      }
      const response = await apiConnector("GET",`${getAllEventById}/${id}`);
      if(!response?.success?.data){
         throw new Error("Error occured in fetching event by id ");
      }

      dispatch(setLoading(false));
      // toast.success("")
      return response.data;
   }
   catch(e){
      console.log("Error occured in fetching event by id",e);
   }
   finally{
      toast.dismiss(toastID);
   }
}

export const updateEventfunction = async(id,eventName,description,location,date,time,category,mode) =>{
   const toastID = toast.loading("Loading...");
   try{
      dispatch(setLoading(true));
      if(!id){
         throw new Error("ID is required to Edit/Update event by id ");
      }

      if(!eventName || !description || !location || !date || !time || !category || !mode){
         throw new Error ("All fields are required to update event");
      }

      const payload = {
         eventName,description,location,date,time,category,mode
      }

      const response = await apiConnector("PUT",`${updateEvent}/${id}`,payload);

      if(!response?.success?.data){
         toast.warning("Unable to update the event");
         throw new Error("Error occured in Updating event by id ");
      }

      dispatch(setLoading(false));
      toast.success("Event Updated");
      return response.data;
   }
   catch(e){
      console.log("Error occured in updating/editing event by id",e);
   }
   finally{
      toast.dismiss(toastID);
   }
}

export const deleteEventfunction= async(id)=>{
   const toastID = toast.loading("Loading...");
   try{
      dispatch(setLoading(true));

      if(!id){
         throw new Error("Id of the Event is required to delete the event");
      }

      const response = await apiConnector("DELETE",`${deleteEvent}/${id}`);

      if(!response?.success?.data){
         toast.error("unable to delete the event");
         throw new Error("Error occured in Deleting the event");
      }

      dispatch(setLoading(false));
      toast.success("Event Deleted Successfully");
      return response.data;
   }
   catch(e){
      console.log("Error occured in deleting the event",e);
   }
   finally{
      toast.dismiss(toastID);
   }
}

export const getEventByCategoryfunction = async(category) => {
   const toastId =toast.loading("Loading...");
   try{
      dispatch(setLoading(true));
      if(!category){
         throw new Error("category is required to fetch the event by category");
      }

      const response = await getEventByCategory("GET",`${getEventByCategory}/${category}`);

      if(!response?.success?.data){
         toast.error("unable to fetch the event by category");
         throw new Error("Error occured in Deleting the event");
      }

      dispatch(setLoading(false));
      toast.success("Event Deleted Successfully");
      return response.data;
   }
   catch(e){
      console.log("Error occured in deleting the event",e);
   }
   finally{
      toast.dismiss(toastID);
   }
}