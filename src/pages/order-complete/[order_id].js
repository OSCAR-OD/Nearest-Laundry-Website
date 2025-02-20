import Navbar from "@/components/Navbar";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";

export default function OrderComplete() {
    const [data, setData] = React.useState();
    const router = useRouter();
    const {order_id, payment_intent, payment_intent_client_secret, redirect_status} = router.query;
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.PageData.orderCompletion({
            order_id,
            payment_intent,
            payment_intent_client_secret,
            redirect_status
        });
        if(response.success) {
            localStorage.removeItem('cart');
            setData(response.message);
        }
    }, [setData, order_id]);
    React.useEffect(() => {
        if (!order_id) {
            return;
        }
        fetchData();
    }, [fetchData, order_id]);
    return (<>
        <Head>
            <title>Order Complete | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
            <link rel="canonical" href={'https://www.nearestlaundry.com/order-complete/'+order_id}/>
        </Head>
        <main>
            <Navbar/>
            <section className="order-complete">
                <div className="row">
                    {redirect_status==="succeeded"?
                    <div className="col-12">
                        <h3 className={'section-title'}>Your order was complete</h3>
                        <h4 className={'text-center'}>Thank you for ordering with us.</h4>
                        <p className={'section-description'}>
                            One of our delivery man will shortly contact with you. <br/>
                            Once again, we believe in happy you happy us. <br/>
                            Thanks.
                        </p>
                    </div>
                        :
                    <div className="col-12">
                        <h3 className={'section-title'}>Your order was not complete.</h3>
                        <h4 className={'text-center'}>We could not process your order.</h4>
                        <p className={'section-description'}>
                            There was an issue while processing your order. <br/>
                            Once again, we believe in happy you happy us. <br/>
                            Please contact our customer support. Thanks.
                        </p>
                    </div>
                    }

                </div>
            </section>
            
        </main>
    </>)
}
