import CheckOutFormTwo from "@/components/CheckOutFormTwo";
import secret from "@/utils/secret";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from 'react';
import Icon from "react-icons-kit";
import { angleDoubleLeft } from 'react-icons-kit/fa';
const stripePromise = loadStripe(secret.stripePublic);

const PaymentScreen = () => {
    const router = useRouter();
    const {pi, oid} = router.query;
    console.log(router.pathname === '/payment/[oid]/[pi]')
    const [piState, setPIState] = React.useState('');
    const [oidState, setOidState] = React.useState('');
    React.useEffect(() => {
        if(!pi || !oid){
            return;
        } else {
            setPIState(pi);
            setOidState(oid);
        }
    }, [pi, oid]);
    console.log(router.query);
    return (<>

        <Head>
            <title>Checkout | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Worried about Wash, dry cleaning, Ironing, laundry, shoe repair and Wedding dress cleaning service in London or your near? Don’t be concerned! Nearest Laundry Offers mobile laundry service and same-day laundry service in the United Kingdom. We provide free door-to-door pickup and delivery service."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={`https://www.nearestlaundry.com/payment/${oid}/${pi}`}/>
        </Head>

        <main>
            <section className={'payment-main'}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <div className={'d-flex align-items-center'}>
                                <Icon icon={angleDoubleLeft} size={40} style={{color: 'white'}}/> <a
                                style={{cursor: 'pointer', color: 'white', fontSize: '18px'}}
                                onClick={() => {router.push('/')}}
                            >Go Back to Nearest laundry</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {
                                piState !== ''? <Elements stripe={stripePromise} options={{
                                    // passing the client secret obtained from the server
                                    clientSecret: piState,
                                }}>
                                    <CheckOutFormTwo orderWithDriver={false} orderInfo={{oid:oidState}} clientSecret={piState}/>
                                </Elements> : null
                            }

                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>);
}

export default PaymentScreen;