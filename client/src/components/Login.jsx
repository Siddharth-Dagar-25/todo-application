import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../utils/logo.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import app from "../utils/firebase.js";
import { useUser } from "./UserContext.jsx";
import Example from "./Navbar.jsx";


const Login = () => {
  let navigate = useNavigate();

  const { setUser, isLoggedIn, setIsLoggedIn } = useUser();

  useEffect(() => {
    setIsLoggedIn(false);
  }, [])
  
  console.log(isLoggedIn);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    navigate("/register");
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    setIsLoggedIn(true);
    console.log(isLoggedIn);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName || email.split('@')[0] // Set displayName or use part of email
        });
        toast("Login Successful.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Invalid user credentials", {
          autoClose: 2000,
        });
        setIsLoggedIn(false);
      });
  };
  
  return (
    <div className="bg-gray-950 h-screen overflow-y-hidden">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto object-cover rounded-2xl "
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  //onChange={handleChange}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your Email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  //onChange={handleChange}
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <button
              type="button"
              onClick={handleClick}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
