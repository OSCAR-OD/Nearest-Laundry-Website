import Navbar from "@/components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import * as React from "react";

export default function TermsAndCondition() {
    return (<>


        <Head>
            <title>About Nearest laundry vision and our values.</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="We are providing the best laundry service in London. Our services include laundry, dry cleaning, washing & ironing, alteration, shoe repair, and wedding dress services. Please see our privacy policy and get an idea about our service."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/privacy-policy'}/>
        </Head>

        <main>
            <Navbar/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className={'mt-3 mb-5 section-title'}>Privacy Policy : Nearest Laundry</h1>
                    </div>
                    <div className="col-md-12">
                        <p>Nearest Laundry protects and respects the user's privacy of our website<a
                            href="https://www.nearestlaundry.com/"> https://www.nearestlaundry.com/</a>. </p>
                        <p>This notice is our commitment to your services and protection of your personal data whenever
                            you visit our website www.nearestlaundry.com or communicate with us. It is about telling you
                            of your privacy rights and how the law protects you.
                        </p>
                        <p><b>Who Are We?</b></p>
                        <p>Nearest Laundry is registered in England. We offer the services mentioned on the website. To
                            know more about us we suggest that you visit our site.</p>
                        <p><b>How We Collect Your Information? </b></p>
                        <p>You can give us information about yourself by filling the form on our site through Contact Us
                            page. When you want to either book your order with us or during the process of payment and
                            order delivery. The information includes address, name, email address and phone number,
                            whenever you visit our website.</p>
                        <p><b>Transfer of your personal information to the third party</b></p>
                        <p>Nearest Laundry might employ the services of the drivers and other people to help in
                            particular areas like a collection of laundry, return of goods and cleaning. We also might
                            utilize the services of the third parties to help us in hosting the website, payment brokers
                            or identity checking. If you are giving details of your credit card for payment, we will use
                            the services of a third party to verify the details. We ensure that all third parties
                            respect the privacy and security of your personal data, and treat it according to the law.
                            We will not allow any third party to use your data for any of their objectives and only
                            allow them to process your data for a specific objective and per the instructions.</p>
                        <p><b>Cookies</b></p>
                        <p>The website uses cookies to differentiate you from other users of the site. This helps us to
                            offer your better experience when you browse our site and also allow us to improve our
                            site.</p>
                        <p><b>Security </b></p>
                        <p>All the information that you provide us is stored in our secure servers and our trusted
                            providers. The transmission of information via the internet is not fully secure, though we
                            are making all the efforts to keep your information secure, we cannot guarantee the complete
                            security of the data that you have provided on the site or which is transmitted through the
                            site. Once we have got your information we use our resources and try to protect against any
                            unauthorized access.</p>
                        <p>Nearest Laundry is registered in England..................... Our registered office is at.
                            60 <b>Turnstone Close, E13 0HW, LONDON, E13 0HW</b>.</p>
                    </div>
                </div>
            </div>
            
        </main>
    </>)
}
