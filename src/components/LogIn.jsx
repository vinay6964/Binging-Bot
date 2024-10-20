import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValid } from "../utils/validateForm";
import { LOGIN_IMG } from "../utils/constants";

const LogIn = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
    setErrorMsg(null)
  };

  const handleSubmit = () => {
    let allErrorMsg = "";
    const isValid = checkValid(email.current.value, password.current.value);
    if (isValid) {
      allErrorMsg += isValid;
    }
    if (!isSignInForm && !userName.current.value.length) {
      allErrorMsg += " ,UserName";
    }
    setErrorMsg(allErrorMsg);
  };
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          src={LOGIN_IMG}
          alt="loading"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-2/12 lg:w-4/12 absolute p-8 md:p-12 bg-black bg-opacity-80 top-1/2 transform -translate-y-1/2 mx-auto right-0 left-0 text-white rounded-lg"
      >
        {/* <h1 className="font-bold text-3xl py-4 mx-10">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1> */}

        {/* Username Input */}
        {!isSignInForm && (
          <input
            ref={userName}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}

        {/* Email Input */}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-4 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Password Input */}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {errorMsg && (
          <p className="text-red-500 font-bold text-lg py-3">{errorMsg}</p>
        )}
        {/* Sign In Button */}
        <button
          className="py-4 my-6 bg-red-700 hover:bg-red-800 w-full rounded-lg text-white font-semibold"
          onClick={handleSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Forgot Password and Sign Up Links */}
        <div className="flex justify-between text-sm text-gray-400">
          <span className="hover:underline cursor-pointer">
            Forgot password?
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign Up Now" : "Sign In"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
