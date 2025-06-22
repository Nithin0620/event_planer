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
      type:String,
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
      default:Date.now()
   },
   updatedAt:{
      type:Date,
      default:Date.now()
   }
})

module.exports = mongoose.model ("Event",eventSchema); 