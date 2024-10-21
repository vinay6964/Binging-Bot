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
import { toggleGptSearch } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";
import { addGuest } from "../utils/GuestSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const signedInGoogleUser = useSelector((store) => {
    return store.userFromgoogle;
  });
  const gptSearchData = useSelector((store) => store.gpt.showGptSearch);
  const guestData = useSelector((store) => store.guestLogIn.guest)

  const handlegptSearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    if (signedInGoogleUser || guestData) navigate("/browse");
    else navigate("/");
  }, [signedInGoogleUser, navigate, guestData]);

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

  const handleGuestLogIn = () => {
    dispatch(addGuest())
    navigate("/browse")
  }

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
    <div className="absolute w-screen px-4 py-1 bg-gradient-to-r from-black-900 to-black-500 z-10 flex flex-col md:flex-row justify-between items-center">
      <img
        className="w-36 mx-auto md:mx-0"
        src="/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />

      { (signedInGoogleUser || guestData) ? (
        <div className="flex items-center space-x-4">
          {gptSearchData && (
            <select
              onChange={handleLanguageChange}
              className="p-2 m-2 w-30 h-10 bg-gray-900 text-white border border-gray-700 rounded-md shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out duration-150"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="bg-gray-800 text-white"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <div className="justify-between flex p-2">
            <button
              className="py-2 px-3 bg-purple-800 text-white rounded-lg hover:bg-purple-800 transition ease-in-out duration-150"
              onClick={handlegptSearchClick}
            >
              {gptSearchData ? "Home Page" : "GPT Search"}
            </button>
          </div>
          {!guestData && signedInGoogleUser && 
          <div
            className="flex items-center justify-end px-10 -py-20 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={signedInGoogleUser?.photoURL}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-red-600 font-semibold text-lg md:text-xl">
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
          }

          {!guestData && showDropdown && (
            <div className="absolute right-30 top-20 mt-2 w-40 bg-gray-900 text-white shadow-lg rounded-lg">
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
        <div>
          <button
          className="py-3 px-6 bg-red-600 mx-10 hover:bg-red-700 rounded-lg text-white font-semibold"
          onClick={handleGuestLogIn}
        >
          Guest
        </button>
        <button
          className="py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
          onClick={handleSingInWithGoogle}
        >
          Sign Up
        </button>
      </div>
      )}
    </div>
  );
};

export default Header;
