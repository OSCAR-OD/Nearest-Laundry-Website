import Navbar from "@/components/Navbar";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Image from "next/image";
import * as React from "react";
import { toast } from "react-toastify";
import bannerImg from "/public/Frontend/img/banner-contact-page.jpg";


import Icon from "react-icons-kit";
import { mapMarker, phone } from "react-icons-kit/fa";
import { mail } from "react-icons-kit/feather";


export default function ContactUs() {


  const [data, setData] = React.useState({});

 
    const [contactData, setContactData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

        // fetch site setting
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.PageData.siteSetting();
        // const status = response?.response?.status;
        if (response.success) {
        setData(response.data);
        }
    }, [setData]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const submitMessage = async () => {
        if(contactData.name ==='' || contactData.email === '' || contactData.subject === '' || contactData.message === ''){
            toast('Name, email, subject and message required',{
                hideProgressBar: true,
                autoClose: 2000,
                type: 'error',
                position: 'top-right',
                theme: 'dark'
            })
        } else {
            const response = await REQUEST.PageData.submitQuote(contactData);
            if(response.success){
                setContactData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                toast('Message submitted.',{
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'success',
                    position: 'top-right',
                    theme: 'dark'
                });
            } else {
                if(response?.response?.contactData?.success === false){
                    toast(response.response.contactData.message, {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'error',
                        position: 'top-right',
                        theme: 'dark'
                    });
                }
            }
        }
    }
    return (<>
        <Head>
            <title>Reach Our Customer Support and solve your problem.</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Nearest Laundry offers the best laundry service at your nearest in London. If you are looking for this type of service for your clothes. Please contact us! Feel free to ping our page. We are always ready to give any kind of service."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/contact-us'}/>
        </Head>
        <main>
            <Navbar/>

            <div style={{backgroundColor: '#D9DDE2'}}>

                <section className="container">
                    <div className="row">
                        <div className={`col-12 page-banner `}>
                            <div className="page-banner-wrapper">
                                <Image
                                    src={bannerImg}
                                    priority={true}
                                    alt={"banner"}
                                    width={"1440"}
                                    height={"400"}
                                    className="d-block page-banner-image"
                                    />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <section id={'contact-medium'} className="container quote-section mt-4">
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title">Get free quote</h1>
                        <p className="section-description">
                            Nearest Laundry provides Premium Quality laundry service in your nearest London. <br/>
                            Our experts are always ready to take on big challenges for our customers. Nearest Laundry Delivers for their customers the best affordable, <br/>
                            easy-to-use and Professional Laundry, Dry-Cleaning and Ironing Service that is appropriate for you.
                        </p>
                        <p className="section-sub-title">Who We Are?</p>
                        <p className="section-description">
                            Nearest Laundry provides laundry service in London, United Kingdom from …….. Nearest Laundry Offers Laundry, <br/>
                            Dry cleaning, Ironing, Shoe repair and Wedding dress cleaning services in London. We offer free door-to-door fast delivery in 24 hours. <br/>
                            We use a beautiful environment in the field of clothes cleaning and laundry. We use standard vehicles for end delivery. We have experts who are <br/>
                            always working to give us appropriate feedback.


                        </p>
                    </div>
                </div>
                <div className="row mt-4 mt-md-4">

                    <div className=" col-md-3 mb-3 mb-md-2 ">
                        <h2 className="section-title text-start">Contact Info</h2>

                        <p className="section-description text-start">Feel free to leave us a message using the contact form and we will get back to you within 24 hours.</p>
                        
                        <ul className="">

                            <li className="">
                                    
                                    <Icon
                                        className="align-text-bottom me-2"
                                        size={22}
                                        icon={mapMarker}
                                    />

                                    {data && data.address
                                    ? data.address
                                    : "60 Turnstone Close, E13 0HW, LONDON, E13 0HW"}
                            </li>
                            
                            <li className="">
                                <a href={"tel:02034884131"} className="">
                                    
                                    <Icon
                                        className="align-text-bottom me-2"
                                        size={22}
                                        icon={phone}
                                    />

                                    {data && data.phoneNumber
                                    ? data.phoneNumber
                                    : "02034884131"}
                                </a>
                            </li>
                            <li className="">
                                <a
                                    href="mailto:help@nearestlaundry.com"
                                    className=""
                                >   

                                    <Icon
                                        className="align-text-bottom me-2"
                                        size={22}
                                        icon={mail}
                                    />

                                    {data && data.email
                                    ? data.email
                                    : "help@nearestlaundry.com"}
                                </a>
                            </li>
                        </ul>

                 
                    </div>

                
                    <div className="col-md-9 ms-auto me-auto">
                        <form action="#" className="quote-form">
                            <div className="row mb-4">
                                <div className="col-12 col-md-6 form-group">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="form-control"
                                        value={contactData.name}
                                        onChange={(e)=>setContactData({...contactData, name: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md-6 form-group">
                                    <input
                                        type="text"
                                        placeholder="Phone / Whatsapp no."
                                        className="form-control"
                                        value={contactData.phone}
                                        onChange={(e)=>setContactData({...contactData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-12 col-md-6 form-group">
                                    <input
                                        type="text"
                                        placeholder="Email ID/Address"
                                        className="form-control"
                                        value={contactData.email}
                                        onChange={(e)=>setContactData({...contactData, email: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 col-md-6 form-group">
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="form-control"
                                        value={contactData.subject}
                                        onChange={(e)=>setContactData({...contactData, subject: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-12 form-group">
                                    <textarea
                                        rows="5"
                                        className="form-control"
                                        placeholder="Your message"
                                        onChange={(e)=>setContactData({...contactData, message: e.target.value})}
                                        defaultValue={contactData.message}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 form-group text-center">
                                    <button className="btn btn-primary" onClick={submitMessage}>
                                        Get Free Quote
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
