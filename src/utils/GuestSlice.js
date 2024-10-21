import { createSlice } from "@reduxjs/toolkit";

const guestSignIn = createSlice({
    name : "guestLogIn",
    initialState : {
        guest : false
    },
    reducers : {
        addGuest : (state) => {
           state.guest = true
        },
        removeGuest : (state,action) => {

        }
    }
})

export const {addGuest,removeGuest} = guestSignIn.actions
export default guestSignIn.reducer
