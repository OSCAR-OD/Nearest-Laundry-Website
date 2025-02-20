import CustomCarousel2 from "@/components/CustomCarousel2";
import DriverOrderAddress from "@/components/DriverOrderAddress";
import DriverOrderBilling from "@/components/DriverOrderBilling";
import DriverOrderCollection from "@/components/DriverOrderCollection";
import DriverOrderServices from "@/components/DriverOrderServices";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Payment from "@/components/Payment";
import { AppContext } from "@/store/contexts/AppContext";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

export default function Home() {
    const router = useRouter();
    const {
        appData: { refer_code }
      } = React.useContext(AppContext);

      
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [progress, setProgress] = React.useState(0);
    const [steps, setSteps] = React.useState(0);
    const [postCode, setPostCode] = React.useState('');
    const [streetAddress, setStreetAddress] = React.useState('');
    const [items, setItems] = React.useState([{service: '', quantity: 1}]);
    const [cdData, setCdData] = React.useState({
        collectionDate: '',
        collectionTime: '',
        collectionInfo: '',
        deliveryDate: '',
        deliveryTime: '',
        deliveryInfo: '',
    });
    const [billing, setBilling] = React.useState({
        email: '',
        name: ''
    });
    const [orderData, setOrderData] = React.useState();
    const [stripeSecret, setStripeSecret] = React.useState('pi_3NLQP2IIQpgUe9ST1lvdQm6k_secret_AGGL5nJUaXtDlRRIHkZoLuqoe');
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.HomePage.homePage();
        setData(response.data);
        if(response.data){
            setLoading(false);
        }
        let userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            userInfo = JSON.parse(userInfo);
            setBilling({
                email: userInfo.email,
                name: userInfo.name
            })
        }
    }, [setData, setLoading]);
    React.useEffect(()=>{
        fetchData();
    },[fetchData]);
    const nextStep = () => {
        let error = false;
        let em = '';
        if(steps === 0){
            if(!postCode || !streetAddress){
                error = true;
                em = 'Both post code and street address required.'
            }
        } else if(steps === 1) {
            for (let item of items) {
                if(item.service === '' || item.quantity === 0){
                    error = true;
                    em = 'One of the item contains empty value or quantity of zero.'
                }
            }
            if(items[0].service === '' || items[0].quantity===0){
                error = true;
                em = 'At least one item required.'
            }
        } else if(steps === 2){
            if(
                !cdData.collectionDate ||
                !cdData.collectionTime ||
                !cdData.deliveryDate ||
                !cdData.deliveryTime
            ) {
                error = true;
                em = "Both collection and delivery date-time required"
            }
        }
        if(!error){
            const step = steps +1;
            setSteps(step);
            progressHandler(step);
        } else {
            toast(em,
                {
                    hideProgressBar: true,
                    autoClose: 4000,
                    type: 'info',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        }
    }
    const previousStep = () => {
        let step = steps - 1;
        if(step < 0) step = 0;
        setSteps(step);
        progressHandler(step);
    }
    const progressHandler = (step) => {
        if(step === 1){
            setProgress(25);
        } else if(step === 2){
            setProgress(50);
        } else if (step === 3){
            setProgress(75)
        }  else if (step === 4){
            setProgress(100)
        } else {
            setProgress(0);
        }
    }
    const setItemFromParent = (data) => {
        setItems(data);
    }
    const orderWithDriverSubmit = async () => {
        if(!billing.name ||
            !billing.email ||
            !billing.billingPostcode ||
            !billing.billingStreetAddress ||
            !billing.mobile
        ){
            toast("Please fill in required parameter.",
                {
                    hideProgressBar: true,
                    autoClose: 4000,
                    type: 'info',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        } else {
            const orderSubmission = await REQUEST.PageData.driverOrder({
                postCode,
                streetAddress,
                items,
                ...cdData,
                ...billing,
                referCode: refer_code ?? null,
            });

            if(orderSubmission.success){
                const url = `/payment/${orderSubmission.data.orderInfo._id}/${orderSubmission.data.paymentIntent}`;
                router.push(url);
                setStripeSecret(orderSubmission.data.paymentIntent);
                setOrderData({
                    oid: orderSubmission.data.orderInfo._id,
                    postCode,
                    streetAddress,
                    items,
                    cdData,
                    billing
                })
                // setSteps(4);
                // progressHandler(4);
            } else {
                toast('Something went wrong. Please try again later. Thanks.',
                    {
                        hideProgressBar: true,
                        autoClose: 4000,
                        type: 'error',
                        position: 'top-right',
                        theme: 'dark'
                    }
                )
            }
        }
    }

    return (
        <>
            <Head>
                <title>We provide free door-to-door pickup and delivery service.</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Nearest Laundry offers 20 discounts on every service. Use this coupon NEAREST20 and get 20% discount on every service. Nearest Laundry offers same-day laundry and mobile laundry services in London."
                />
                <meta
                    name="keywords"
                    content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
                />
                <meta name="author" content="Nearest Laundry" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="canonical" href={'https://www.nearestlaundry.com/order-with-driver'}/>
            </Head>

            <main>
                <Navbar />
                {loading? <PageLoader />:
                    <div>
                        <CustomCarousel2 banners={data?.mainBanner}/>
                        
                        <section className={'order-with-driver container mt-4 mt-md-5'}>
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="section-title">Order with driver</h1>
                                    <h5 className={'section-sub-title'}>Why you choose Order with Driver?</h5>
                                    <p className="section-description">
                                        Our driver will come to your address as per your laundry collection time, pick up all your clothes, and bring them to the nearest laundry. <br/>
                                        Our expert and washerman will do all processing properly within your selected time and deliver your cleaned items to your doorstep in your <br/>
                                        schedule. We are always ready to take on any challenge for our valuable customers.
                                    </p>
                                    <p className={'section-sub-title'}>Your satisfaction is our happiness.</p>
                                </div>
                            </div>
                            <div className="row my-4"></div>
                            <div className="row my-4">
                                <div className="col-8 ms-auto me-auto progress-wrapper">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} ></div>
                                    </div>
                                    <div className={'steppers d-flex justify-content-between'}>
                                        <div className={`step ${steps>=0?'active':''}`}>1</div>
                                        <div className={`step ${steps>=1?'active':''}`}>2</div>
                                        <div className={`step ${steps>=2?'active':''}`}>3</div>
                                        <div className={`step ${steps>=3?'active':''}`}>4</div>
                                        <div className={`step ${steps>=4?'active':''}`}>5</div>
                                    </div>
                                </div>
                            </div>
                            {steps === 0? <DriverOrderAddress
                                postCode={postCode}
                                setPostCode={setPostCode}
                                streetAddress={streetAddress}
                                setStreetAddress={setStreetAddress}
                            /> : null}
                            {steps === 1? <DriverOrderServices
                                items={items}
                                setItems={setItemFromParent}
                            /> : null}
                            {steps === 2? <DriverOrderCollection
                                cdData={cdData}
                                setCdData={setCdData}
                            /> : null}
                            {steps === 3? <DriverOrderBilling
                                billing={billing}
                                setBilling={setBilling}
                                postCode={postCode}
                                streetAddress={streetAddress}
                            /> : null}
                            {steps === 4? <Payment secret={stripeSecret} orderWithDriver={true} orderInfo={orderData}/> : null}

                            <div className="row  ">
                                <div className="col-md-8 me-auto ms-auto stepper-btns ">
                                    {steps !== 4 ? <button className={'btn btn-back btn-secondary text-uppercase'} onClick={previousStep}>Back</button> :null }
                                    {steps <3?
                                        <button
                                            className={'btn btn-primary btn-next text-uppercase'}
                                            onClick={nextStep}
                                        >Next</button> :
                                        steps === 3? <button
                                            className={'btn btn-primary btn-next text-uppercase'}
                                            onClick={orderWithDriverSubmit}
                                        >Payment</button>: null}
                                </div>
                            </div>
                        </section>
                    </div>
                }

            </main>
        </>
    )
}
