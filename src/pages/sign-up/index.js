import Navbar from "@/components/Navbar";
import { AppContext } from "@/store/contexts/AppContext";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

export default function SignUp() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const {
        appData: { refer_code }, dispatch
      } = React.useContext(AppContext);
    
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const signUo = async () => {
        let error = false;
        if (password !== passwordConfirmation) error = true;
        if(!name) error = true;
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

            const response = await REQUEST.PageData.register({name,email, password, referCode: refer_code});
            let resError = ''
            if(response?.success){

                // clear refer code
                dispatch({ type: "REMOVE_REFER_CODE", refer_code: null });
                
                //Registration successful
                toast('Signup successful. Please sign in now.', {
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
            <title>Create Your Account and get quality laundry services.</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Nearest Laundry always provides quality service in London. We offer same-day laundry and mobile laundry service in London. Sign up for laundry service. Stay with the nearest laundry."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/sign-up'}/>
        </Head>
        <main>
            <Navbar/>
            <section className={'container mt-3 mt-md-2'}>
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title">Sign up</h1>
                        <h5 className={'section-sub-title'}>Why you should sign up?</h5>
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
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={'Enter your name.'}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
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
                            <button className={'btn btn-primary'} onClick={signUo}>Sign Up</button>
                        </div>
                        <div className="form-group mt-3">
                            Already have an account?  <a href="/sign-in" style={{textDecoration: 'none'}}>Sign in now.</a>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    </>)
}
