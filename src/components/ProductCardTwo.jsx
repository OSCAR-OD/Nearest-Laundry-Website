import { CartContext } from "@/store/contexts/CartContext";
import Image from "next/image";
import * as React from "react";
import { useContext } from "react";

const ProductCard = (props) => {
    const { product } = props;

    const { dispatch } = useContext(CartContext);

    const offeredPriceCalculator = (product) => {
        let op = parseFloat(product.price);
        if (product.offerAmount > 0) {
            if (product.offerType === "percentage") {
                op = op - (product.offerAmount / 100) * op;
            } else {
                op = op - product.offerAmount;
            }
        }
        return parseFloat(op.toFixed(2));
    };
    const [quantity, setQuantity] = React.useState(1);
    const [productPrice, setProductPrice] = React.useState(
        offeredPriceCalculator(product)
    );
    const increment = () => {
        const q = quantity + 1;
        setQuantity(q);
        setProductPrice((q * offeredPriceCalculator(product)).toFixed(2));
    };
    const decrement = () => {
        const q = quantity - 1;
        if (q < 1) setQuantity(1);
        else setQuantity(q);
        setProductPrice((q * offeredPriceCalculator(product)).toFixed(2));
    };

    const cart = () => {
        const item = {
            pid: product._id,
            product: product,
            quantity: quantity,
            price: productPrice,
        };

        dispatch({ type: "ADD_TO_CART", product: item });
    };

    return (
        <>
            <div className="product-two">
                <div className="product-two-card">
                    <h2 className="name">Nike Zoom Fly Flyknit</h2>
                    <span className="price">$140.00</span>
                    <a className="popup-btn">Quick View</a>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueydgLsFumxg1LVnm0-zKEUgnbvHNSO8TGQ&usqp=CAU"
                        className="product-two-img" alt="" />
                </div>
            </div>
        </>
    );
};

export default ProductCard;
