const Event = require("../modals/Event");
const { findByIdAndUpdate } = require("../modals/Otp");


exports.getallEvent = async(req,res)=>{
   try{
      
      const response = await Event.find({});
      if(!response){
         return res.status(400).json({
            success:false,
            message:"Error in retriving the Events 1"
         })
      }
      return res.status(200).json({
         success:false,
         message:"data of events retrived successfully",
         data:response,
      })
   }
   catch(e){
      console.log(e);
      return res.status(500).json({
         success:false,
         message:"Error occured in getallEvent"
      })
   }
}

exports.getEventById = async(req,res)=>{
   try{
      const id = req.params._id;

      const response = Event.find({id:id});
      if(!response){
         return res.status(400).json({
            success:false,
            message:"Error in retriving the Events by id 2"
         })
      }
      return res.status(200).json({
         success:false,
         message:"data of event by id retrived successfully",
         data:response,
      })
   }
   catch(e){
      console.log(e);
      return res.status(500).json({
         success:false,
         message:"Error occured in getEventByID"
      })
   }
}


exports.createEvent = async(req,res)=>{
   try{
      const {
         eventName,
         description,
         location,
         date,
         time,
         category,
         mode,
         createdBy
      }=req.body;

      if(!eventName || !description ||! location ||!date || !time || !category ||!mode || ! createdBy){
         return res.status(400).json({
            success:false,
            message:"ALl fields are required to create new event"
         })
      }
      const payload = {eventName,
      description,
      location,
      date,
      time,
      category,
      mode,
      createdBy};

      const response = await Event.create(payload);

      return res.status(201).json({
         success: true,
         message: "Event created successfully",
         data: response
      });

   } 
   catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Failed to create event",
         error: error.message
      });
   }
}

exports.updateEvent = async(req,res)=>{
   try{
      const _id = req.params._id;
      const {eventName,
         description,
         location,
         date,
         time,
         category,
         mode
      } = req.body;

      if(!eventName || !description ||! location ||!date || !time || !category ||!mode ){
         return res.status(400).json({
            success:false,
            message:"ALl fields are required to edit event"
         })
      }

      const payload = {
         eventName,
         description,
         location,
         date,
         time,
         category,
         mode,
         updatedAt:Date.now()
      }
      const response = findByIdAndUpdate({id:_id}, payload,{new:true});

      return res.status(201).json({
         success: true,
         message: "Event updated successfully",
         data: response
      });

   } 
   catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Failed to update event",
         error: error.message
      });
   }
}

exports.deleteEvent = async(req,res)=>{
   try{
      const _id = req.params._id;

      const response =await Event.findByIdAndDelete(_id);

      return res.status(200).json({
         success:true,
         message:"Event deleted Successfully",
         data:response
      })
   }
   catch(e){
      console.log(e);
      return res.status(500).json({
         success:false,
         message:"Errorin deleting the Eveent",
         error:e
      })
   }
}