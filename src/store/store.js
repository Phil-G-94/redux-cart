import { configureStore } from "@reduxjs/toolkit";

import toggleReducer from "./toggle-cart-slice";
import cartReducer from "./cart-slice";
import notificationReducer from "./notification-slice";

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        cart: cartReducer,
        notification: notificationReducer,
    },
});
