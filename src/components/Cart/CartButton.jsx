import classes from "./CartButton.module.css";

import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/toggle-cart-slice";

const CartButton = () => {
    const dispatch = useDispatch();

    const cartQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <button
            className={classes.button}
            onClick={() => {
                dispatch(toggle());
            }}
        >
            <span>My Cart</span>
            <span className={classes.badge}>{cartQuantity}</span>
        </button>
    );
};

export default CartButton;
