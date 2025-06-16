const mongoose = require("mongoose");

const userSchema = new mongoose.schema({
   firstName :{
      type : String,
      required: true,
      trim:true
   },
   lastName:{
      type:String,
      required:true,
      trim:true
   },
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      require:true
   },
   image:{
      type:String
   },
   events:[
      {   
         type:mongoose.Schema.Types.ObjectId,
         ref:"Event"
      }
   ],
   token:{
      type:String,
   },
   resetPasswordExpiresin:{
      type:Date,
   }
})


module.exports = mongoose.modal("User",userSchema);