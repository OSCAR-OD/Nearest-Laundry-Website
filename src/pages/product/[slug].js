import Navbar from "@/components/Navbar";
import ProductFaq from "@/components/product/ProductFaq";
import ProductReview from "@/components/product/ProductReview";
import { CartContext } from "@/store/contexts/CartContext";
import REQUEST from "@/utils/networks/Request";
import Head from 'next/head';
import Image from "next/image";
import * as React from "react";
import Icon from "react-icons-kit";
import { chevronRight, star } from "react-icons-kit/fa";

export default function Service({ product }) {
    if (!product?.data.data.name) {
        if (typeof window !== 'undefined') {
            window.location.href = '/service/all-service';
        }
        return <></>;
    }
   const { dispatch } = React.useContext(CartContext);
    const [tabKey, setTabKey] = React.useState('review');
    const [data, setData] = React.useState();
    const [productPrice, setProductPrice] = React.useState(0);
    const [offeredPrice, setOfferedPrice] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const keywords = Array.isArray(product?.data.data.keywords)
        ? product?.data.data.keywords.join(', ')
        : '';
    
        React.useEffect(() => {
        if (!product) {
            if (typeof window !== 'undefined') {
                window.location.href = '/service/all-service';
            }
            return <></>;
        } else {
            setData(product.data);
            setProductPrice(parseFloat(product.data.data.price).toFixed(2));
            setOfferedPrice(offeredPriceCalculator(product.data.data));
        }

    }, [setData, setProductPrice, setOfferedPrice]);

    const offeredPriceCalculator = (product) => {
        let op = parseFloat(product.price);
        if (product.offerAmount > 0) {
            if (product.offerType === 'percentage') {
                op = op - ((product.offerAmount / 100) * op);
            } else {
                op = op - product.offerAmount;
            }
        }
        return parseFloat(op.toFixed(2));
    }

    const increment = () => {
        const q = Number(quantity) + 1;
        setQuantity(q);
        setProductPrice((q * data?.data.price).toFixed(2));
        setOfferedPrice((q * offeredPriceCalculator(data?.data)).toFixed(2));
    }

    const decrement = () => {
        let q = Number(quantity) - 1;
        if (q < 1) {
            q = 1;
        }
        setQuantity(q);
        setProductPrice((q * data?.data.price).toFixed(2));
        setOfferedPrice((q * offeredPriceCalculator(data?.data)).toFixed(2));
    }

    const handleManualQty = (e) => {
        let qty = 1;
        if (e.target.value && e.target.value > 0) {
            qty = e.target.value;
        }

        setQuantity(qty);
        setProductPrice((qty * data?.data.price).toFixed(2));
        setOfferedPrice((qty * offeredPriceCalculator(data?.data)).toFixed(2));
    }

    const cart = () => {
        const item = {
            pid: data.data._id,
            product: data.data,
            quantity: quantity,
            price: productPrice,
        };
        dispatch({ type: "ADD_TO_CART_CUSTOM", product: item });
    };
console.log("data", data);
return (<>
        <Head>
            <title>{product?.data.data.metaDescription}Book Now | Nearest Same Day Laundry Services And Cleaners In London | Nearestlaundry</title>
            <meta name="description" content={product?.data.data.metaDescription} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width" />
            <meta name="generator" content="pgwd" />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/product/'+product?.data.data.slug} />
            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@NearestLaundry" />
            <meta name="twitter:title" content={(product?.data.data.name) ? product?.data.data.subTitle : "Nearest Laundry is the best wash, Ironing, dry cleaning & laundry service in UK."} />
            <meta name="twitter:description" content={(product?.data.data.metaDescription) ? product?.data.data.metaDescription : "Worried about Wash, dry cleaning, Ironing, laundry, shoe repair and Wedding dress cleaning service in London or your near? Don’t be concerned! Nearest Laundry Offers mobile laundry service and same-day laundry service in the United Kingdom. We provide free door-to-door pickup and delivery service."} />
            <meta name="twitter:image" content={product?.data.data.image} />
            {/* facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={(product?.data.data.name) ? product?.data.data.subTitle : "Nearest Laundry is the best wash, Ironing, dry cleaning & laundry service in UK."} />
            <meta property="og:description" content={(product?.data.data.metaDescription) ? product?.data.data.metaDescription : "Worried about Wash, dry cleaning, Ironing, laundry, shoe repair and Wedding dress cleaning service in London or your near? Don’t be concerned! Nearest Laundry Offers mobile laundry service and same-day laundry service in the United Kingdom. We provide free door-to-door pickup and delivery service."} />
            <meta property="og:url" content="https://www.nearestlaundry.com" />
            <meta property="og:image" content={product?.data.data.image} />
            <meta property="og:image:width" content="683" />
            <meta property="og:image:height" content="1024" />
        </Head>
        <main>
            <Navbar />
            {data ?
                <section className="product-info mt-3 mt-md-2">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-md-6">
                                <Image src={data?.data.image} alt={data?.data.name} className={'product-image-lg'} priority={true} width={600} height={480} />                 </div>                 <div className="col-md-6">                    <h5 className="product-service-lg mt-2 mt-md-0">                        {data?.data?.service?.name}                        <Icon className="align-bottom mx-1" size={16} icon={chevronRight} />
                                    {data?.data?.sub_service?.name}</h5>
                                <div className="rating-stars d-flex">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <span className={`mr-3  star ${rating <= data?.avgReview
                                            ? "text-warning"
                                            : "text-black-50"
                                            }`} >
                                            <Icon
                                                className="align-text-bottom star-icon me-2"
                                                size={18}
                                                icon={star}
                                            />
                                        </span>
                                    ))}
                                </div>
                                <h5 className="product-subservice-lg"></h5>
                                <h1 className="product-title-lg">{data?.data.name}</h1>
                                <p className="product-title-lg">{data?.data.subTitle}</p>
                                <h6 className="product-price-lg">
                                    {data?.data.offerType !== '' ?
                                        <span> £ {offeredPrice} <del>£ {productPrice}</del></span>
                                        : <span>£ {productPrice}</span>}
                                </h6>
                                <div className="incrementer-lg d-flex">
                                    <button className="btn decrement-btn" onClick={decrement}>-</button>
                                    <input className="form-control shadow-none mx-1 p-0 px-3" style={{ width: '80px' }} type="number" min={1}
                                        value={quantity}
                                        onChange={handleManualQty}
                                    />
                                    <button className="btn increment-btn" onClick={increment}>+</button>
                                </div>
                                <div className="action-buttons-lg w-100 d-flex justify-content-between justify-content-md-start m-0">
                                    <button className="btn btn-outline-primary alg-btn m-0 me-0 me-md-3" onClick={() => { location.href = '/cart' }}>Proceed to checkout</button>
                                    <button className="btn btn-outline-primary alg-btn m-0" onClick={cart}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-3 mt-4 mt-md-5">
                                <p className={'short-description'} dangerouslySetInnerHTML={{ __html: data?.data.description }}></p>
                            </div>
                        </div>
                    </div>
                    {(data && data.reviews) &&
                        <ProductReview product={data?.data} reviews={data.reviews} />
                    }
                    {(data && data.faqs) &&
                        <ProductFaq faqs={data.faqs} />
                    }
                </section>
                : null}
        </main>
    </>)
}

export async function getStaticPaths() {
    const response = await REQUEST.PageData.products(1, 100);
    const data = response.data;
    const paths = data.map((product) => {
        return {
            params: { slug: product.slug },
        };
    });

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const response = await REQUEST.PageData.product(params.slug.toString());
    return {
        props: {
            product: response,
        },
    };
}
