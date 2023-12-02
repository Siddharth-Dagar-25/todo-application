import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Body from "./components/Body.jsx";
import { UserProvider } from "./components/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserProvider>
      <ToastContainer />
      <Body />
    </UserProvider>
  </>
);
