import Navbar from "@/components/Navbar";
import { CartContext } from "@/store/contexts/CartContext";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import Head from 'next/head';
import Image from "next/image";
import * as React from "react";
import { useContext } from "react";
import Icon from "react-icons-kit";
import { trashO } from "react-icons-kit/fa";
import { infoCircle } from 'react-icons-kit/fa/infoCircle';
import { toast } from "react-toastify";
import deleteIcon from '../../components/assets/img/delete.png';

export default function Cart() {

    const { dispatch } = useContext(CartContext);

    const [data, setData] = React.useState([]);
    const [totalProductPrice, setTotalProductPrice] = React.useState(0);
    const [totalDiscount, setTotalDiscount] = React.useState(0);
    const [totalDiscountedProductPrice, setTotalDiscountedProductPrice] = React.useState(0);
    const [minimumOrderValue, setMinimumOrderValue] = React.useState(0);
    const [serviceArea, setServiceArea] = React.useState(null);
    const [serviceAreaChecked, setServiceAreaChecked] = React.useState(false);
    const [checking, setChecking] = React.useState(false);
    const [coupon, setCoupon] = React.useState('');
    const [stripeSecret, setStripeSecret] = React.useState('');
    const [serviceAreaCheckedMessage, setServiceAreaCheckedMessage] = React.useState('Please check service area before proceeding.');
    const [address, setAddress] = React.useState();
    const [userAddress, setUserAddress] = React.useState('');
    const [checkedCoupon, setCheckCoupon] = React.useState(false);
    const [applyCouponState, setApplyCouponState] = React.useState(false);
    const [checkedCouponData, setCheckedCouponData] = React.useState({
        applied: false,
        reason: 'Checking...',
        discount: 0
    });

    

    const [userInfo, setUserInfo] = React.useState({});
    

    React.useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            if (authCheck(accessToken)) {
                const userData = JSON.parse(localStorage.getItem("userInfo"));
                setUserInfo(userData);
                setServiceArea( (userData && userData.previousOrderPostCode ? userData.previousOrderPostCode : '' ));
            }
        }
    }, []);

    const offeredPriceCalculator = (product) => {
        let op = parseFloat(product.price);
        if(product.offerAmount > 0){
            if(product.offerType === 'percentage') {
                op = op - ((product.offerAmount/100) * op);
            } else {
                op = op - product.offerAmount;
            }
        }
        return parseFloat(op.toFixed(2));
    }
    const deleteCartItem = (index) => {
        let newData = data.filter((item, i) => {
            return i !== index;
        });
        
        let selectedData = data[index];

        // reset coupon price
        resetCouponPrice();
        
        dispatch({ type: "REMOVE_FROM_CART", product: {...selectedData  } });
        

        setData(newData);
        updateTotalSection(newData);
        toast('You have successfully deleted product from cart. ',
            {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'info',
                position: 'top-right',
                theme: 'dark'
            }
        )
    }
    const updateTotalSection = (response) => {
        let totalPrice = 0;
        let tdpp = 0;
        response.map((item, index)=>{
            totalPrice = totalPrice + (item.product.price * item.quantity);
            tdpp = tdpp + (offeredPriceCalculator(item.product) * item.quantity);
        });
        setTotalProductPrice(totalPrice);
        setTotalDiscount(totalPrice - tdpp);
        setTotalDiscountedProductPrice(tdpp < 20? 20: tdpp);
        setMinimumOrderValue(tdpp < 20? 20 - tdpp: 0);
    }
    const updateCart = (event, index) => {


        const newQuantity = parseInt(event.target.value ? event.target.value : 1);

        let newData = data;
        let selectedData = newData[index];

        let newPrice = parseFloat((offeredPriceCalculator(newData[index].product) * newQuantity).toFixed(2));

        newData[index].quantity = newQuantity;
        newData[index].price = newPrice;
        setData(newData)


        updateTotalSection(newData);

        if(newQuantity > 0){
            // reset coupon price
            resetCouponPrice();
            dispatch({ type: "UPDATE_QTY", product: {...selectedData, quantity: newQuantity, price: newPrice  } });
            
        }

        toast('You have successfully updated product cart. ',
            {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'info',
                position: 'top-right',
                theme: 'dark'
            }
        )
    }
    const checkAddress = async () => {
        setChecking(true);
        if(serviceArea){
            const response = await REQUEST.PageData.checkServiceArea(serviceArea);
            if(response.success === true){
                setServiceAreaChecked(true);
                setServiceAreaCheckedMessage('We provide service in your area. Please proceed to pay.');
                toast('We provide service in your area. Please proceed to pay.',
                    {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'info',
                        position: 'top-right',
                        theme: 'dark'
                    }
                )
                setAddress(response.data.addresses.addresses.map(item => ({ value: item, label: item })));
                localStorage.setItem('addresses', JSON.stringify(response.data));
            } else {
                setServiceAreaChecked(false);
                setServiceAreaCheckedMessage('We do not provide service in your area. Please try another area.');
                toast('We do not provide service in your area. Please try another area.',
                    {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'warning',
                        position: 'top-right',
                        theme: 'dark'
                    }
                )
                localStorage.removeItem('addresses');
            }
        } else {
            localStorage.removeItem('addresses');
            toast('Please enter your zipcode before checking. ',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        }
        setChecking(false);
    }
    const fetchData = React.useCallback(async () => {
        const response = JSON.parse(localStorage.getItem('cart'));
        localStorage.removeItem('couponCode');
        if(!serviceAreaChecked){
            localStorage.removeItem('addresses');
        }
        setData(response);
        if(response?.length){
            updateTotalSection(response);
        }
    }, [setData]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    const applyCoupon = async () => {
        if (coupon.length > 2){
            setCheckCoupon(true);
            const response = await REQUEST.PageData.applyCoupon(coupon);
            if(response.success){

                console.log(response.data);


                
                setCheckedCouponData(response.data);
                if(response.data.discount){
                    const cdp = parseFloat(response.data.discount);
                    setTotalDiscount(totalDiscount+cdp);
                    const tdpp = totalProductPrice - (totalDiscount+cdp);
                    setMinimumOrderValue(tdpp < 20? 20 - tdpp: 0);
                    setTotalDiscountedProductPrice(tdpp < 20? 20: tdpp);
                    localStorage.setItem('couponCode',coupon);
                }
            }
        } else {
            toast('Please enter coupon code before applying. Thanks!!',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        }
    }
    const removeCoupon =  async () => {

        setCheckedCouponData({
            applied: false,
            reason: 'Checking...',
            discount: 0
        });
        
        setCoupon('');
        setCheckCoupon(false);
        fetchData();
    }

    const resetCouponPrice = () =>{
        setCheckedCouponData({
            applied: false,
            reason: 'Checking...',
            discount: 0
        });
        
        setCoupon('');
        setCheckCoupon(false);
    }
    return (<>
        <Head>
            <title>Add our Services and  Easy Item management at Nearest Laundry Cart</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Nearest Laundry is the best option for your laundry solution in London, United Kingdom. 
                Free pickup and delivery 24/7, days within time. Don’t miss this for your clothes solution. Get more cleaned and washed clothes from Nearest Laundry."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/cart'}/>
        </Head>
        <main>
            <Navbar/>
            <section className={'container'}>
                <div className="row mt-3">
                    <div className="col-12">
                        <h3 className="section-title">Product Cart</h3>
                        <h5 className={'section-sub-title'}>Why you should order with Us?</h5>
                        <h5 className="section-description">
                            Nearest Laundry serve all kinds of Laundry services. Some times our happy customer don't find their exprected services. <br/>
                            In this case, normally we contact & serve direct services. Just follow the step of <a
                            style={{textDecoration:'none'}}
                            href="/order-with-driver">Order with driver</a>.
                        </h5>
                        <h5 className={'section-sub-title'}>Your satisfaction is our happiness.</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h1 className={'cart-title'}>Shopping Cart</h1>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price Per Unit</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th></th>
                            </tr>
                            </thead>
                            {data?.length > 0 ?
                                <tbody>
                                {data.map((item, index) => <tr key={item.pid}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.product.name}</td>
                                    <td>{offeredPriceCalculator(item.product)}</td>
                                    <td>
                                        <input
                                            value={item.quantity}
                                            onChange={(event)=>{updateCart(event, index)}}
                                            type="number"
                                            min={1}
                                            style={{width: '60px'}}/>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Icon  icon={trashO} className="cursor-pointer" size={22} onClick={() => {deleteCartItem(index)}}/>
                                        {/* <Image src={deleteIcon} alt={'Delete'} onClick={() => {deleteCartItem(index)}}/> */}
                                    </td>
                                </tr>)}
                                </tbody> :
                                <tbody>
                                <tr>
                                    <th scope="row" colSpan={5}>No Data found on cart. Please add item to cart before proceeding.</th>
                                </tr>
                                </tbody>
                            }
                        </table>
                        <a href="/" className={'btn btn-primary'}>Continue Shopping</a>
                    </div>
                    <div className="col-md-4">
                        <h1 className={'cart-title'}>Cart Total</h1>
                        <table className="table" style={{marginBottom: '0'}}>
                            <thead>
                            <tr>
                                <th scope="col">Product Total</th>
                                <th scope="col">£ {totalProductPrice.toFixed(2)}</th>
                            </tr>
                            <tr>
                                <th scope="col">Discount (-)</th>
                                <th scope="col">£ {totalDiscount.toFixed(2)} </th>
                            </tr>

                            {checkedCouponData && checkedCouponData.applied && checkedCouponData.discount > 0 && 
                                <tr>
                                    <th scope="col">Coupon Discount (-)</th>
                                    <th scope="col">£ {parseFloat(checkedCouponData.discount).toFixed(2)} </th>
                                </tr>
                            }

                            
                            <tr>
                                <th scope="col">Tax (+)</th>
                                <th scope="col">£ 0.00</th>
                            </tr>
                            <tr>
                                <th scope="col">Sub Total</th>
                                <th scope="col">£ {(totalProductPrice - totalDiscount).toFixed(2)}</th>
                            </tr>
                            <tr>
                                <th scope="col">Minimum Order value (+)</th>
                                <th scope="col">£ {minimumOrderValue.toFixed(2)}</th>
                            </tr>
                            <tr>
                                <th scope="col">Total <span style={{color: 'var(--color-primary)'}}>(Estimated)</span></th>
                                <th scope="col">£ {totalDiscountedProductPrice.toFixed(2)}</th>
                            </tr>
                            </thead>

                        </table>
                        <div style={{marginBottom: '10px', marginTop: '5px'}}>
                            <span style={{color: 'var(--color-danger)'}}>
                                Prices are estimated.
                                <b style={{color: 'green'}}> Buy now pay later. </b>
                                 <a href="/terms-and-conditions">
                                     <Icon icon={infoCircle} size={20} style={{color: 'green'}} />
                                 </a>
                            </span>
                            <br/>
                            <span><b style={{color: 'green'}}> Our minimum order is £ 20. </b></span>
                            <span><b style={{color: 'green'}}> If you were referred then the discount will be applied with amount over £ 20 later automatically. </b></span>
                        </div>
                        <div className="coupon mb-4">
                            {!checkedCoupon? (applyCouponState?<div className="d-flex justify-content-evenly">
                                <input
                                    onChange={(event) => setCoupon(event.target.value)}
                                    type="text"
                                    className={'form-control coupon-input'}
                                    placeholder={'Please enter coupon code here.'}
                                />
                                <button className={'btn btn-coupon-apply'} onClick={applyCoupon}>Apply</button>
                            </div>:  <div className="d-flex justify-content-between align-items-center">
                                <button className={'btn'} onClick={() => {setApplyCouponState(true)}}>Have any coupon? <span style={{color: 'var(--color-primary-1)'}}>Apply here</span></button>
                            </div>  ) : <div className="d-flex justify-content-between align-items-center">
                                <label className={`mb-2 ${!checkedCouponData.applied?'text-danger':''}`}>{checkedCouponData.reason}</label>
                                <button className={'btn'} onClick={removeCoupon}>
                                    <Image src={deleteIcon} alt={'Delete'} style={{height: '20px', width: 'auto'}} />
                                </button>
                            </div>}

                        </div>
                        <div className="coupon mb-4">
                            <label className={'mb-2'}>Before proceeding please check your address.</label>
                            <div className="d-flex justify-content-evenly">
                                <input
                                    type="text"
                                    className={'form-control coupon-input'}
                                    defaultValue={serviceArea}
                                    onChange={(event)=>setServiceArea(event.target.value)}
                                    placeholder={'Please enter your postcode here'}
                                />
                                <button className={'btn btn-coupon-apply'} onClick={checkAddress}>
                                    {checking?
                                        <div
                                            className="spinner-grow text-dark"
                                             role="status"
                                             style={{"--bs-spinner-width": "1.1rem","--bs-spinner-height":"1.1rem"}}
                                        >
                                        </div>
                                        :
                                        'Check'
                                    }
                                </button>
                            </div>
                        </div>
                        {serviceAreaChecked?
                            <a className={'btn btn-primary w-100'} href={'/checkout'}>Checkout</a>
                            :
                            <h5 style={{fontSize: '15px'}}>{serviceAreaCheckedMessage}</h5>
                        }
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
