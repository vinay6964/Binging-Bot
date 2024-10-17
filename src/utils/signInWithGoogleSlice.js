import { createSlice } from "@reduxjs/toolkit";

const userFromGoogle = createSlice({
    name : "userFromgoogle",
    initialState : JSON.parse(localStorage.getItem("userFromgoogle")) || null, 
    reducers : {
        addUserFromGoogle : (state,action) => {
            localStorage.setItem("userFromgoogle",JSON.stringify(action.payload));
            return action.payload
        },
        removeUserFromGoogle : (state,action) => {
            localStorage.removeItem("userFromgoogle")
            return null;
        }
    }
})

export const {addUserFromGoogle,removeUserFromGoogle} = userFromGoogle.actions
export default userFromGoogle.reducer;