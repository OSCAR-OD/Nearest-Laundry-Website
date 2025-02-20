import Navbar from "@/components/Navbar";
import Payment from "@/components/Payment";
import OrderAddress from "@/components/ProductOrderAddress";
import { AppContext } from "@/store/contexts/AppContext";
import { CartContext } from "@/store/contexts/CartContext";
import REQUEST from "@/utils/networks/Request";
import orderValidate from "@/utils/order-validate";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from 'react';
import { toast } from "react-toastify";

const Checkout = () => {

    const { dispatch } = React.useContext(CartContext);
    const router = useRouter();

    const {
        appData: { refer_code }
      } = React.useContext(AppContext);
    
    const [data, setData] = React.useState();
    const [progress, setProgress] = React.useState(0);
    const [steps, setSteps] = React.useState(0);
    const [postCode, setPostCode] = React.useState('');
    const [agreement, setAgreement] = React.useState(false);
    const [streetAddress, setStreetAddress] = React.useState('');
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
    const [orderData, setOrderData] = React.useState({oid: '', price: 20});
    const [stripeSecret, setStripeSecret] = React.useState('');
    const [addresses, setAddresses] = React.useState([]);

    const fetchData = React.useCallback(async () => {

        const cartInfo = localStorage.getItem('cart');
        if(cartInfo) setData(JSON.parse(cartInfo));
        let userInfo = localStorage.getItem('userInfo');
        let address = localStorage.getItem('addresses');

        if(address){
            address = JSON.parse(address);
            const formattedAddress = [];
            address.addresses.addresses.map(item => (formattedAddress.push({ value: item, label: item })));
            setAddresses(formattedAddress);
            setPostCode(address.postCode);
        }

        if(userInfo){
            userInfo = JSON.parse(userInfo);
            setBilling({
                email: userInfo.email,
                name: userInfo.name
            })
        }

    }, [setData]);

    React.useEffect(()=>{
        fetchData();
    },[fetchData]);

    const goToPayment = async () => {
        if(!agreement){
            toast('You need to agree on our terms and conditions.',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
            return;
        }
        
        //Introduce form validation here

        const cart = localStorage.getItem('cart');
        if (!cart){
            toast('Nothing to order. Please add item to cart.', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
                position: 'top-right',
                theme: 'dark'
            });
            return;
        }
        const orderData = {
            postCode,
            streetAddress,
            ...cdData,
            ...billing,
            cart: JSON.parse(cart),
            couponCode: localStorage.getItem('couponCode')??'',
            referCode: refer_code ?? (localStorage.getItem('ref') ?? null),
        };
        const validation = orderValidate(orderData);
        if(validation.hasError){
            toast(validation.errorMessage, {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-right',
                    theme: 'dark'
                });
            return;
        }
        const response =  await REQUEST.PageData.order(orderData);
        if(response.success){

            setStripeSecret(response.data.paymentIntent);
            setOrderData({oid: response.data.order._id, price: response.data.price});
            const url = `/payment/${response.data.order._id}/${response.data.paymentIntent}`;
            router.push(url);
            // Don't remove below line
            // window.open(url,'_blank', "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=1000,height=700");
            // setSteps(1);
            // setProgress(100);
            return;
        } else {
            console.log(response);
        }
    }
    return (<>
        <Head>
            <title>Checkout | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
            <link rel="canonical" href={'https://www.nearestlaundry.com/checkout'}/>

        </Head>
        <main>
            <Navbar/>
            <section className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-title">Product Checkout</h3>
                        <h5 className={'section-sub-title'}>You are on very last stage of checkout!! <br/> Just provide some information and hit submit.</h5>
                        <h5 className="section-description">
                            Nearest Laundry serve all kinds of Laundry services. Some times our happy customer don't find their exprected services. <br/>
                            In this case, normally we contact & serve direct services. Just follow the step of <a
                            style={{textDecoration:'none'}}
                            href="/order-with-driver">Order with driver</a>.
                        </h5>
                        <h5 className={'section-sub-title'}>Your satisfaction is our happiness.</h5>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-8 ms-auto me-auto progress-wrapper">
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} ></div>
                        </div>
                        <div className={'steppers d-flex justify-content-between'}>
                            <div className={`step ${steps>=0?'active':''}`}>1</div>
                            <div className={`step ${steps>=1?'active':''}`}>2</div>
                        </div>
                    </div>
                </div>
                {steps === 0? <OrderAddress
                    postCode={postCode}
                    setPostCode={setPostCode}
                    streetAddress={streetAddress}
                    setStreetAddress={setStreetAddress}
                    allAddresses={addresses}
                    cdData={cdData}
                    setCdData={setCdData}
                    billing={billing}
                    setBilling={setBilling}
                /> : null}

                {steps === 1? <Payment secret={stripeSecret} orderInfo={orderData}/>: null}

                {steps === 0?
                    <div className={'text-center mt-5'}>
                        <label className={'form-label mb-3'}>
                            <input type="checkbox" className={'form-check-inline'} onChange={()=>{
                                if (agreement) setAgreement(false);
                                else setAgreement(true);
                            }
                            }/>
                            By Clicking this, I accept all
                            <a href="/terms-and-conditions" style={{textDecoration: 'none'}}> terms and conditions </a>
                             of nearest laundry.
                        </label> <br/>
                        <button className={'btn btn-primary'} onClick={goToPayment}>Proceed to Payment</button>
                    </div>
                    : null}
            </section>
        </main>
    </>);
}

export default Checkout;