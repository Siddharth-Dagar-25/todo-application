import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Header from "./Header.jsx";
import GetStarted from "./GetStarted.jsx";
import App from "../App.jsx";

const Body = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && (<Header />)}
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={ <App /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Body;