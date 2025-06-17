const Event = require("../modals/Event");
const User = require("../modals/User")
const { findByIdAndUpdate, findById } = require("../modals/Otp");


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
         
      }=req.body;

      const createdBy = req.user.id;

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

      const pushEventintoUser = await User.findByIdAndUpdate(createdBy , {$push :{events:response._id}},{new:true});

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

      const currentUser = req.user.id;
      
      if(!currentUser){
         return res.status(401).json({
            success:false,
            message:"Please Login first to get more details about this Event"
         })
      }

      const response =await Event.find({id:id});
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


exports.updateEvent = async (req, res) => {
  try {
    const _id = req.params._id;
    const {
      eventName,
      description,
      location,
      date,
      time,
      category,
      mode,
    } = req.body;

    const currentUser = req.user.id;

    const event = await Event.findById(_id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.createdBy.toString() !== currentUser) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this event",
      });
    }

    if (!eventName || !description || !location || !date || !time || !category || !mode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to edit the event",
      });
    }

    const payload = {
      eventName,
      description,
      location,
      date,
      time,
      category,
      mode,
      updatedAt: Date.now(),
    };

    const updatedEvent = await Event.findByIdAndUpdate(_id, payload, { new: true });

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};


exports.deleteEvent = async(req,res)=>{
   try{
      const _id = req.params._id;

      const currentUser = req.user.id;

      const event = await Event.findById(_id);

      if(!event){
         return req.status(400).json({
            success:false,
            message:"Event Not found"
         })
      }

      if(event.createdBy.toString() !== currentUser){
         return res.status(401).json({
            success:false,
            message:"You are not authorized to delete this Event"
         })
      }

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