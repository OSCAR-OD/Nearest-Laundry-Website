import CustomCarousel2 from "@/components/CustomCarousel2";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import * as React from "react";

export default function Videos() {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.HomePage.videos();
        setData(response.data);
        if (response.data) {
            setLoading(false);
        }
    }, [setData, setLoading]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <>


            <Head>
                <title>Videos | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
                <link rel="canonical" href={'https://www.nearestlaundry.com/videos'}/>
            </Head>
            <main>
                <Navbar/>
                {loading ? <PageLoader/> :
                    <div>
                        <CustomCarousel2 banners={data?.mainBanner}/>
                        {/*Video section*/}
                        <section style={{marginTop: '20px!important'}} className="container video-section">
                            <div className="row mb-5">
                                <h1 className="section-title">Videos you may like</h1>
                                <h3 className="section-description">We have few videos describing us and how we work.
                                    <br/>It may become one of your interest.</h3>
                            </div>
                            <div className="row">
                                {data?.videos.length ?
                                    data.videos.map((item, index) => <div className="col-md-6 p-3 text-center">
                                        <iframe key={index}
                                                width={'100%'}
                                                height={300}
                                                src={item.link}
                                                title={item.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen></iframe>
                                    </div>)
                                    : null}

                            </div>
                        </section>
                        
                    </div>
                }

            </main>
        </>
    )
}
