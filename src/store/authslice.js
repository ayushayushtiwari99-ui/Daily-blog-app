import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    status : false,
    userData: null,
}
const authslice = createSlice({
    name: "auth",
    initialState: initialstate,
    reducers: {
        login: (state ,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login,logout} = authslice.actions;

export default authslice.reducer;