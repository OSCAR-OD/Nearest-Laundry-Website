import Navbar from "@/components/Navbar";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

export default function SignUp() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const router = useRouter();
    const {token} = router.query;

    const onSubmit = async () => {
        let error = false;
        if (password !== passwordConfirmation) error = true;
        if(!email) error = true;
        if(!password) error = true;
        if(password.length < 8) error = true;
        if(error){
            toast("All information required and password must be same as confirm password and " +
                "equal or larger than 8 character length. Thanks.", {
                    hideProgressBar: true,
                    autoClose: false,
                    type: 'warning',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
        } else {
            const response = await REQUEST.PageData.resetPassword({token,email, password, password_confirmation:passwordConfirmation});
            let resError = ''
            if(response?.success){
                //Password reset successful
                toast('Password reset successful. Please sign in now.', {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'warning',
                        position: 'top-right',
                        theme: 'dark'
                    }
                )
                router.push('/sign-in');
            }
            if(response?.response?.status === 422){
                resError = response.response.data.errors.email;
            } else if(response?.response?.status === 500){
                resError = response.response.data.errors.errors.email.message;
            }else if(response?.response?.status === 400){
                resError = response.response.data.message;
            }
            else if(response?.success == false){
                resError = response.message;
            }
            if(resError){
                toast(resError, {
                        hideProgressBar: true,
                        autoClose: 2000,
                        type: 'warning',
                        position: 'top-right',
                        theme: 'dark'
                    }
                )
            }
            console.log(response);
        }
    }
    React.useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            if(authCheck(accessToken)){
                router.push('/dashboard')
            }
        }
    }, []);
    return (<>
        <Head>
            <title>Reset Password | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
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
            <link rel="canonical" href={`https://www.nearestlaundry.com/reset/${token}`}/>
        </Head>
        <main>
            <Navbar/>
            <section className={'container mt-3 mt-md-2'}>
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-title">Reset Password</h3>
             
                        <h5 className={'section-sub-title'}>Your satisfaction is our happiness.</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 me-auto ms-auto">
                        <div className="form-group mb-2">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder={'Enter your email address.'}/>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder={'Enter your password.'}/>
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e)=>setPasswordConfirmation(e.target.value)}
                                placeholder={'Enter your confirm password.'}/>
                        </div>
                        <div className="form-group text-center mt-3">
                            <button className={'btn btn-primary'} onClick={onSubmit}>Submit</button>
                        </div>
                        <div className="form-group mt-3">
                            Don't have an account?  <a href="/sign-up" style={{textDecoration: 'none'}}>Sign up now.</a> <br/>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
