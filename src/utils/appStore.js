import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./movieSlice";
import signInWithGoogleSliceReducer from "./signInWithGoogleSlice"

const appStore = configureStore({
    reducer : {
    userFromgoogle : signInWithGoogleSliceReducer,
    movies : movieSliceReducer
    }
})

export default appStore;

