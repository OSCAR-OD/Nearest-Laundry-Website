import FooterTwo from "@/components/FooterTwo";
import Navbar from "@/components/Navbar";
import Payment from "@/components/Payment";
import REQUEST from "@/utils/networks/Request";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from 'react';

const Payments = () => {
    const [data, setData] = React.useState();
    const router = useRouter();
    const {order_id} = router.query;
    const fetchData = React.useCallback(async () => {
        const resp = await REQUEST.PageData.getOrderInfo(order_id);
        console.log(resp);
        if(resp.success){
            setData(resp.data);
        } else {
            router.push('/404');
            return;
        }
    }, [setData, order_id]);
    React.useEffect(()=>{
        if (!order_id) {
            return;
        }
        fetchData();
    },[fetchData, order_id]);
    return (<>

        <Head>
            <title>Payments | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
            <link rel="canonical" href={`https://www.nearestlaundry.com/payments/${order_id}`}/>
        </Head>
        <main>
            <Navbar/>
            <section className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-title">Product Payments</h3>
                        <h5 className={'section-sub-title'}>You are on very last stage of checkout!! <br/></h5>
                        <h5 className="section-description">
                            Nearest Laundry serve all kinds of Laundry services. Some times our happy customer don't find their exprected services. <br/>
                        </h5>
                        <h5 className={'section-sub-title'}>Your satisfaction is our happiness.</h5>
                    </div>
                </div>
            </section>
            {data? <Payment secret={data.paymentIntent} orderInfo={data}/>: null}
            <FooterTwo />
        </main>
    </>);
}

export default Payments;