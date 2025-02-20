import Image from "next/image";
import { Carousel } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import * as React from "react";

const PromotionSection = ({ sliders }) => {
  return (
    <section className="container promotion-slider-section mt-2 mt-md-4 mb-4">
      <div className="row">
          {sliders?.length > 0 ? <div className="col-12 secondary-banner mb-5">
              <Carousel className={"carousel-dark mt-5"}>
                  {sliders?.length > 0 &&
                      sliders?.map((item, index) => (
                          <Carousel.Item
                              interval={2000}
                              className={"justify-content-evenly"}
                              key={index}
                          >
                              <a href={item.link}>
                                  <Image
                                      src={item.file}
                                      alt={"app banner"}
                                      width={"1440"}
                                      height={"400"}
                                      className="d-block carousel-image"
                                      loading={'lazy'}
                                  />
                              </a>
                          </Carousel.Item>
                      ))}
              </Carousel>
          </div>
              : <Skeleton className={'col-12 secondary-banner mb-5'} style={{minHeight: '400px'}} />}
      </div>
    </section>
  );
};

export default PromotionSection;
