import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import laundryRoom from "./assets/img/all-services.png";

const Services = (props) => {
  const { services } = props;
  const [total, setTotal] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    let tp = 0;
    services.map((item, i) => {
      tp += parseInt(item.products[0]?.total ?? 0);
    });
    setTotal(tp);
  }, [services]);
 
  return (
    <section className="container service-page mt-2">
      <div className="row mb-2 mb-md-4">
        <div className="col-12 d-md-flex justify-content-start">
          <h1 className="section-title pr-40 border-md-right">
            Service we offer
          </h1>
          <h3 className="section-semi-title d-none d-md-block">
            Our services are specially designed by our happy customers need. As
            we believe in Happy you and happy us.
          </h3>
        </div>
      </div>
      <div className="row justify-content-start">
        {services?.length ? (
          <div className="col-4 col-md-4  col-lg-2  text-center d-flex justify-content-center mb-2 mb-md-3">
            <a
              href={`/service/all-service`}
              className={`service-item d-block ${
                router.asPath === "/service/all-service" ? "active" : ""
              }`}
              style={{ textDecoration: "none", color: "var(--color-black)" }}
            >
              <div className="image-wrapper">
                <Image
                  src={laundryRoom}
                  width={100}
                  height={96}
                  alt={"Service Image"}
                  className={"service-image"}
                />
              </div>
              <h4 className="service-name">All Services</h4>
              <h5 className="service-info mt-2">
                <span className="service-number me-1">{total}</span> items
              </h5>
            </a>
          </div>
        ) : null}
        {services?.length
          ? services.map((item, index) => (
              <div
                className="col-4 col-md-4  col-lg-2  text-center d-flex justify-content-center mb-2 mb-md-3"
                key={index}
              >
                <a
                  href={`/service/${item.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className={
                    `service-item d-block ` +
                    (router.asPath ===
                    `/service/${item.name.toLowerCase().replaceAll(" ", "-")}`
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
            ))
          : null}
      </div>
    </section>
  );
};

export default Services;
