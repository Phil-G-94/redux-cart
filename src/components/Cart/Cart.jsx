import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);

    /* source: https://stackoverflow.com/questions/74343752/how-to-calculate-the-total-price-of-your-cart */
    const totalPrice = cartItems
        .map((item) => item.quantity * item.price)
        .reduce(
            (totalPrice, singleItemPrice) => totalPrice + singleItemPrice,
            0
        );

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={{
                            id: item.id,
                            title: item.name,
                            quantity: item.quantity,
                            total: item.totalPrice,
                            price: item.price,
                        }}
                    />
                ))}
            </ul>
            <p>The total price is: ${totalPrice}</p>
        </Card>
    );
};

export default Cart;
