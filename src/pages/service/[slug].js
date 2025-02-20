import CustomCarousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Product from "@/components/Product";
import Services from "@/components/Services";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import { cookies } from "next/dist/client/components/headers";
import Head from 'next/head';
import { useRouter } from "next/router";
import * as React from "react";

export default function Service({ serviceInfo }) {
    // console.log("Service Name:", serviceInfo?.data);

    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [subServices, setSubServices] = React.useState([]);
    const [productsBackup, setProductsBackup] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [serviceName, setServiceName] = React.useState("ALL SERVICE");
    const [service, setService] = React.useState({});

    React.useEffect(() => {
        // if (!serviceInfo) {
        //     if (typeof window !== 'undefined') {
        //         window.location.href = '/service/all-service';
        //     }
        //     return <></>;
        // } 
        setData(serviceInfo?.data);
        if (serviceInfo?.data && serviceInfo?.data.service) {
            setServiceName(serviceInfo?.data.service.name);
            setService(serviceInfo?.data.service);
        }
        //  }
    }, [setData]);

    const subServiceFilter = e => {
        let ss = [...subServices];
        if (!ss.includes(e.target.value)) {
            ss.push(e.target.value);
            setSubServices(ss);
        } else {
            const newSS = [];
            ss.map((it, i) => {
                if (it !== e.target.value) {
                    newSS.push(it);
                }
            });
            ss = newSS;
            setSubServices(ss);
        }
        if (ss.length >= 1 && productsBackup.length > 0) {
            const filtered = [];
            productsBackup.map((i, n) => {
                console.log("i.sub_service", i.sub_service);
                if ((typeof i.sub_service == "object" && ss.includes(i.sub_service._id)) || ss.includes(i.sub_service)) {
                    filtered.push(i);
                }
            });
            setProducts(filtered);
        } else {
            setProducts(productsBackup);
        }
    }
    const allService = () => {
        setSubServices([]);
        setProducts(productsBackup);
    }

    // console.log("product?.data.data.name", serviceInfo?.data.service.name);

    console.log("product?.data.data.name", data?.service.name);

    return (<>
       {/* <Head>
             <title>{serviceInfo?.data.service.metaTitle || 'Same-day laundry service in London | Nearest Laundry.'}</title>
             <meta name="description" content={service?.metaDescription ? service.metaDescription : "Nearest Laundry provides the best Laundry service in London. We offer laundry services with free pickup and delivery 24/7 in London. Nearest Laundry provides laundry, Wash & ironing, Dry Cleaning, Ironing, Alteration, Shoe Repair, and Wedding dress Cleaning services in London, United Kingdom."} />
            <meta name="keywords" content={service.keywords ? service.keywords : "Laundry Cleaners Near Me, Nearest Dry Cleaners,Dry Cleaners Alterations Near Me,Same Day Laundry Service London,Laundry And Ironing Service Near Me,Mobile Laundry Service London,Dry Cleaning Shop London,Same Day Cleaners Near Me,Same Day Laundry Service Near Me,Tailoring Service Near Me"} />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
          
        </Head> */}
        <main>
            <Navbar />
            <div>
                {/* <CustomCarousel banners={data?.mainBanner} />
               */}
                <div>
                    {/* Render the value of data if it exists */}
                    {data && (
                        <div>
                            <h1>Data:</h1>
                            <p>Name: {data.service.name}</p>
                            {/* Add more properties of data as needed */}
                        </div>
                    )}
                </div>

                {/* <Services services={data?.services}/>
         */}
            </div>
        </main>
    </>)
}

export async function getStaticPaths() {
    const response = await REQUEST.ServicePage.servicesInfo(1, 100);
    const data = response.data;
    const paths = data.map((service) => {
        const slug = service.name.replace(/(?<=\S)\s+(?=\S)/g, '-');
        return {
            params: { slug: slug },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const response = await REQUEST.ServicePage.data(params.slug.toString());
    return {
        props: {
            serviceInfo: response,
        },
    };
    //console.log("serviceInfo", serviceInfo);    
}




