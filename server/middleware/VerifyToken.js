const User = require("../modals/User")
const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.verifyToken = async(req,res,next)=>{
   console.log(req.cookies)
   const tokens = 
                  req.cookies.token;
   if(!tokens){
      console.log(tokens)
      return res.status(401).json({
         success:false,
         message:"Token not found or invalid token"
      })
   }
   try{
      console.log(tokens)
      const decode = jwt.verify(tokens , process.env.JWT_SECRET);
      console.log(decode)
      req.user = decode;
   }
   catch(e){
      return res.status(401).json({
         success:false,
         message:"Invalid Token",
         error:e
      })
   }
   next();
}