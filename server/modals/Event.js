const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
   eventName:{
      type:String,
      required:true,
      trim:true
   },
   description:{
      type:String,
   },
   location:{
      type:String,
      required:true
   },
   date:{
      type:Date,
      required:true,
   },
   time:{
      type:TimeRanges,
   },
   category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
      require:true
   },
   mode:{
      type:String,
   },
   createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   createdAt:{
      type:Date,
   }
})

module.exports = mongoose.modal ("Event",eventSchema); 