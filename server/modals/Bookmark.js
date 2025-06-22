const mongoose = require("mongoose")

const bookmarkSchema = new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   event:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Event",
   },
   createdAt:{
      type:Date,
      default:Date.now(),
   }
})

module.exports = mongoose.model("Bookmark",bookmarkSchema);