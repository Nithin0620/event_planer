import { apiConnector } from "../apiConnector";
import { auth } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setSignupData, setToken } from "../../Reducer/slices/authSlics";

const {logIn,signUp,sendOtp} = auth;


export const signUpfunction = async({firstName, lastName, email, password, confirmPassword, otp}, dispatch, navigate) => {
   dispatch(setLoading(true));
   const toastID = toast.loading("Loading...");
   try {
      if(!otp){
         toast.error("otp hi nhei mila")
      }
      if(!firstName ||!lastName ||!email||!password||!confirmPassword){
         throw new Error("All fields are required");
      }
      if(password !== confirmPassword){
         throw new Error("Password and Confirm password should be same");
      }
      const payload = {
         firstName , lastName , email,password,confirmPassword,otp
      }
      const response = await apiConnector("POST" , signUp, payload);
      console.log(response)
      if(!response?.data?.success) {
         throw new Error(response?.data?.message || "Signup Failed");
      }

      navigate("/login");
      toast.success("SignUp Successful");
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

export const logInfunction = async (email, password, dispatch, navigate) => {
   dispatch(setLoading(true));
   const toastID = toast.loading("Loading ...");
   try {
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
      console.log("this is the error :");
      console.log("this is the error :",e);
      console.log("Error occured in the login api call function in the operation in the login function");
   }
   finally{
      toast.dismiss(toastID);
      toast.success("Login successful");
      navigate("/")
      dispatch(setLoading(false));
   }  
}

export const sendOtpfunction = async (email, dispatch, navigate) => {
   const toastID = toast.loading("Loading...");
   dispatch(setLoading(true));
   try {
      if (!email) {
         throw new Error("Email is required to Send Otp");
      }
      console.log(email)
      const response = await apiConnector("POST", sendOtp, { email });
      console.log(response)
      if (!response?.data?.success) {
         throw new Error(response?.data?.message || "OTP sending failed");
      }
      toast.success("OTP has been Sent to the provided email for verification");
      console.log("Navigating to /verify-email");
      navigate("/verifyemail");
   }  
   catch (e) {  
      // console.log(e);
      console.log("Error occurred in the send otp function (sendOtp API call in operations folder)");
   }
   finally {
      toast.dismiss(toastID);
      dispatch(setLoading(false));
   }
}