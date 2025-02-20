import Navbar from "@/components/Navbar";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hasMailSend, setMailSend] = React.useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    

    // const [resetMail]

    const router = useRouter();


    React.useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            if(authCheck(accessToken)){
                router.push('/dashboard')
            }
        }
    }, []);

    useEffect(() => {
        if(timeLeft===0){
            setTimeLeft(null)
        }

        // exit early when we reach 0
        if (!timeLeft) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);


    const signIn = async () => {
        if(email === ''){
            toast('Email required for password reset. ',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-center',
                    theme: 'dark'
                }
            )
            return;
        }
        const response = await REQUEST.PageData.resetPasswordMail(email);


        let resError = ''
        if(response?.success){
            //Registration successful
            toast('We have send a reset password link to your mail.', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-right',
                    theme: 'dark'
                }
            )
            // router.push('/forget-password');
            setTimeLeft(30);
        }
        if(response?.response?.status === 500){
            resError = "Something is wrong. Please try again later.";
        }else if(response?.response?.status === 400){
            resError = response.response.data.errors.email[0];
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
    


    return (<>
        <Head>
            <title>Nearest Laundry Ironing Cleaning Service in London</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Forgot Your Password? Don't worry; it happens to the best of us. Please enter your email address below, and we'll send you a link to reset your password. If you're still having trouble, don't hesitate to reach out to our support team."/>
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/forget-password'}/>
        </Head>
        <main>
            <Navbar/>
            <section className={'container mt-3 mt-md-2'}>
                <div className="row">
                    <div className="col-12">

                        <h1 className="section-title">Reset Password</h1>
                        <h5 className={'section-sub-title'}>What is the process?</h5>
                        <h5 className="section-description">
                            We will send a password reset link to your mail if you are already Nearest Laundry user. To reset your password, follow the instructions.
                        </h5>
                        <h5 className={'section-sub-title'}>Your satisfaction is our happiness.</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 me-auto ms-auto">
                        <div className="form-group mb-2">
                            <label className="form-label">Email</label>
                            <input
                                disabled={(timeLeft && timeLeft > 0) ? true : false}
                                type="email"
                                className="form-control"
                                onChange={(event) => {setEmail(event.target.value)}}
                                placeholder={'Enter your email address.'}
                            />
                        </div>
                        
                        <div className="form-group text-center mt-3">

                            

                            {(timeLeft && timeLeft > 0) ? 
                                <>
                                <div className="alert alert-success py-1">
                                    <strong>Mail Sent!</strong> Please Check your mailbox.
                                    </div>

                                    <button className={'btn btn-primary'} disabled={true}>Resend <span>({timeLeft})</span></button>
                                </>
                                : 
                                <button className={'btn btn-primary'} onClick={signIn}>Submit</button>
                            }
                            
                        </div>
                        <div className="form-group mt-3">
                            Don't have an account?  <a href="/sign-up" style={{textDecoration: 'none'}}>Sign up now.</a> <br/>
                            Already have an account? <a href="/sign-in" style={{textDecoration: 'none'}}>Sign in now.</a>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
