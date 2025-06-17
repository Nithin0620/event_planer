const User = require("../modals/User")
const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.verifyToken = async(req,res,next)=>{
   const token = req.headers["authorization"]?.replace("Bearer ","") || 
                  req.headers["Authorization"]?.replace("Bearer ","") || 
                  req.body.token || 
                  req.cookies.token;
   if(!token){
      return res.staus(401).json({
         success:false,
         message:"Token not found or invalid token"
      })
   }
   try{
      const decode = jwt.verify(token , process.env.JWT_SECRET);

      req.User = decode;
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