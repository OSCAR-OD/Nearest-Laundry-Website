import Navbar from "@/components/Navbar";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();
    const signIn = async () => {
        if(email === '' || password === ''){
            toast('Email and password required for login. ',
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
        const response = await REQUEST.PageData.login(email, password);
        if(response.success === false){
            toast(response.message,
                {
                    hideProgressBar: true,
                    autoClose: 4000,
                    type: 'warning',
                    position: 'top-center',
                    theme: 'dark'
                }
            )
        } else {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            router.push('/dashboard');
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
            <title>Access Your Account and check your Dashboard.</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Nearest Laundry is the best-trusted place for laundry service in London. Nearest laundry offers laundry service, Ironing, Dry Cleaning, Wash & ironing, Shoe repair and wedding dress cleaning services."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/sign-in'}/>
        </Head>
        <main>
            <Navbar/>
            <section className={'container mt-3 mt-md-2'}>
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title">Sign in</h1>
                        <h5 className={'section-sub-title'}>Why you should sign in?</h5>
                        <h5 className="section-description">
                            Nearest Laundry serve all kinds of Laundry services. some times customer dont find there services.In <br/>
                            that case, we will contact & serve direct services.Just follow those steps & submit the Order.
                        </h5>
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
                                onChange={(event) => {setEmail(event.target.value)}}
                                placeholder={'Enter your email address.'}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(event) => {setPassword(event.target.value)}}
                                placeholder={'Enter your password.'}
                            />
                        </div>
                        <div className="form-group text-center mt-3">
                            <button className={'btn btn-primary'} onClick={signIn}>Sign In</button>
                        </div>
                        <div className="form-group mt-3">
                            Don't have an account?  <a href="/sign-up" style={{textDecoration: 'none'}}>Sign up now.</a> <br/>
                            Can't remember password now? <a href="/forget-password" style={{textDecoration: 'none'}}>Reset password</a>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
