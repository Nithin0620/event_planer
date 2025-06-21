import { apiConnector } from "../apiConnector";
import { auth } from "../apis";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading, setSignupData, setToken } from "../../Reducer/slices/authSlics";
// import { login } from "../../../server/controllers/Auth";

const {logIn,signUp,sendOtp} = auth;
const navigate = useNavigate();

const dispatch = useDispatch();

export const signUpfunction = async({firstName , lastName , email,password,confirmPassword,otp})=>{
   dispatch(setLoading(true));
   const toastID = toast.loading ("Loading...")
   try{
      if(!firstName ||!lastName ||!email||!password||!confirmPassword||!otp){
         throw new Error("All fields are required");
      }
      if(password !== confirmPassword){
         throw new Error("Password and Confirm password should be same");
      }
      const payload = {
         firstName , lastName , email,password,confirmPassword,otp
      }
      const response = await apiConnector("POST" , signUp, payload);
      if(!response?.data?.success) {
         throw new Error(response?.data?.message || "Signup Failed");
      }

      toast.success("SignUp Successful");
      navigate("/login");
      return response;
   }
   catch(e){
      console.log(e);
      console.log("Error occured in the signup function in operations while intracting with the DB");
      navigate("/signup")
   }
   finally{
      toast.dismiss(toastID);
      dispatch(setLoading(false));
   }

}

export const logInfunction = async (email,password)=>{
   dispatch(setLoading(true));
   const toastID = toast.loading("Loading ...")
   try{
      if(!email ||!password){
         throw new Error ("Both Email and password is required to login");
      }
      const response = await apiConnector("POST",logIn,{
         email,password
      });
      if(!response?.data?.success){
         throw new Error("Error occured in the API calling function in the operation in the login function")
      }
      const token = response?.data?.Token;
      const user = response?.data?.USER;

      dispatch(setToken(token));

      const userImage = user?.image?
                        user?.image : 
                        `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`

      const userData = {...user , image:userImage}

      dispatch(setSignupData(userData));
      toast.success("Login Successfull");
      navigate("/")

   }
   catch(e){
      console.log(e);
      console.log("Error occured in the login api call function in the operation in the login function");
   }
   finally{
      toast.dismiss(toastID);
      dispatch(setLoading(false));
   }  
}

export const sendOtpfunction = async(email)=>{
   const toastID = toast.loading("Loading...");
   dispatch(setLoading(true));
   try{
      if(!email){
         throw new Error("Email is required to Send Otp");
      }
      const response = await apiConnector("POST",sendOtp,email);
      if(!response?.success){
         throw new Error (response.data.message)
      }
      if(!response?.data){
         throw new Error ("no result from server");
      }
      toast.success("OTP Sent to email ")
      navigate("/verify-email")
   }  
   catch(e){  
      console.log(e);
      console.log("Error occured in the send otp function that is sendotp API calling function in the operations folder");
   }
   finally{
      toast.dismiss(toastID)
      dispatch(setLoading(false));
   }
}