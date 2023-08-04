

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    // name
    name: "cart",

    // initial state

    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },

    // reducers

    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addItemToCart(state, action) {
            const newItem = action.payload;

            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );

            state.totalQuantity++;

            state.changed = true;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.totalPrice + newItem.price;
            }
        },

        removeItemFromCart(state, action) {
            const id = action.payload;

            const existingItem = state.items.find((item) => item.id === id);

            state.totalQuantity--;

            state.changed = true;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            }
        },

        reduceCartItems(state) {
            state.items.reduce(
                (result, item) => result + item.price * item.quantity
            );
        },
    },
});



export const cartActions = cartSlice.actions;

export default cartSlice; // was cartSlice.reducer


/*


const sendCartData = async () => {
            
        dispatch(
          notificationActions.showNotification({
               status: "pending",
            //         title: "Sending...",
            //         message: "Sending cart data...",
            //     })
            // );
            // const response = await fetch(
            //     "https://redux-shopping-app-f59dd-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
            //     { method: "PUT", body: JSON.stringify(cart) }
            // );
            // if (!response.ok) {
            //     throw new Error("Sending cart data failed.");
            // }
            // dispatch(
            //     notificationActions.showNotification({
            //         status: "success",
            //         title: "Success!",
            //         message: "Sent cart data successfully",
            //     })
            // );
        };

       

        // sendCartData().catch(() => {
        //     dispatch(
        //         notificationActions.showNotification({
        //             status: "error",
        //             title: "Error!",
        //             message: "Sending cart data failed",
        //         })
        //     );
        // });




*/ 