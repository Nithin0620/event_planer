const Event = require("../modals/Event");
const User = require("../modals/User")
const { findByIdAndUpdate, findById } = require("../modals/Otp");
const Category = require("../modals/Category");


exports.createEvent = async(req,res)=>{
   try{
      console.log(req.body)
      let {
         eventName,
         description,
         location,
         date,
         time,
         category, // could be name or ObjectId
         mode,
         creatorname
      } = req.body;

      // If category is not an ObjectId, look it up by name
      if (!category.match(/^[0-9a-fA-F]{24}$/)) {
         const foundCategory = await Category.findOne({ categoryName: category });
         if (!foundCategory) {
            return res.status(400).json({
               success: false,
               message: "Category not found"
            });
         }
         category = foundCategory._id;
      }

      const createdBy = req.user.id;

      if(!eventName || !description || !location || !date || !time || !category || !mode || !createdBy || !creatorname){
         return res.status(400).json({
            success:false,
            message:"All fields are required to create new event"
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
         createdBy,
         creatorname
      };

      const createdEvent = await Event.create(payload);
      const response = await Event.findById(createdEvent._id).populate("category");

      await Category.findByIdAndUpdate(category, { $push: { events: response._id } }, { new: true });
      await User.findByIdAndUpdate(createdBy, { $push: { events: response._id } }, { new: true });

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
      
      const response = await Event.find({}).populate("createdBy").populate("category").exec();
      if(!response){
         return res.status(400).json({
            success:false,
            message:"Error in retriving the Events 1"
         })
      }
      return res.status(200).json({
         success:true,
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
      const id = req.params.id;
      console.log(id)
      const currentUser = req.user.id;
      console.log(currentUser)
      
      if(!currentUser){
         return res.status(401).json({
            success:false,
            message:"Please Login first to get more details about this Event"
         })
      }

      const response =await Event.findById(id).populate("createdBy").populate("category").exec();
      if(!response){
         return res.status(400).json({
            success:false,
            message:"Error in retriving the Events by id 2"
         })
      }
      return res.status(200).json({
         success:true,
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
    const _id = req.params.id;
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
      const id = req.params.id;
      console.log(id);

      const currentUser = req.user.id;

      const event = await Event.findById(id);

      if(!event){
         return res.status(400).json({
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

      const response =await Event.findByIdAndDelete(id);

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


exports.getEventForCategory = async(req,res)=>{
   try{
      const category = req.params.category;

      if(!category){
         return res.status(400).json({
            success:false,
            message:"can't retrive category from body"
         })
      }

      const response = await Category.find({categoryName:category}).populate("events").exec();

      return res.status(200).json({
         success:true,
         message:"category retrived successfully",
         data:response
      })
   }
   catch(e){
      console.log(e);
      return res.status(500).json({
         success:false,
         message:"Error occured in getEventforCategory controller",
         data:null
      })
   }
}


exports.getMyEvent = async (req, res) => {
  try {
    const userId = req.user.id;

    if(!userId){
      return res.status(401).json({
         success:false,
         message:"please login first to retirve myEvent data"
      })
    }

    const response = await User.findById(userId)
      .populate("events")
      .exec();

    return res.status(200).json({
      success: true,
      message: "My events retrieved successfully",
      data: response.events,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred in getMyEvent controller while retrieving events from user schema",
    });
  }
};


// exports.getAllCategory = async(req,res)=>{
//    try{
//       const response  = await Category.find({}).populate("events").exce();

//       if(!response) {
//          return res.status(400).json({
//             success:false,
//             message:"Unavle to fetch all categories",
//             data:null
//          })
//       }
//       return res.status(200).json({
//          success:true,
//          message:"all categories fetched",
//          data:response
//       })
//    }
//    catch(e){
//       console.log(e);
//       return res.status(500).json({
//          success:false,
//          message:"Error occured in fetching all categories",
//       })
//    }
// }