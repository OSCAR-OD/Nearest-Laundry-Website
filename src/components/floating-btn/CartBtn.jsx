import { CartContext } from "@/store/contexts/CartContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import cart from "../assets/img/cart.png";

const CartBtn = (props) => {
  const { cart: cartItems } = useContext(CartContext);

  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    let qtyCount =
      cartItems.length > 0
        ? cartItems.reduce((acc, obj) => {
            return acc + obj.quantity;
          }, 0)
        : 0;

    setTotalQty(qtyCount);
  }, [cartItems]);
  return (
    <div className={"cart-btn-float"}>
      <a className={"btn position-relative"} href={"/cart"}>
        <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-info">
          {totalQty}
        </span>
        <Image className="cart-icon" src={cart} alt={"Cart"} priority={true} />
      </a>
    </div>
  );
};

export default CartBtn;
