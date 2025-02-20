import CustomCarousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Product from "@/components/Product";
import Services from "@/components/home/Services";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";

export default function BookNow() {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [subServices, setSubServices] = React.useState([]);
    const [productsBackup, setProductsBackup] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const router = useRouter();
    const fetchData = React.useCallback(async () => {
        const response = await REQUEST.ServicePage.data('all-service');
        if(!response.data){
            router.push('/404');
            return;
        }
        setData(response.data);
        if(response.data){
            setLoading(false);
            setProducts(response.data.products);
            setProductsBackup(response.data.products);
        }
    }, [setData, setLoading, setProducts]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    const subServiceFilter = e => {
        let ss = [...subServices];
        if(!ss.includes(e.target.value)){
            ss.push(e.target.value);
            setSubServices(ss);
        } else {
            const newSS = [];
            ss.map((it, i)=> {
                if(it !== e.target.value){
                    newSS.push(it);
                }
            });
            ss = newSS;
            setSubServices(ss);
        }
        if(ss.length >= 1) {
            console.log('Sub Services',ss);
            const filtered = [];
            productsBackup.map((i, n) => {
                if(ss.includes(i.sub_service._id)){
                    filtered.push(i);
                }
            });
            console.log(filtered)
            setProducts(filtered);
        } else {
            setProducts(productsBackup);
        }
    }
    const allService = () => {
        setSubServices([]);
        setProducts(productsBackup);
    }
    return (<>
        <Head>
            <title>Book Now | Affordable Laundry service in London</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Nearest Laundry Provides quality service in London, United Kingdom. To get premium quality service, book now! Get your nearest laundry service in London."
            />
            <meta
                name="keywords"
                content="Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"
            />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/service/all-service'}/>
        </Head>
        <main>
            <Navbar/>
            {loading? <PageLoader />:
                <div>
                    <CustomCarousel banners={data?.mainBanner}/>
                    <Services services={data?.services}/>

                    {data?.subServices.length ? <section className={'container mt-2 '}>
                        <div className={'row'}>
                            <div className={'col-12'}>
                                <p>
                                    <a className="section-title text-black text-decoration-none" data-bs-toggle="collapse"
                                    href="#collapseExample"
                                    role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Filter By Sub Services
                                    </a>
                                </p>
                                <div className="collapse show" id="collapseExample">
                                    <div className="card card-body py-2 py-md-2" style={{backgroundColor: '#35A5E4'}}>
                                        <div className={'d-flex justify-content-start flex-wrap'}>
                                            <div className="col-6 col-md-2">
                                                <div className="form-check" style={{minWidth: '165px'}}>
                                                    <input
                                                        className="form-check-input"
                                                        name={'subService'}
                                                        onChange={allService}
                                                        type="checkbox"
                                                        value={'all'}
                                                        id={'all'}
                                                        checked={subServices.length===data?.subServices.length||subServices.length===0}
                                                    />
                                                    <label className="form-check-label" htmlFor={'all'} style={{color: '#ffffff'}}>
                                                        All
                                                    </label>
                                                </div>
                                            </div>

                                            {data?.subServices.map((item, index) =>{

                                                
                                                return (
                                                    <div className="col-6 col-md-2">
                                                        <div className="form-check" key={index}  style={{minWidth: '165px'}}>
                                                            <input
                                                            className="form-check-input"
                                                            name={'subService'}
                                                            onChange={subServiceFilter}
                                                            type="checkbox"
                                                            value={item._id}
                                                            id={item._id}
                                                            checked={subServices.includes(item._id)}
                                                            />
                                                            <label className="form-check-label" htmlFor={item._id} style={{color: '#ffffff'}}>
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : null}
                        

                    <section className="container discounted-item-section mt-5">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="section-title">Book Now from All Services</h1>
                                <h3 className="section-description">We always ensure the quality of laundry and dry
                                    cleaning.
                                    Our fleet team is efficient
                                    <br/>enough to ensure your schedule collection and delivery</h3>
                            </div>
                        </div>
                        {products.length ? 
                            <div className="row">
                                {products.map((item, index) => {

                                    return (
                                        <div className="col-6 col-md-4  col-lg-3">
                                            <Product product={item} key={index + 1}/>
                                        </div>
                                    )
                                }
                            
                                )}
                        </div>
                            :  <h2 className={'text--uppercase'} style={{textTransform: 'uppercase', fontSize: '25px'}}>No items found</h2>}

                        {/* {products.length > 30 ? <div className="row mt-5">
                            <h3 className="section-description mb-3">We do have few more items on discount.
                                Please click above dots to bring them in front
                                <br/>
                                of your beautiful eyes.
                            </h3>
                            <button className={'btn btn-outline-primary'}>Load more</button>
                        </div> : null} */}
                    </section>
                    
                </div> }

        </main>
    </>)
}
