import Navbar from "@/components/Navbar";
import OrderTable from "@/components/OrderTable";
import PageLoader from "@/components/PageLoader";
import TransactionList from "@/components/dashboard/TransactionList";
import Clients from "@/components/freelancer/Clients";
import FOrders from "@/components/freelancer/FOrders";
import Summary from "@/components/freelancer/Summary";
import GiftCardList from "@/components/giftCard/GiftCardList";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";
import Icon from "react-icons-kit";
import { copy, envelope, facebook, indent, linkedin, twitter, whatsapp } from "react-icons-kit/fa";
import { toast } from "react-toastify";

export default function OrderComplete() {
    const [data, setData] = React.useState();
    const [activeComponent, setActiveComponent] = React.useState('dashboard');
    const [freelancerData, setFreelancerData] = React.useState();
    const [userInfo, setUserInfo] = React.useState({
        name: '',
        phone: '',
        location: '',
        postcode: '',
        referralCode: ''
    });
    const [passwords, setPasswords] = React.useState({
        currentPassword: '',
        password: '',
        password_confirmation: ''
    });
    const [passwordsError, setPasswordsError] = React.useState({
        currentPassword: false,
        password_confirmation: false
    });
    const router = useRouter();
    const fetchData = React.useCallback(async () => {
        const userInfo = localStorage.getItem('userInfo');
        const accessToken = localStorage.getItem('accessToken');
        const auth = authCheck(accessToken);
        if(!auth || !userInfo){
            router.push('/sign-in');
        }
        const response = await REQUEST.PageData.dashboard();
        const status = response?.response?.status
        if(status === 401){
            toast(`${response.response.data.message}. (${response.response.data.errors.message})`,
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'error',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
            //Remove userInfo, access token and refresh token from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            //Send to sign in page
            router.push('/sign-in');
        }
        if(response.success){
            setData(response.data);
            setUserInfo({...response.data.user});
        }
    }, [setData]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateUserInfo = async () => {
        const response = await REQUEST.PageData.updateUser(userInfo);
        if(response.success){
            toast(`User information updated successfully.`,
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'success',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        } else {
            toast(`User information did not updated.`,
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'error',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        }
    }

    const changePassword = async () => {
        if(passwords.currentPassword){
            if(passwords.password !== passwords.password_confirmation){
                setPasswordsError({...passwordsError, password_confirmation: true});
                return;
            }
            const responses = await REQUEST.PageData.changePassword(passwords);
            if(responses.success){
                toast(`Password updated successfully.`,
                    {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'success',
                        position: 'top-right',
                        theme: 'dark'
                    }
                )
            } else {
                if(responses.success === false){
                    toast(responses.message, {
                            hideProgressBar: true,
                            autoClose: 2000,
                            type: 'error',
                            position: 'top-right',
                            theme: 'dark'
                        }
                    );
                    return;
                }
                for (let i=0; i<responses?.response?.data?.errors?.password.length; i++){
                    toast(responses.response.data.errors.password[i], {
                            hideProgressBar: true,
                            autoClose: 2000,
                            type: 'error',
                            position: 'top-right',
                            theme: 'dark'
                        }
                    )
                }
            }
        } else {
            setPasswordsError({...passwordsError, currentPassword: true});
            return;
        }
    }
    const copyToClipBoard = async () => {
        navigator.clipboard.writeText(`https://www.nearestlaundry.com?ref=${userInfo.referralCode}`);
        toast(`Referral Link copied`,
            {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
                position: 'top-right',
                theme: 'dark'
            }
        )
    }
    const generateReferral = async () => {
        const responses = await REQUEST.PageData.generateReferralCode();
        setUserInfo({...userInfo, referralCode: responses.data.referralCode});
    }
    const link = `https://www.nearestlaundry.com?ref=${userInfo.referralCode}`;
    return (<>
        <Head>
            <title>Dashboard | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
            <link rel="canonical" href={'https://www.nearestlaundry.com/dashboard'}/>
        </Head>
        <main>
            <Navbar/>
            {data? <section className="dashboard mt-2">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12 d-block d-md-none text-end">
                            <button className="btn btn-outline-light text-dark border" data-bs-toggle="collapse" data-bs-target="#toggle-dash-menu"><Icon
                                className="align-text-bottom me-2"
                                size={18}
                                icon={indent}
                            />
                            </button>
                        </div>

                        <div className="col-md-3 collapse mt-3  " id="toggle-dash-menu">
                            <ul className="list-group ">
                                <li
                                    className={`list-group-item ${activeComponent==='dashboard'?'active':''}`}
                                    onClick={()=>{setActiveComponent('dashboard')}}
                                >Dashboard</li>
                                <li
                                    className={`list-group-item ${activeComponent==='order-history'?'active':''}`}
                                    onClick={()=>{setActiveComponent('order-history')}}
                                >Order History</li>
                                <li
                                    className={`list-group-item ${activeComponent==='referral'?'active':''}`}
                                    onClick={()=>{setActiveComponent('referral')}}
                                >Referral Code</li>
                                <li
                                    className={`list-group-item ${activeComponent==='gift-card'?'active':''}`}
                                    onClick={()=>{setActiveComponent('gift-card')}}
                                >Gift Card</li>
                                <li
                                    className={`list-group-item ${activeComponent==='profile'?'active':''}`}
                                    onClick={()=>{setActiveComponent('profile')}}
                                >Profile</li>
                                {activeComponent==='profile' || activeComponent==='password'?<li
                                    className={`list-group-item ${activeComponent==='password'?'active':''}`}
                                    onClick={()=>{setActiveComponent('password')}}
                                >Password</li>:null}

                                {userInfo.role === 'Freelancer'? <li
                                    className={`list-group-item ${activeComponent==='profile'?'active':''}`}
                                    onClick={()=>{setActiveComponent('freelancer')}}
                                >Freelancer</li>: null}
                            </ul>
                        </div>


                        <div className="col-md-3 d-none d-md-block" >
                            <ul className="list-group ">
                                <li
                                    className={`list-group-item ${activeComponent==='dashboard'?'active':''}`}
                                    onClick={()=>{setActiveComponent('dashboard')}}
                                >Dashboard</li>
                                <li
                                    className={`list-group-item ${activeComponent==='order-history'?'active':''}`}
                                    onClick={()=>{setActiveComponent('order-history')}}
                                >Order History</li>
                                <li
                                    className={`list-group-item ${activeComponent==='referral'?'active':''}`}
                                    onClick={()=>{setActiveComponent('referral')}}
                                >Referral Code</li>
                                <li
                                    className={`list-group-item ${activeComponent==='gift-card'?'active':''}`}
                                    onClick={()=>{setActiveComponent('gift-card')}}
                                >Gift Card</li>
                                <li
                                    className={`list-group-item ${activeComponent==='profile'?'active':''}`}
                                    onClick={()=>{setActiveComponent('profile')}}
                                >Profile</li>
                                {activeComponent==='profile' || activeComponent==='password'?<li
                                    className={`list-group-item ${activeComponent==='password'?'active':''}`}
                                    onClick={()=>{setActiveComponent('password')}}
                                >Password</li>:null}
                                {userInfo.role === 'Freelancer'? <li
                                    className={`list-group-item ${activeComponent==='freelancer'?'active':''}`}
                                    onClick={()=>{setActiveComponent('freelancer')}}
                                >Freelancer</li>: null}

                                <li
                                    className={`list-group-item ${activeComponent==='transactions'?'active':''}`}
                                    onClick={()=>{setActiveComponent('transactions')}}
                                >Transactions</li>
                            </ul>
                        </div>


                        <div className="col-md-9">
                            <div className="row mb-3 mt-3 mt-md-0 ">
                                <div className="col-3">
                                    <div className=" box bg-blue">
                                        <p className={'box-title'}>Total Order</p>
                                        <p className={'box-amount'}>{data.totalOrder}</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className=" box bg-yellow">
                                        <p className={'box-title'}>Successful Referral</p>
                                        <p className={'box-amount'}>{data.referralOrder}</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className=" box bg-green">
                                        <p className={'box-title'}>Order Amount</p>
                                        <p className={'box-amount'}>£ {data.orderAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div className=" box bg-info">
                                        <p className={'box-title'}>Balance</p>
                                        <p className={'box-amount'}>£ {data.userWallet.availableBalance.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            {activeComponent === 'dashboard'?
                                <div >
                                    <ul className="nav nav-tabs flex-row" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active " id="home-tab" data-bs-toggle="tab"
                                                    data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                    aria-selected="true">Recent Orders
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link " id="profile-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile" type="button" role="tab"
                                                    aria-controls="profile" aria-selected="false">Recent Orders with Driver
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                             aria-labelledby="home-tab">
                                            <h3 className={'section-title my-4 text-start'}>
                                                Recent Orders
                                            </h3>
                                            <OrderTable data={data.orders?data.orders.slice(0,10):[]} />
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel"
                                             aria-labelledby="profile-tab">
                                            <h3 className={'section-title my-4 text-start'}>
                                                Recent Orders with Driver
                                            </h3>
                                            <OrderTable data={data.driverOrders?data.driverOrders.slice(0,10):[]} />
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                            {activeComponent === 'order-history'?
                                <div>
                                    <div>
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                        aria-selected="true">Order History
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                        data-bs-target="#profile" type="button" role="tab"
                                                        aria-controls="profile" aria-selected="false">Order with Driver History
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel"
                                                 aria-labelledby="home-tab">
                                                <h3 className={'section-title my-4 text-start'}>
                                                    Order History
                                                </h3>
                                                <OrderTable data={data.orders} />
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel"
                                                 aria-labelledby="profile-tab">
                                                <h3 className={'section-title my-4 text-start'}>
                                                    Order with Driver History
                                                </h3>
                                                <OrderTable data={data.driverOrders} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                            {activeComponent === 'referral'?
                                <div>
                                    <h3 className={'section-title my-4 text-start'}>
                                        Referral Code
                                    </h3>
                                    {
                                        userInfo.referralCode ? <div>
                                            <h4>Share Link.</h4>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    readOnly={true}
                                                    value={link}
                                                />
                                                <div className="input-group-append" onClick={copyToClipBoard}>
                                                <span className="input-group-text" id="basic-addon2">
                                                    <Icon
                                                        icon={copy}
                                                        size={22}
                                                        className="icon"
                                                        style={{cursor: 'pointer'}}
                                                    />
                                                </span>
                                                </div>
                                            </div>
                                            <h5 className={'text-center mt-5 mb-4'}>Or,</h5>
                                            <div className="footer-newsletter text-center">
                                                <a
                                                    href={'whatsapp://send?text=To get discount from nearest laundry please visit this link ' + link}
                                                    title="Whatsapp"
                                                    className={"btn btn-social text-black"}
                                                >
                                                    <Icon
                                                        icon={whatsapp}
                                                        size={22}
                                                        className="icon"
                                                    />
                                                </a>
                                                <a
                                                    href={'https://www.facebook.com/sharer/sharer.php?u=' + link}
                                                    title="Facebook"
                                                    className={"btn btn-social"}
                                                >
                                                    <Icon
                                                        icon={facebook}
                                                        size={22}
                                                        className="icon"
                                                    />
                                                </a>
                                                <a
                                                    href={'https://twitter.com/share?url='+link+'&text=To get discount from nearest laundry please visit this link '+link+'&via=NearestLaundry'}
                                                    title="Twitter"
                                                    className={"btn btn-social"}
                                                >
                                                    <Icon
                                                        icon={twitter}
                                                        size={22}
                                                        className="icon"
                                                    />
                                                </a>
                                                <a
                                                    href={'https://www.linkedin.com/shareArticle?url='+link+'&title=To get discount from nearest laundry please visit this link '+link+'&summary=Discount on nearest laundry&source='+link}
                                                    title="Linkedin"
                                                    className={"btn btn-social"}
                                                >
                                                    <Icon
                                                        icon={linkedin}
                                                        size={22}
                                                        className="icon"
                                                    />
                                                </a>
                                                {/*<a*/}
                                                {/*    href={'https://www.instagram.com/?url='+link}*/}
                                                {/*    title="Instagram"*/}
                                                {/*    className={"btn btn-social"}*/}
                                                {/*>*/}
                                                {/*    <Icon*/}
                                                {/*        icon={instagram}*/}
                                                {/*        size={22}*/}
                                                {/*        className="icon"*/}
                                                {/*    />*/}
                                                {/*</a>*/}
                                                {/*<a*/}
                                                {/*    href='https://reddit.com/submit?url=<URL>&title=<TITLE>'*/}
                                                {/*    title="Reddit"*/}
                                                {/*    className={"btn btn-social"}*/}
                                                {/*>*/}
                                                {/*    <Icon*/}
                                                {/*        icon={reddit}*/}
                                                {/*        size={22}*/}
                                                {/*        className="icon"*/}
                                                {/*    />*/}
                                                {/*</a>*/}
                                                {/*<a*/}
                                                {/*    href='https://news.ycombinator.com/submitlink?u=<URL>&t=<TITLE>'*/}
                                                {/*    title="Reddit"*/}
                                                {/*    className={"btn btn-social"}*/}
                                                {/*>*/}
                                                {/*    <Icon*/}
                                                {/*        icon={hackerNews}*/}
                                                {/*        size={22}*/}
                                                {/*        className="icon"*/}
                                                {/*    />*/}
                                                {/*</a>*/}
                                                <a
                                                    href={'mailto:?subject=You got referral on nearest laundry.&body=Please follow the link to get discount on your next order. '+link}
                                                    title="Reddit"
                                                    className={"btn btn-social"}
                                                >
                                                    <Icon
                                                        icon={envelope}
                                                        size={22}
                                                        className="icon"
                                                    />
                                                </a>
                                            </div>
                                        </div> :
                                        <div>
                                            <button
                                            className={'btn btn-primary'}
                                            onClick={generateReferral}
                                            >Generate Referral Code</button>
                                        </div>
                                    }


                                </div>
                                : null
                            }
                            {activeComponent === 'gift-card'?
                                <div>
                                    <h3 className={'section-title my-4 text-start'}>
                                        Gift Card
                                    </h3>
                                    {data?.giftCards ? <div>
                                        <a href="/gift-cards" className={'btn btn-primary mb-4'}>Send Gift Card</a>
                                        <GiftCardList data={data.giftCards} />
                                    </div>: <h3>There is no gift card available.</h3>}

                                </div>
                                : null
                            }
                            {activeComponent === 'profile'?
                                <div>
                                    <h3 className={'section-title my-4 text-start'}>
                                        Profile
                                    </h3>
                                    <div className={'row'}>
                                        <div className="col-12 col-md-6">
                                            <div className="mb-3 ">
                                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fullName"
                                                    placeholder={'Adam Sandler'}
                                                    value={userInfo.name}
                                                    onChange={(e) => {
                                                        setUserInfo({...userInfo,name: e.target.value})
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="mb-3 ">
                                                <label htmlFor="inputPhone"
                                                       className="form-label">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputPhone"
                                                    placeholder={'+000 000 000'}
                                                    value={userInfo.phone}
                                                    onChange={(e) => {
                                                        setUserInfo({...userInfo,phone: e.target.value})
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="mb-3 ">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email
                                                    address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder={'adam@sandler.uk'}
                                                    value={userInfo.email}
                                                    disabled={true}
                                                />
                                                <div id="emailHelp" className="form-text">We'll never share your
                                                    email with anyone else.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="mb-3 ">
                                                <label htmlFor="location"
                                                       className="form-label">Location</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    placeholder={'12 Abc, East London, ......'}
                                                    value={userInfo.location}
                                                    onChange={(e) => {
                                                        setUserInfo({...userInfo,location: e.target.value})
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="mb-3 ">
                                                <label htmlFor="postCode" className="form-label">Post Code</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="postCode"
                                                    placeholder={12123}
                                                    value={userInfo.postcode}
                                                    onChange={(e) => {
                                                        setUserInfo({...userInfo,postcode: e.target.value})
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className={'text-end'}>
                                                <button type="button" onClick={updateUserInfo} className="btn btn-primary">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                            {activeComponent === 'password'?
                                <div>
                                    <h3 className={'section-title my-4 text-start'}>
                                        Password Change
                                    </h3>
                                    <div className={'row'}>
                                        <div className="mb-3">
                                            <label htmlFor="current_password" className="form-label">Current Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="current_password"
                                                onChange={(e) => {
                                                    setPasswords({...passwords, currentPassword: e.target.value})
                                                }}
                                            />
                                            {passwordsError.currentPassword?<div className="form-text">
                                                Current password required.
                                            </div> : null}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="new_password" className="form-label">New Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="new_password"
                                                onChange={(e) => {
                                                    setPasswords({...passwords, password: e.target.value})
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirm_password"
                                                onChange={(e) => {
                                                    setPasswords({...passwords, password_confirmation: e.target.value})
                                                }}
                                            />
                                            {passwordsError.password_confirmation?<div className="form-text">
                                                Password did not match
                                            </div> : null}
                                        </div>
                                        <div className={'text-end'}>
                                            <button type="button" className="btn btn-primary" onClick={changePassword}>Update</button>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                            {activeComponent === 'freelancer'?
                                <div >
                                    <ul className="nav nav-tabs flex-row" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active " id="home-tab" data-bs-toggle="tab"
                                                    data-bs-target="#summary" type="button" role="tab" aria-controls="summary"
                                                    aria-selected="true">Summary
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link " id="client-tab" data-bs-toggle="tab"
                                                    data-bs-target="#clients" type="button" role="tab"
                                                    aria-controls="clients" aria-selected="false">Clients
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link " id="forder-tab" data-bs-toggle="tab"
                                                    data-bs-target="#forder" type="button" role="tab"
                                                    aria-controls="forder" aria-selected="false">Orders
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="summary" role="tabpanel"
                                             aria-labelledby="summary">
                                            <h3 className={'section-title my-4 text-start'}>
                                                Summary
                                            </h3>
                                            <Summary />
                                        </div>
                                        <div className="tab-pane fade" id="clients" role="tabpanel"
                                             aria-labelledby="clients">
                                            <h3 className={'section-title my-4 text-start'}>
                                                Clients
                                            </h3>
                                            <Clients data={data?.freelancerClient}/>
                                        </div>
                                        <div className="tab-pane fade" id="forder" role="tabpanel"
                                             aria-labelledby="forder">
                                            <h3 className={'section-title my-4 text-start'}>
                                                Orders
                                            </h3>
                                            <FOrders data={data?.freelancerOrders} />
                                        </div>
                                    </div>
                                </div>
                                : null
                            }


                            {activeComponent === 'transactions'?
                                <div>
                                    <h3 className={'section-title my-4 text-start'}>
                                        Transactions
                                    </h3>
                                    {(data?.userWallet && data?.userWallet?.history.length > 0) ? <div>
                                        <TransactionList data={data?.userWallet?.history} />
                                    </div>: <h3>There are no transactions available.</h3>}

                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </section>:
            <PageLoader/>}

            
        </main>
    </>)
}

// adjustmentNote
// unknown charge
//
// String
// freelancerID
// 64905da552b7d0435a82aa83
//
// String
// customID
// NL130HW123564
