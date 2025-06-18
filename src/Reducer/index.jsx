import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlics"
import modalSlice from "./slices/modalSlics"


const reducer = combineReducers({
   auth:authSlice,
   modal:modalSlice
})

export default reducer