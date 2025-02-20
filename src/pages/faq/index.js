import Navbar from "@/components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import * as React from "react";

export default function Faq() {
    return (<>

        <Head>
            <title>Faq | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
            <link rel="canonical" href={'https://www.nearestlaundry.com/faq'}/>
        </Head>

        <main>
            <Navbar/>
            <section id={'contact-medium'} className="container quote-section mt-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title">FAQ</h1>
                        <h3 className="section-description">
                            Our clothing speaks volumes about your personality. It is your identity. At Nearest Laundry, in London, we
                            only make sure
                            <br/>to enhance this statement by providing you daily with a fresh, neat set of clothing all washed and
                            ironed at your door step.
                            <br/>We always ensure the quality of laundry and dry cleaning. Our fleet team is efficient enough to
                            ensure your schedule
                            <br/> collection and delivery. At the facility, we have an expert inspection process to make sure the
                            quality of wash and Iron. For
                            <br/>laundry, Dry cleaning, or Ironing, we are the most reliable company in your area.
                        </h3>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-8 ms-auto me-auto">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                        Accordion Item #1
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show"
                                     aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the first item's accordion body.</strong> It is shown by
                                        default, until the collapse plugin adds the appropriate classes that we use to
                                        style each element. These classes control the overall appearance, as well as the
                                        showing and hiding via CSS transitions. You can modify any of this with custom
                                        CSS or overriding our default variables. It's also worth noting that just about
                                        any HTML can go within the <code>.accordion-body</code>, though the transition
                                        does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo">
                                        Accordion Item #2
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the second item's accordion body.</strong> It is hidden by
                                        default, until the collapse plugin adds the appropriate classes that we use to
                                        style each element. These classes control the overall appearance, as well as the
                                        showing and hiding via CSS transitions. You can modify any of this with custom
                                        CSS or overriding our default variables. It's also worth noting that just about
                                        any HTML can go within the <code>.accordion-body</code>, though the transition
                                        does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse"
                                     aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by
                                        default, until the collapse plugin adds the appropriate classes that we use to
                                        style each element. These classes control the overall appearance, as well as the
                                        showing and hiding via CSS transitions. You can modify any of this with custom
                                        CSS or overriding our default variables. It's also worth noting that just about
                                        any HTML can go within the <code>.accordion-body</code>, though the transition
                                        does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
