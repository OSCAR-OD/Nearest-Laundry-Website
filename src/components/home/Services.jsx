import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import laundryRoom from "../assets/img/all-services.png";

const Services = (props) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: false,
    speed: 500,

    initialSlide: 0,
    centerPadding: "60px",
    rows: 2,
    slidesPerRow: 8,

    responsive: [
      // {
      //   breakpoint: 1200,
      //   settings: {
      //     slidesPerRow: 6,
      //   },
      // },

      {
        breakpoint: 1200,
        settings: {
          slidesPerRow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesPerRow: 5,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesPerRow: 5,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 4,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesPerRow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesPerRow: 3,
        },
      },
    ],
  };
  const firstLine = [1, 2, 3, 4, 5, 6, 7, 8];
  const { services } = props;
  const [total, setTotal] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    let tp = 0;
    services?.map((item, i) => {
      tp += parseInt(item.products[0]?.total ?? 0);
    });
    setTotal(tp);
  }, [services]);
  return (
    <section className="container  service-section mt-5 mt-md-5 pt-3">
      <div className="row mb-3">
        <div className="col-12 d-md-flex justify-content-start mb-2">
          <h2 className="section-title pr-40 border-md-right">
            Service we offer
          </h2>
          <h3 className="section-semi-title d-none d-md-block">
            Our services are specially designed by our happy customers need. As
            we believe in Happy you and happy us.
          </h3>
        </div>
      </div>

      <div className="row">
        <div className="service-slick-slider mb-4">
          <Slider {...settings}>
            {services?.length && (
              <div className="service-slick-slide align-top mb-3">
                <div className="text-center">
                  <a
                    href={`/service/all-service`}
                    className={`service-item d-block ${
                      router.asPath === "/service/all-service" ? "active" : ""
                    }`}
                    style={{
                      textDecoration: "none",
                      color: "var(--color-black)",
                    }}
                  >
                    <div className="image-wrapper">
                      <Image
                        src={laundryRoom}
                        width={100}
                        height={96}
                        alt={"Service Image"}
                        className={"service-image"}
                        loading={"lazy"}
                      />
                    </div>
                    <h4 className="service-name">All Services</h4>
                    <h5 className="service-info mt-2">
                      <span className="service-number me-1">{total}</span>
                      items
                    </h5>
                  </a>
                </div>
              </div>
            )}
            {services?.length > 0
              ? services?.map((item, index) => (
                  <div className="service-slick-slide align-top  mb-3">
                    <div className="text-center" key={index}>
                      <a
                        href={`/service/${item.name
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                        className={
                          `service-item d-block ` +
                          (router.asPath ===
                          `/service/${item.name
                            .toLowerCase()
                            .replaceAll(" ", "-")}`
                            ? "active"
                            : "")
                        }
                        style={{
                          textDecoration: "none",
                          color: "var(--color-black)",
                        }}
                      >
                        <div className="image-wrapper">
                          <Image
                            src={item.icon ? item.icon : laundryRoom}
                            width={100}
                            height={96}
                            alt={"Service Image"}
                            className={"service-image"}
                          />
                        </div>

                        <h4 className="service-name">{item.name}</h4>
                        <h5 className="service-info mt-2">
                          <span className="service-number me-1">
                            {item.products[0]?.total ?? 0}
                          </span>{" "}
                          items
                        </h5>
                      </a>
                    </div>
                  </div>
                ))
              : firstLine.map((item, index) => (
                  <div
                    className="service-slick-slide align-top  mb-3"
                    key={index}
                  >
                    <div className="text-center">
                      <div className="image-wrapper">
                        <Skeleton className={"service-image"} />
                      </div>
                      <Skeleton className={"service-name"} />
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Services;
