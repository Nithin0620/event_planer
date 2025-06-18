import { createBrowserRouter,RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./App";


export const router = createBrowserRouter([
   {
      path:"/",
      element:<App/>,
      children:[
         {
            path:"",
            element:<Home/>
         },
         {
            path:"/login",
            element:<Login/>
         },
         {
            path:"/signup",
            element:<Signup/>
         }
      ]
   }
])

