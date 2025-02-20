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
    let q = quantity - 1;
    if (q < 1) {
      q = 1;
      setQuantity(1);
    } else {
      setQuantity(q);
    }

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
    <div className="product-card product-card-1">
      <div className={"incrementer-1"}>
        <p className="product-title d-md-none">{product.name}</p>
        <h6 className="product-price">
          {product.price != productPrice && product.offerAmount > 0 ? (
            <del style={{ marginRight: "10px", color: "#000" }}>
              £ {parseFloat(product.price).toFixed(2)}
            </del>
          ) : null}
          £ {parseFloat(productPrice).toFixed(2)}
        </h6>
        <div className="text-center">
          <button className="btn decrement-btn" onClick={decrement}>
            -
          </button>
          <span className="changed-amount">{quantity}</span>
          <button className="btn increment-btn" onClick={increment}>
            +
          </button>
        </div>
        <div className="action-buttons-1 text-center">
          <button className="btn add-to-cart-btn" onClick={cart}>
            Add to Cart
          </button>
        </div>
      </div>
      <a
        href={`/product/${product.name
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        style={{ textDecoration: "none" }}
      >
        <div className="image-wrapper">
          <Image
            src={product.image}
            alt={product.name}
            className={"product-image"}
            width={200}
            height={160}
            loading={'lazy'}
          />
        </div>

        <h5 className="product-title">{product.name}</h5>
        <h6 className="product-price">
          {product.price != productPrice && product.offerAmount > 0 ? (
            <del style={{ marginRight: "10px", color: "#000" }}>
              £ {parseFloat(product.price).toFixed(2)}
            </del>
          ) : null}
          £ {parseFloat(productPrice).toFixed(2)}
        </h6>
      </a>
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

export default ProductCard;
