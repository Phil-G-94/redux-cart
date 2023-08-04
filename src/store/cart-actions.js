// importing cartActions for fetchCartData thunk

import { cartActions } from "./cart-slice";

// importing notificationActions for sendCartData thunk

import { notificationActions } from "./notification-slice";

// thunk 
// returns an anonymous function that
// receives dispatch as an argument and
// within its body passes the action(s) we want to use to dispatch

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://redux-shopping-app-f59dd-default-rtdb.europe-west1.firebasedatabase.app/cart.json");

            if (!response.ok) {
                throw new Error("Could not fetch cart data.")
            }

            const data = await response.json();

            return data;
        }


        // this fixed it!!!!
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }))

        } catch {
            dispatch(
                notificationActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Fetching cart data failed",
                })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            notificationActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data...",
            })
        );

        const sendRequest = async () => {
            // JSON.stringify(cart)
            const response = await fetch(
                "https://redux-shopping-app-f59dd-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                { method: "PUT", body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }) }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        }

        try {
            await sendRequest();

            dispatch(
                notificationActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully",
                })
            );
        } catch (error) {
            console.log(error)
            dispatch(
                notificationActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed",
                })
            );

        }


    };
}