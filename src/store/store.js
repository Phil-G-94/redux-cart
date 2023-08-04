import { configureStore } from "@reduxjs/toolkit";

import toggleSlice from "./toggle-cart-slice";  // was toggleReducer
import cartSlice from "./cart-slice"; // was cartReducer 
import notificationSlice from "./notification-slice"; // was notificationReducer

export const store = configureStore({
    reducer: {
        toggle: toggleSlice.reducer,
        cart: cartSlice.reducer,
        notification: notificationSlice.reducer,
    },
});
