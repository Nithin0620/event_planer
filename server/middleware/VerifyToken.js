const User = require("../modals/User")
const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.verifyToken = async(req,res,next)=>{
   console.log(req.cookies)
   const token = 
                  req.cookies.token;
   if(!token){
      console.log(token)
      return res.status(401).json({
         success:false,
         message:"Token not found or invalid token"
      })
   }
   try{
      const decode = jwt.verify(token , process.env.JWT_SECRET);

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