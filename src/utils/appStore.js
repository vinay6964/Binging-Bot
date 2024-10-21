import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./movieSlice";
import signInWithGoogleSliceReducer from "./signInWithGoogleSlice"
import gptSearchReducer from "./gptSlice"
import configSliceReducer from "./configSlice"
import guestLogInSliceReducer from "./GuestSlice"

const appStore = configureStore({
    reducer : {
    userFromgoogle : signInWithGoogleSliceReducer,
    movies : movieSliceReducer,
    gpt : gptSearchReducer,
    config : configSliceReducer,
    guestLogIn : guestLogInSliceReducer
    }
})

export default appStore;

