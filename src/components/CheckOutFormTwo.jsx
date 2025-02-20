import { AppContext } from "@/store/contexts/AppContext";
import { CartContext } from "@/store/contexts/CartContext";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import * as React from "react";
import { toast } from "react-toastify";

const CheckOutFormTwo = (props) => {
  const { orderWithDriver, orderInfo, clientSecret } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = React.useState(null);

  const { dispatch } = React.useContext(CartContext);
  const { dispatch: AppDispatch } = React.useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // clear cart
    dispatch({ type: "CLEAR_CART", product: {} });

    // clear refer code
    AppDispatch({ type: "REMOVE_REFER_CODE", refer_code: null });

    if (!orderInfo) {
      toast("No Order Information was provided", {
        hideProgressBar: true,
        autoClose: 4000,
        type: "warning",
        position: "top-right",
        theme: "dark",
      });
    } else {
      if (!stripe || !elements) return;
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.protocol}//${window.location.host}/order-complete/${orderInfo.oid}`,
        },
      });
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Show error to your customer
        setErrorMessage(submitError.message);
        return;
      }

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        let message = result.error.message;
        if (result.error?.decline_code) {
          message +=
            " The reason is " + result.error.decline_code.replaceAll("_", " ");
        }
        setErrorMessage(message);
        toast(message, {
          hideProgressBar: true,
          autoClose: 4000,
          type: "warning",
          position: "top-right",
          theme: "dark",
        });
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.

        console.log(result);
      }
    }
  };
  const stripeElemntBlur = (event) => {
    console.log(event);
  };
  return (
    <div className={"row"}>
      <div className="col-md-12 col-lg-12 me-auto ms-auto">
        <div
          className="payment-wrapper"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <h1 className={"section-title"}>Pay Through Stripe</h1>
          <h3 className={"section-description mb-5"}>
            We do not store or record your banking information. <br />
            Please feel safe paying through Stripe payment gateway. <br />
            {orderWithDriver ? (
              <span
                style={{ color: "var(--color-primary-1)", fontSize: "18px" }}
              >
                We charge minimum order value of £ 20 as security
              </span>
            ) : null}
          </h3>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
              type="submit"
              className={"btn btn-primary mt-4 mb-3"}
              disabled={!stripe || !elements}
            >
              Pay £ {orderInfo.price ?? 20} as Security
            </button>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default CheckOutFormTwo;
