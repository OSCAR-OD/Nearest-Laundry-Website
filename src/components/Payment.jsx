import * as React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "@/components/CheckoutForm";
import secret from "@/utils/secret";
const stripePromise = loadStripe(secret.stripePublic);
const Payment = (props) => {
    const {secret, orderWithDriver, orderInfo} = props;
    const options = {
        // passing the client secret obtained from the server
        clientSecret: secret,
    };
    return (
        <Elements stripe={stripePromise} options={options}>
        <CheckoutForm orderWithDriver={orderWithDriver} orderInfo={orderInfo}/>
        </Elements>);
}
export default Payment;