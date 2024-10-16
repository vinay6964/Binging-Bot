import React, { useEffect, useState } from "react";
import { provider, auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserFromGoogle,
  removeUserFromGoogle,
} from "../utils/signInWithGoogleSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const signedInGoogleUser = useSelector((store) => {
    return store.userFromgoogle;
  });

  useEffect(() => {
    if (signedInGoogleUser) navigate("/browse");
    else navigate("/");
  },[signedInGoogleUser,navigate]);

  const handleSingInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const { email, displayName, photoURL, uid } = result.user;
        dispatch(
          addUserFromGoogle({
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            id: uid,
          })
        );
        navigate("/browse");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUserFromGoogle());
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="absolute w-screen px-8 py-2  from-black z-10 flex flex-col md:flex-row justify-between">
      <img
        className="w-44 mx-auto md:mx-0"
        src="/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />
      {signedInGoogleUser ? (
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={signedInGoogleUser?.photoURL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2 text-red-700 font-bold text-lg md:text-xl">
              {signedInGoogleUser.displayName
                .split(" ")[0]
                .charAt(0)
                .toUpperCase() +
                signedInGoogleUser.displayName
                  .split(" ")[0]
                  .slice(1)
                  .toLowerCase()}
            </span>
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg">
              <div className="py-2 px-4 hover:bg-red-700 cursor-pointer">
                Children
              </div>
              <div className="py-2 px-4 hover:bg-red-700 cursor-pointer">
                Manage Profiles
              </div>
              <div className="py-2 px-4 hover:bg-red-700 cursor-pointer">
                Transfer Profile
              </div>
              <div className="py-2 px-4 hover:bg-red-700 cursor-pointer">
                Account
              </div>
              <div className="py-2 px-4 hover:bg-red-700 cursor-pointer">
                Help Centre
              </div>
              <div
                className="py-2 px-4 hover:bg-red-700 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign out of Netflix
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="py-2 px-4 bg-red-700 hover:bg-red-800 rounded-full text-white font-semibold"
          onClick={handleSingInWithGoogle}
        >
          Sign Up
        </button>
      )}
    </div>
  );
};

export default Header;
