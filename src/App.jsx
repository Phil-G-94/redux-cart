import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "./store/notification-slice";

let isInitial = true;

function App() {
    const dispatch = useDispatch();

    const toggleCart = useSelector((state) => state.toggle.isToggled);

    const cart = useSelector((state) => state.cart);

    const notification = useSelector(
        (state) => state.notification.notification
    );

    console.log(notification); // return notification object

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                notificationActions.showNotification({
                    status: "pending",
                    title: "Sending...",
                    message: "Sending cart data...",
                })
            );

            const response = await fetch(
                "https://redux-shopping-app-f59dd-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
                { method: "PUT", body: JSON.stringify(cart) }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }

            dispatch(
                notificationActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully",
                })
            );
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch(() => {
            dispatch(
                notificationActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed",
                })
            );
        });
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                ></Notification>
            )}
            <Layout>
                {toggleCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
