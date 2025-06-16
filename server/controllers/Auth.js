const mongoose = require("mongoose");
const User = require("../modals/User")
const Event = require("../modals/Event");
const otpGenerator= require("otp-generator");
const Otp = require("../modals/Otp");

exports.signUp = async (req,res)=>{
   try{
      const {
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
         otp,
      } = req.body;

      if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
         return res.status(403).json({
            success:false,
            message:"Please fill all the fields"
         })
      }

      if(password !== confirmPassword){
         return res.status(400).json({
            success:false,
            message:"password and Confirm password Doesn't match",
         })
      }

      const existingUser =await User.findOne({email:email});
      if(existingUser){
         return res.status(400).json({
            success:false,
            message:"User already exist's",
         })
      }

      const recentOtp = await Otp.findOne({email:email}).sort({createdAt:-1}).limit(1);

      if(recentOtp.length === 0){
         return res.status(400).json({
            success:false,
            message:"Otp expired or not found"
         })
      }
      else{
         if(recentOtp[0].otp !== otp){
            return res.status(400).json({
               success:false,
               message:"Invalid OTP"
            })
         }
      }

      const hashedPassword = await bycrypt.hash(password,10);

      const USER = await User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword,
         image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

      })

      if(!USER){
         throw new Error("data not created in DB")
      }

      return res.status(200).json({
         success:true,
         message:"USer data created in DB",
         data:USER
      })


   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"Error in creating USer Data in DB in signup controller",
         data:null
      })
   }
}

exports.login = async(req,res)=>{
   try{
      const {email,password} = req.body;

      if(!email || !password){
         return res.status(400).json({
            success:false,
            message:"All fields are required",
         })
      }

      const USER = await User.findOne({email:email});
      if(!USER){
         return res.status(400).json({
            success:false,
            message:"USer not registered"
         })
      }

      if(await bycrypt.compare(password,USER.password)){
         const payload = {
            email: USER.email,
            id: USER._id,
         };
         
         const Token = jwt.sign(payload,process.env.JWT_SECERER,{
            expiresIn :"2h",
         })

         USER.token = Token;
         USER.password = undefined;

         const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
         };

         res.cookie("token",Token , options).status(200).json({
            success:true,
            Token,
            data:USER,
            message:"Login Successfull"
         })

      }
      else{
         return res.status(500).json({
            success:false,
            message:"Password is incorrect"
         })
      }
   }
   catch(e){
      return res.status(500).json({
         success:false,
         message:"Error occured in login controller"
      })
   }
}


exports.sendOtp = async(req,res)=>{
   try{
      const {email} = res.body;

      const checkUserPresent = await User.findOne({email:email});

      if(checkUserPresent){
         return res.status(401).json({
            success:false,
            message:"User already registered",
         })
      }

      var otp = otpGenerator.generate(6,{
         upperCaseAlphabets:false,
         lowerCaseAlphabets:false,
         specialChars:false,
      })

      result = Otp.findOne({otp:otp});

      while(result){
         var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
         })

         result = Otp.findOne({otp:otp});  
      }
      const otpBody = await Otp.create({email,otp});

      return res.status(200).json({
         success:true,
         otp:otpBody,
         message:"otp sent successfully"
      })
   }
   catch(e){
      return res.status(500).json({
         success: false,
         message: e.message,
      });
   }
}