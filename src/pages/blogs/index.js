import BlogCardTwo from "@/components/BlogCardTwo";
import CustomCarousel2 from "@/components/CustomCarousel2";
import Navbar from "@/components/Navbar";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import * as React from "react";
import Skeleton from "react-loading-skeleton";

export default function Blogs() {
    const [data, setData] = React.useState();
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.PageData.blogs(1, 100);
        setData(response.data);
    }, [setData]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    const firstLoad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
    return (<>
        <Head>
            <title>Expert Laundry Tips and Advice for your garments.</title>
            <meta name="description" content="Nearest Laundry is the top laundry service in your Nearest. Laundry, Dry cleaning, Wash & ironing, Shoe repair, alteration, and wedding dress service we are providing with quality. We also publish blogs for our clients about laundry,  How can we care about our clothes and their quality." />
            <meta name="keywords" content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width" />
            <meta name="generator" content="pgwd" />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/blogs'} />
            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@NearestLaundry" />
            <meta name="twitter:title" content="Expert Laundry Tips and Advice for your garments." />
            <meta name="twitter:description" content="Nearest Laundry is the top laundry service in your Nearest. Laundry, Dry cleaning, Wash & ironing, Shoe repair, alteration, and wedding dress service we are providing with quality. We also publish blogs for our clients about laundry,  How can we care about our clothes and their quality." />
            <meta name="twitter:image" content="https://www.nearestlaundry.com/_next/image?url=https%3A%2F%2Fapi.nearestlaundry.com%2Ffile-1690957157106-375591901.19.00%20PM.jpeg&w=1920&q=75" />
            {/* facebook */}
            <meta property="og:type" content="website" />
            <meta name="og:title" content="Expert Laundry Tips and Advice for your garments." />
            <meta name="og:description" content="Nearest Laundry is the top laundry service in your Nearest. Laundry, Dry cleaning, Wash & ironing, Shoe repair, alteration, and wedding dress service we are providing with quality. We also publish blogs for our clients about laundry,  How can we care about our clothes and their quality." />
            <meta property="og:url" content="https://www.nearestlaundry.com" />
            <meta name="og:image" content="https://www.nearestlaundry.com/_next/image?url=https%3A%2F%2Fapi.nearestlaundry.com%2Ffile-1690957157106-375591901.19.00%20PM.jpeg&w=1920&q=75" />
            <meta property="og:image:width" content="683" />
            <meta property="og:image:height" content="1024" />
        </Head>
        <main>
            <Navbar />
            <CustomCarousel2 banners={data?.mainBanner} />
            <section className="container discounted-item-section mt-4 mt-md-4">
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title">Our Blogs</h1>
                        <p className="section-description">
                            Nearest Laundry is the best-leading clothing care company in London, United Kingdom. <br />
                            Nearest Laundry offers same-day and instant laundry service in London. Our services include Laundry, Ironing, Dry-cleaning, <br />
                            washing and ironing, Shoe Repair and Wedding dress Cleaning services in your nearby. We are continuously writing blogs for our <br />
                            reputable clients. We write blogs about how we can care for our clothes. With different times and weather, we should care about our <br />
                            favourite clothes differently, so we are aware of our customers through our blogs as if they can understand about taking care of <br />
                            clothes and shoes. Our Experienced content writers always try to give the best solution through the best blogs. Stay with Nearest Laundry <br />
                            and Enjoy our quality services!
                        </p>
                    </div>
                </div>
                <div className={'row d-flex mt-4 blog-container'}>
                    {data?.data?.length > 0 ? data?.data.map((item, index) =>
                        <BlogCardTwo key={index} blog={item} />
                    ) : firstLoad.map((item, index) => <div className="card-container" key={index}>
                        <div className="card-image">
                            <Skeleton style={{ width: '300px', height: '250px' }} />
                        </div>
                        <Skeleton style={{ marginTop: '20px', height: '20px', marginBottom: '15px' }} />
                        <Skeleton count={3} />
                    </div>)}
                </div>
            </section>



        </main>
    </>)
}
