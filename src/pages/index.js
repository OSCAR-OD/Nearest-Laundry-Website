import Navbar from "@/components/Navbar";
import howWeWork from "@/components/assets/img/how_we_work.png";
import town from "@/components/assets/img/twon.png";
import van from "@/components/assets/img/van.png";
import BlogSection from "@/components/home/BlogSection";
import DiscountItems from "@/components/home/DiscountItems";
import HeroSection from "@/components/home/HeroSection";
import PopularItems from "@/components/home/PopularItems";
import Postcode from "@/components/home/Postcode";
import PromotionSection from "@/components/home/PromotionSection";
import Services from "@/components/home/Services";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Image from "next/image";
import * as React from "react";
import Promotion from "@/components/home/Promotion";


export default function Home() {
    const [data, setData] = React.useState();
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.HomePage.homePage();
        setData(response.data);
    }, [setData]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Head>
                <title>Nearest Laundry is the best wash, Ironing, dry cleaning & laundry service in UK.</title>
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
                <link rel="canonical" href={'https://www.nearestlaundry.com/'}/>
            </Head>
            <main>
                <Navbar/>
                <div>
                    <HeroSection banners={data?.mainBanner} />
                    <Promotion />
                    <Services services={data?.services}/>
                    <DiscountItems items={ data?.discountedItems} />
                    <PopularItems items={data?.popularItems}  />

                    <section className="driver-section mt-4 mt-md-3">
                        <div className="container">

                            <h2 className="section-title">Need Fast and Free Delivery?</h2>
                            <h2 className="section-description">
                                If you couldn't find the services you were looking for on our website (nearest laundry), don't worry! <br/>
                                Just hit the Book Now button, enter your postcode, and then type in the laundry items you need to be taken care of <br/>(such as Wash, Wash and Ironing, Dry Cleaning, or Stain Removal).
                                <a className="driver-link auth-btn  text-white text-bolds" href="/order-with-driver" style={{backgroundColor: '#6666FF'}}>
                                    BOOK A SCHEDULE
                                    <span className="animation-line"></span>
                                    <span className="animation-line"></span>
                                    <span className="animation-line"></span>
                                    <span className="animation-line"></span>
                                </a>
                            </h2>
                        </div>
                        <div className="town-section">
                            <Image className="town-image" src={town} alt="Town" loading={'lazy'}/>
                            <a href="/order-with-driver">
                                <Image className="nl-van" src={van} alt="Van" loading={'lazy'}/>
                            </a>
                        </div>
                    </section>

                    {/*Video section*/}
                    {/*<VideoSection videos={data?.videos} />*/}

                    {/*App promotion slider*/}
                    <PromotionSection sliders={data?.appPromotion} />
                    <section className="container how-we-work-section mb-5">
                        <div className="row ">
                            <div className="col-12 mt-4 mt-md-4">
                                <h2 className="section-title">How we work?</h2>
                                <h2 className="section-sub-title">We are Different in Laundry Industry</h2>
                                <p className="section-description">
                                    Select your preferred date for laundry service on our user-friendly website. <br/>
                                    Our friendly delivery team collects your laundry at your doorstep. Trust our experts to clean your garments with care <br/> and eco-friendly products.
                                    We return your freshly cleaned clothes promptly on the scheduled date. <br/>
                                    Why not choose our laundry service today and enjoy clean clothes without any stress or hassle?
                                </p>
                                <Image className="how-we-work-md" src={howWeWork}
                                       alt={'How we work'} loading={'lazy'}/>
                            </div>
                        </div>
                    </section>
                    <BlogSection blogs={data?.blogs} />
                </div>

            </main>
        </>
    )
}