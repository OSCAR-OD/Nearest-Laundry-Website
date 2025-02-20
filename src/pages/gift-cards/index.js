import CustomCarousel2 from "@/components/CustomCarousel2";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";

import GiftCardForm from "@/components/giftCard/GiftCardForm";

export default function Home() {
    const router = useRouter();
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
   
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        name: ''
    });
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.HomePage.homePage();
        setData(response.data);
        if(response.data){
            setLoading(false);
        }
        let userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            userInfo = JSON.parse(userInfo);
            setUserInfo({
                email: userInfo.email,
                name: userInfo.name
            })
        }
    }, [setData, setLoading]);
    React.useEffect(()=>{
        fetchData();
    },[fetchData]);

    

    return (
        <>
            <Head>
                <title>Gift Cards | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
                <link rel="canonical" href={'https://www.nearestlaundry.com/gift-cards'}/>
            </Head>

            <main>
                <Navbar />
                {loading? <PageLoader />:
                    <div>
                        <CustomCarousel2 banners={data?.mainBanner}/>
                        
                        <section className={'order-with-driver container mt-4 mt-md-5'}>
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="section-title">Gift Cards</h1>
                                    <h5 className={'section-sub-title'}>The Perfect Gift for Someone Special</h5>
                                </div>
                            </div>


                            <GiftCardForm/>
                            
                           
                        </section>
                    </div>
                }

            </main>
        </>
    )
}
