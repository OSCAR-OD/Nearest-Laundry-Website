import Slider from "react-slick";
import ProductCard from "../ProductCard";
import Image from "next/image";
import * as React from "react";
import Skeleton from "react-loading-skeleton";
const DiscountItems = ({ items }) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: false,
    speed: 500,
    // slidesToShow: items.length < 3 ? items.length : 5,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    // variableWidth: true,
    // adaptiveHeight: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  let firstLine = [1,2,3,4,5];
  return (
    <div>
      <section className="container discounted-item-section mt-1 mt-md-5">
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="section-title">Discount on items</h2>
            <p className="section-description d-none d-md-block">
              Discover unbeatable discounts on top products at the nearest laundry! <br/>
              You won't believe the deals we have on your favorite items. These offers won't last forever,<br/>
              so make sure you shop now to take advantage of the unbeatable prices. Don't miss out on these <br/>
              limited-time deals with free pick-up and delivery.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="simple-slick-slider mb-4">
            <Slider {...settings}>
              {items?.length > 0 ?
                items?.map((item, index) => (
                  <div className="simple-slick-slide">
                    <div className={"justify-content-center"} key={index}>
                      <ProductCard product={item} key={index} />
                    </div>
                  </div>
                )): firstLine.map((item, index) => <div className="simple-slick-slide" key={index}>
                    <div className={"justify-content-center"}>
                      <div className="product-card product-card-1">
                        <div className={"incrementer-1"}>
                          <Skeleton className={'product-title d-md-none'} />
                          <Skeleton className={'product-price'} />
                          <Skeleton className={'product-price'} />
                          <Skeleton className={'product-price'} />
                        </div>
                          <div className="image-wrapper">
                            <Skeleton className={'product-image'} />
                          </div>
                          <Skeleton className={'product-title'} />
                          <Skeleton className={'product-price'} />
                      </div>
                    </div>
                  </div>) }
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscountItems;
