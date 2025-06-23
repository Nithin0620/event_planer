import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import store from "./Reducer/store"; 
import {Toaster} from "react-hot-toast"
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster  reverseOrder={false} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);