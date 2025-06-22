const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      trim: true
   },
   lastName: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   image: {
      type: String
   },
   events: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Event"
      }
   ],
   token: {
      type: String,
   },
   resetPasswordExpiresin: {
      type: Date,
   }
});

module.exports = mongoose.model("User", userSchema);