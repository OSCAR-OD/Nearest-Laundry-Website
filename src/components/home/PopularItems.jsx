import Slider from "react-slick";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";
import * as React from "react";

const PopularItems = ({ items }) => {
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
    <section className="container popular-item-section mt-2 mt-md-4">
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="section-title">Things on attraction</h2>
          <h3 className="section-description d-none d-md-block">
            We have something that got attraction. It’s tough to say what people
            like. Normally it
            <br />
            depends on few parameter like; what, how, when and why? You may like
            some.
          </h3>
        </div>
      </div>

      <div className="row">
        <div className="simple-slick-slider mb-4">
          <Slider {...settings}>
            {items?.length > 0 ?
              items?.map((item, index) => (
                <div className="simple-slick-slide">
                  <div className={"justify-content-evenly"} key={index}>
                    <ProductCard product={item} />
                  </div>
                </div>
              )):  firstLine.map((item, index) => <div className="simple-slick-slide" key={index}>
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
                </div>)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PopularItems;
