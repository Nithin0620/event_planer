import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from "react-icons/ai";
import { setcreateEventmodal } from '../Reducer/slices/modalSlics';
import { useDispatch } from 'react-redux';
import { createEventfunction } from '../services/operations/Event';

const CreateEventmodal = () => {
  const {register , handleSubmit , formState:{errors} , } = useForm();
  const dispatch = useDispatch();
  const categories = ["Conference", "Workshop", "Webinar", "Hackathon", "Meetup"];

  // useEffect(()=>{
  //   const fetchCategory = async ()=>{
  //     try{
  //       const response = await get
  //     }catch(e){

  //     }
  //   }
  //   fetchCategory();
  // },[])

  const handleClose = ()=>{
    console.warn("The data would not be saved before creating event. Are you sure?");
    const Confirmclose = window.confirm("Are You sure you want to close");
    if(Confirmclose) dispatch(setcreateEventmodal(false));
  }

  const onSubmit=async (data)=>{
    try{  
      const response = await createEventfunction(data);
      if(!response) toast.success("Event Dispatched from the UI")
      else toast.error("Event can't be created due to some Problems");
    }
    catch(e){
      console.log(e);
      console.log("error occuered in the createEventModal component");
    }
  }

  return (
    <div>
      <div>
        <div>
          <div>
            Create Event -
          </div>
          <div onClick={handleClose}>
              <AiOutlineClose/>
          </div>
        </div>
        <form action="submit" onSubmit={handleSubmit(onSubmit)}></form>
        <div className='flex flex-col'>
          <div>
            <label htmlFor="eventName">Event Name</label>
            <input type="text"
                    id='eventName'
                    {...register("eventName",{required:"This field is required"})}
                    placeholder='Event Name'
                    />
          </div>
          
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" {...register("description",{required:"Description of the event is required"})}></textarea>
          </div>
          
          <div>
            <label htmlFor="creatorname">Creator Name</label>
            <input type="text" id="creatorname" {...register("creatorname",{register:"Name of the creator is required"}) } placeholder='Creator Name'/>
          </div>

          <div className='flex '>
            <div>
              <label htmlFor="location">Location</label>
              <input type='text'
                      id='location'
                      {...register("location",{required:"This field is required"})}
                      placeholder='Location'
                      />
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input type="date"
                      id='date'
                      {...register("date",{required:"This field is required"})}
                      min={1920-1-1 }
                      max={2025-12-31 }
                      />
            </div>

            <div>
              <label htmlFor="time">Time</label>
              <input type="time"
                      id='eventName'
                      {...register("time",{required:"This field is required"})}
                      // placeholder='Tm'
                      />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="Category">Category</label>
              <select id="category" {...register("category",{required:"This field is required"})}>
                {
                  categories.map((category,index)=>(
                    <Option key={index} value={category}>{category}</Option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="mode">Mode</label>
              <input type="text"
                      {...register("mode",{required:"Mode of the event field is compulsory"})}
                      placeholder='Mode'
              />
            </div>
          </div>
          

        </div>
        <button type="submit">Create This Event</button>
        <form/>
        <div className="bg-gray-200 text-center py-2 text-sm text-gray-700">
          All rights reserved &copy; Nithin
        </div>
      </div>
    </div>
  )
}

export default CreateEventmodal