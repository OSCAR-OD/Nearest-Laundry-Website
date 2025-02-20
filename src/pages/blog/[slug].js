import Navbar from "@/components/Navbar";
import REQUEST from "@/utils/networks/Request";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Image from "next/image";
import * as React from "react";

function removeHtmlTags(input) {
    if (input === undefined || input === null) {
        return '';
    }
    return input.replace(/<[^>]*>/g, '');
}

export default function Service({ blog }) {
    if (!blog?.data.title) {
        if (typeof window !== 'undefined') {
            window.location.href = '/blogs';
        }
        return <></>;
    }

    const cleanedDescription = removeHtmlTags(blog?.data.description);

    return (<>
        <Head>
            <title>{(blog?.data.title) ? blog?.data.title : "Nearest Laundry is the best wash, Ironing, dry cleaning & laundry service in UK."}</title>
            <meta name="description" content={blog?.data.metaDescription} />
            <meta name="keywords" content={blog?.data.keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width" />
            <meta name="generator" content="pgwd" />
            <meta name="author" content="Nearest Laundry" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href={'https://www.nearestlaundry.com/blog/' + blog?.data.slug} />
            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@NearestLaundry" />
            <meta name="twitter:title" content={(blog?.data.title) ? blog?.data.title : "Nearest Laundry is the best wash, Ironing, dry cleaning & laundry service in UK."} />
            <meta name="twitter:description" content={(blog?.data.metaDescription) ? blog?.data.metaDescription : "Worried about Wash, dry cleaning, Ironing, laundry, shoe repair and Wedding dress cleaning service in London or your near? Don’t be concerned! Nearest Laundry Offers mobile laundry service and same-day laundry service in the United Kingdom. We provide free door-to-door pickup and delivery service."} />
            <meta name="twitter:image" content={blog?.data.image} />
            {/* facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={(blog?.data.title) ? blog?.data.title : "Nearest Laundry is the best wash, Ironing, dry cleaning & laundry service in UK."} />
            <meta property="og:description" content={(blog?.data.metaDescription) ? blog?.data.metaDescription : "Worried about Wash, dry cleaning, Ironing, laundry, shoe repair and Wedding dress cleaning service in London or your near? Don’t be concerned! Nearest Laundry Offers mobile laundry service and same-day laundry service in the United Kingdom. We provide free door-to-door pickup and delivery service."} />
            <meta property="og:url" content="https://www.nearestlaundry.com" />
            <meta property="og:image" content={blog?.data.image} />
            <meta property="og:image:width" content="683" />
            <meta property="og:image:height" content="1024" />
        </Head>
        <main>
            <Navbar />
            <section className="container mt-4" >
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title blog-page-title">{blog?.data.title}</h1>
                        <h4 className={'blog-keywords'}>
                            <span className="key-title">Keywords: </span>
                            {blog?.data.keywords.map((item, index) =>
                                <span
                                    className={'badge rounded-pill'}
                                    key={index}
                                >{item}</span>)}
                        </h4>
                        <p className={'publishing-date'}>Published On: {new Date(blog?.data.createdAt).toDateString()}</p>
                        <div className="single-blog-img my-4">
                            <Image className="img" src={blog?.data.image} priority={true} alt={'Blog Image'} width={1200} height={350} />
                        </div>
                        <p className={'blog-description'} > {cleanedDescription}</p>
                    </div>
                </div>
            </section>
        </main>
    </>
    )
}

export async function getStaticPaths() {
    const response = await REQUEST.PageData.blogsInfo(1, 100);
    const data = response.data;

    const paths = data.map((blog) => {
        return {
            params: { slug: blog.slug },
        };
    });

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context) {

    const { params } = context;

    const response = await REQUEST.PageData.blog(params.slug.toString());

    return {
        props: {
            blog: response.data,
        },
    };
}

