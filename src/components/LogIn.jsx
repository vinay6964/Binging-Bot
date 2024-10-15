import React, {useState} from "react";
import Header from "./Header";

const LogIn = () => {
    const [isSignInForm,setisSignInForm] = useState(true);
    const toggleSignInForm = () => {
      setisSignInForm(!isSignInForm)
    }
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg"
          alt="loading"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form */}
      <form className="w-full md:w-2/12 lg:w-4/12 absolute p-8 md:p-12 bg-black bg-opacity-80 top-1/2 transform -translate-y-1/2 mx-auto right-0 left-0 text-white rounded-lg">
      <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        
        {/* Email Input */}
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-4 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        {/* Username Input */}
        {!isSignInForm && <input
          type="text"
          placeholder="UserName"
          className="p-4 my-4 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />}
        
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />


        {/* Sign In Button */}
        <button className="py-4 my-6 bg-red-700 hover:bg-red-800 w-full rounded-lg text-white font-semibold">
        {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Forgot Password and Sign Up Links */}
        <div className="flex justify-between text-sm text-gray-400">
          <span className="hover:underline cursor-pointer">Forgot password?</span>
          <span className="hover:underline cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now" : "Sign In"}</span>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
