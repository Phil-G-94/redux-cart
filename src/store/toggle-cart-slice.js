import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isToggled: false,
};

export const toggleSlice = createSlice({
    name: "toggle",

    initialState,

    reducers: {
        toggle(state) {
            state.isToggled = !state.isToggled;
        },
    },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
