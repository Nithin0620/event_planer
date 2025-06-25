const BASE_URL = "http://localhost:5000/api/v1"

export const auth = {
   logIn: `${BASE_URL}/login`,
   signUp: `${BASE_URL}/signup`,
   sendOtp: `${BASE_URL}/sendotp`
};

export const event = {
   createEvent: `${BASE_URL}/createevent`,
   getAllEvent: `${BASE_URL}/getallevent`,
   getEventById: `${BASE_URL}/geteventbyid`,
   updateEvent: `${BASE_URL}/updateevent`,
   deleteEvent: `${BASE_URL}/deleteevent`,
   getEventForCategory: `${BASE_URL}/geteventforcategory`,
   getMyEvent: `${BASE_URL}/getmyevent`,
};