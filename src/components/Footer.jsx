import { AppContext } from "@/store/contexts/AppContext";
import Image from "next/image";
import { useContext, useState } from "react";
import Icon from "react-icons-kit";

import REQUEST from "@/utils/networks/Request";
import React from "react";
import {
  facebook,
  instagram,
  linkedin,
  twitter,
  whatsapp,
} from "react-icons-kit/fa";
import email from "./assets/img/email-icon.png";
import logo from "./assets/img/logo.png";
import phone from "./assets/img/phone-icon.png";

const Footer = () => {
  const {
    appData: { services },
  } = useContext(AppContext);

  const [data, setData] = useState({});

  // fetch site setting
  const fetchData = React.useCallback(async () => {
    const response = await REQUEST.PageData.siteSetting();
    // const status = response?.response?.status;
    if (response.success) {
      setData(response.data);
    }
  }, [setData]);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <footer className="footer bg-blue">
        <div className="bg-black py-3 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 d-flex justify-content-between">
                <div className="cta-content">
                  <h3 className="cta-title-3 text-white">
                    Ready to book your cleaning?
                  </h3>
                </div>
                <div className="cta-action">
                  <a href="/book-now" className="btn btn-primary">
                    <span className="fa fa-calendar-o"></span> Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-5">
              <div className="footer-image">
                <Image
                  src={logo}
                  alt={"logo"}
                  priority={true}
                  className="footer-branding"
                />
              </div>
              <h3 className="footer-description">
                Nearest Laundry are proud to do mobile laundry service,
                <br /> dry cleaning, wash & iron, ironing, boots repair,
                clothing
                <br /> alterations and tailoring service with free pick-up and{" "}
                <br /> delivery within 24 hours.
              </h3>
            </div>
            <div className="col-md-8 col-lg-7">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <h1 className="footer-title">Quick Links</h1>
                  <ul className="footer-nav">
                    <li className="footer-nav-item">
                      <a href="/" className="footer-nav-link">
                        Home
                      </a>
                    </li>
                    <li className="footer-nav-item">
                      <a href="/faq" className="footer-nav-link">
                        FAQs
                      </a>
                    </li>
                    <li className="footer-nav-item">
                      <a href="/about-us" className="footer-nav-link">
                        About Us
                      </a>
                    </li>
                    <li className="footer-nav-item">
                      <a href="/privacy-policy" className="footer-nav-link">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="footer-nav-item">
                      <a
                        href="/terms-and-conditions"
                        className="footer-nav-link"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li className="footer-nav-item">
                      <a href="/contact-us" className="footer-nav-link">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h1 className="footer-title">Services</h1>
                  <ul className="footer-nav">
                    {services !== undefined
                      ? services.map((item, index) => (
                          <li key={index} className="footer-nav-item">
                            <a
                              className="footer-nav-link"
                              href={`/service/${item.name
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h1 className="footer-title">Contact Info</h1>
                  <ul className="footer-nav">
                    <li className="footer-nav-item">
                      <a href={"tel:02034884131"} className="footer-nav-link">
                        <Image
                          src={phone}
                          alt={"Icon"}
                          className="contact-icon"
                        />{" "}
                        {data && data.phoneNumber
                          ? data.phoneNumber
                          : "02034884131"}
                      </a>
                    </li>
                    <li className="footer-nav-item">
                      <a
                        href="mailto:help@nearestlaundry.com"
                        className="footer-nav-link"
                      >
                        <Image
                          src={email}
                          alt={"Icon"}
                          className="contact-icon"
                        />

                        {data && data.email
                          ? data.email
                          : "help@nearestlaundry.com"}
                      </a>
                    </li>
                  </ul>

                  <div className="footer-links ">
                    <h1 className="footer-title">Follow Us</h1>
                    <div className="social-icons d-flex justify-content-around justify-content-md-between mb-3 ">
                      <a
                        href={
                          data && data.whatsapp
                            ? data.whatsapp
                            : "https://api.whatsapp.com/send/?phone=0447534801503"
                        }>
                        <div
                          className="item d-flex justify-content-center align-items-center border rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <Icon
                            icon={whatsapp}
                            size={20}
                            className="text-white icon"
                          />
                        </div>
                      </a>
                      <a
                        href={
                          data && data.facebook
                            ? data.facebook
                            : "https://www.facebook.com/nearestlaundry"
                        }
                        title="Facebook"
                      >
                        <div
                          className="item d-flex justify-content-center align-items-center border rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <Icon
                            icon={facebook}
                            size={18}
                            className="text-white icon"
                          />
                        </div>
                      </a>
                      <a
                        href={
                          data && data.twitter
                            ? data.twitter
                            : "https://www.twitter.com/nearestlaundry"
                        }
                        title="Twitter"
                      >
                        <div
                          className="item d-flex justify-content-center align-items-center border rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <Icon
                            icon={twitter}
                            size={18}
                            className="text-white icon"
                          />
                        </div>
                      </a>
                      <a
                        href={
                          data && data.linkedin
                            ? data.linkedin
                            : "https://www.linkedin.com/nearestlaundry"
                        }
                        title=""
                      >
                        <div
                          className="item d-flex justify-content-center align-items-center border rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <Icon
                            icon={linkedin}
                            size={18}
                            className="text-white icon"
                          />
                        </div>
                      </a>
                      <a
                        href={
                          data && data.instagram
                            ? data.instagram
                            : "https://www.instagram.com/nearestlaundry"
                        }
                        title=""
                      >
                        <div
                          className="item d-flex justify-content-center align-items-center border rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <Icon
                            icon={instagram}
                            size={18}
                            className="text-white icon"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section className="copyright">
        {
          data && data.copyright
              ? <h5 className="copyright-text text-center" dangerouslySetInnerHTML={{__html: data.copyright}}></h5>
              : <h5 className="copyright-text text-center">
          <span>
              &copy; Copyright{" "}
            <a href="/" className="branding">
            Nearest Laundry
          </a>
          . All right reserved.
                </span>
              </h5>
        }
      </section>
    </div>
  );
};

export default Footer;
