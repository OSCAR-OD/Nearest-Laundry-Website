import Navbar from "@/components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

export default function AboutUs() {
    return (
        <>
        <Head>
            <title>Discover Our Story and all our links at about us </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="At Nearest Laundry, we’re not just a laundry in London. We're your trusted laundry partners near your home. Our journey began with a mission to define laundry service. From Wash, Wash and Ironing, and Dry cleaning, we've set new standards in care. Our team is dedicated to making laundry effortless."/>
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href="https://www.nearestlaundry.com/about-us"/>
        </Head>
        <main>
            <Navbar/>
            <div className="container mt-4 mt-md-4">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className={'mt-2 mb-3 section-title'}>About us</h1>
                    </div>
                        <div className="col-md-12">
                            <p><a href="https://nearestlaundry.com">Nearest Laundry</a> has built up an excellent
                                reputation in London and is now one of the leading laundry companies in the entire
                                locality.</p>
                            <p>We are committed to our customers because of our extensive range of laundry services, our
                                reliability, flexibility, and prompt delivery services. We are proud to offer you mobile
                                laundry services, <a href="https://nearestlaundry.com/service/dry-cleaning">dry
                                    cleaning</a>, wash &amp; iron, ironing boots repair, clothing alterations, and
                                tailoring services. What’s more interesting is our free pick-up and delivery within 24
                                hours.</p>
                            <h3 className={'section-sub-title text-start'}>Our Mission</h3>
                            <p>Customer Satisfaction is our Priority! We are dedicated to high-quality and exceptional
                                services when it comes to our client’s needs. We specialize in our reliable process
                                where the professional team picks your laundry, cleans it methodically, and delivers it
                                to you on proper terms. </p>
                            <p><b>Experience Quality Laundry Services in London to Save Time and Effort</b></p>
                            <p>We at Nearest Laundry provide you hassle-free pick-up laundry services in London markets.
                                Our professionals carefully handle each item and deliver your laundry back to your
                                doorstep. Don’t Worry! Be it your delicate clothes, pillows, and sheets, we can do
                                everything perfectly for you. We offer convenient laundry services to suit your
                                needs.</p>
                            <p>Our cleaning experts make sure to serve you with highly advanced services that we
                                incorporate in our high-end working process. With our reliable mobile laundry and
                                dry-cleaning services, you additionally get benefit with:</p>
                            <ol>
                                <li>Convenience &amp; Reliability</li>
                                <li>Hassle-Free Process</li>
                                <li>Trusted Professionals</li>
                                <li>Free Pickup Service</li>
                                <li>Delivery within 24 hours</li>
                                <li>Cost-Effective Services</li>
                            </ol>
                            <p>Book our convenient laundry pickup and delivery services in London Area, go online in a
                                few clicks. We are just a call away, reserve your appointment today. Ready to experience
                                a clean &amp; fresh laundry and avail of our quality services? Feel free to contact us
                                at your convenience!</p>
                            <p>Contact Details: <a href="tel:02034884131">02034884131</a></p>
                        </div>
                </div>
            </div>
        </main>
    </>)
}
