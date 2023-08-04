import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { notificationActions } from "./store/notification-slice";

// import sendCartData() 'thunk' from cart-slice.js

import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
    const dispatch = useDispatch();

    const toggleCart = useSelector((state) => state.toggle.isToggled);

    const cart = useSelector((state) => state.cart);

    const notification = useSelector(
        (state) => state.notification.notification
    );

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.changed) {
            // dispatch 'thunk' passing cart as argument
            dispatch(sendCartData(cart));
        }
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
