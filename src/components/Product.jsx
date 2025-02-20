import { CartContext } from "@/store/contexts/CartContext";
import { truncateString } from "@/utils/helper";
import Image from "next/image";
import * as React from "react";
import { useContext } from "react";

const Product = (props) => {
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
    let q = quantity - 1;
    if (q < 1) {
      q = 1;
      setQuantity(1);
    } else {
      setQuantity(q);
    }
    setProductPrice((q * offeredPriceCalculator(product)).toFixed(2));
  };

  let productName =
    "Ironing Shirt and Fold Ironing Shirt and Fold Ironing Shirt and Fold Ironing Shirt and Fold";
  const cart = () => {
    const item = {
      pid: product._id,
      product: product,
      quantity: quantity,
      price: productPrice,
    };

    dispatch({ type: "ADD_TO_CART", product: item });

    // todo: will remove
    // if (!data) {
    //   localStorage.setItem("cart", JSON.stringify([item]));
    //   toast("Product added to cart. " + "You can edit those anytime.", {
    //     hideProgressBar: true,
    //     autoClose: 2000,
    //     type: "info",
    //     position: "top-center",
    //     theme: "dark",
    //   });
    // } else {
    //   let exist = data.find((o) => o.pid === product._id);
    //   if (!exist) {
    //     data.push(item);
    //     localStorage.setItem("cart", JSON.stringify(data));
    //     toast("Product added to cart. " + "You can edit those anytime.", {
    //       hideProgressBar: true,
    //       autoClose: 2000,
    //       type: "info",
    //       position: "top-center",
    //       theme: "dark",
    //     });
    //   } else {
    //     toast(
    //       "You have already added this product to cart. " +
    //         "Please edit from cart now.",
    //       {
    //         hideProgressBar: true,
    //         autoClose: 2000,
    //         type: "info",
    //         position: "top-center",
    //         theme: "dark",
    //       }
    //     );
    //   }
    // }
  };

  return (
    <div className="product-card">
      <a
        href={`/product/${product?.name
          ?.toLowerCase()
          .replaceAll(" ", "-")}`}
        style={{ textDecoration: "none" }}
      >
        <div className="image-wrapper">
          <Image
            src={product.image}
            alt={product.name}
            className={"product-image"}
            priority={true}
            width={200}
            height={160}
          />
        </div>

        <p className="product-title"> {truncateString(product.name, 35)}</p>
        <h6 className="product-price">£ {productPrice}</h6>
      </a>

      <div className="incrementer">
        <button className="btn decrement-btn" onClick={decrement}>
          -
        </button>
        <span className="changed-amount">{quantity}</span>
        <button className="btn increment-btn" onClick={increment}>
          +
        </button>
      </div>
      <div className="action-buttons text-center">
        {/* <a
          className="btn buy-now-btn"
          href={`/product/${product?.name?.toLowerCase()
            .replaceAll(" ", "-")}+*+NLP${product._id}`}
          style={{ color: "var(--color-white)" }}
        >
          Buy Now
        </a> */}
        {/* <span className="border-right"></span> */}
        <button className="btn add-to-cart-btn" onClick={cart}>
          Add to Cart
        </button>
      </div>
      {product.offerType ? (
        <p className="discount-ribbon">
          {product.offerType === "amount" ? "£" : ""}
          {product.offerAmount}
          {product.offerType === "percentage" ? "%" : ""} Discount
        </p>
      ) : null}
    </div>
  );
};

export default Product;
