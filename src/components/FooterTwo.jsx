import { AppContext } from "@/store/contexts/AppContext";
import REQUEST from "@/utils/networks/Request";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Icon from "react-icons-kit";
import {
  envelope,
  facebook,
  instagram,
  linkedin,
  longArrowRight,
  phone,
  twitter,
  whatsapp,
} from "react-icons-kit/fa";
import Skeleton from "react-loading-skeleton";
import logo from "./assets/img/logo.png";

const FooterTwo = () => {
  const {
    appData: { services },
  } = useContext(AppContext);

  const [data, setData] = useState({});
  const staticServices = [1, 2, 3, 4, 5, 6, 7];
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
    <>
      <div className=" py-3 mt-5"> </div>
      <footer className="footer-section">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="widget company-intro-widget">
                  <Link href="/" className="site-logo">
                    <Image
                      src={logo}
                      alt={"logo"}
                      loading={"lazy"}
                      className="footer-branding"
                    />
                  </Link>
                  <p>
                    Nearest Laundry are proud to do mobile laundry service, dry
                    cleaning, wash & iron, ironing, boots repair, clothing
                    alterations and tailoring service with free pick-up and
                    delivery within 24 hours.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="widget latest-news-widget">
                  <h5 className="widget-title">Services</h5>
                  <ul className="courses-link-list">
                    {services?.length > 0
                      ? services.map((item, index) => (
                          <li key={index}>
                            <a
                              className="footer-nav-link"
                              href={`/service/${item.name
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                            >
                              <Icon icon={longArrowRight} />
                              {item.name}
                            </a>
                          </li>
                        ))
                      : staticServices.map((item, index) => (
                          <li key={index}>
                            <Skeleton />
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="widget course-links-widget mt-3 mt-md-0">
                  <h5 className="widget-title ">Quick Links</h5>
                  <ul className="courses-link-list">
                    <li>
                      <a href="/">
                        <Icon icon={longArrowRight} />
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/about-us">
                        <Icon icon={longArrowRight} />
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/contact-us">
                        <Icon icon={longArrowRight} />
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="/gift-cards">
                        <Icon icon={longArrowRight} />
                        Gift cards
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="widget newsletter-widget mt-3 mt-md-0">
                  <h5 className="widget-title">Contact Us</h5>
                  <ul className="company-footer-contact-list">
                    <li>
                      <a
                        href={`tel:${
                          data && data.phoneNumber
                            ? data.phoneNumber
                            : "02034884131"
                        }`}
                        className="contact-link"
                      >
                        <Icon icon={phone} />
                        {data && data.phoneNumber
                          ? data.phoneNumber
                          : "02034884131"}
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:help@nearestlaundry.com"
                        className="contact-link"
                      >
                        <Icon icon={envelope} />
                        {data && data.email
                          ? data.email
                          : "info@nearestlaundry.com"}
                      </a>
                    </li>
                  </ul>
                  <h5 className="widget-title mt-3">Follow Us</h5>
                  <div className="footer-newsletter">
                    <a
                      href={
                        data && data.whatsapp
                          ? data.whatsapp
                          : "https://api.whatsapp.com/send/?phone=0447534801503"
                      }
                      title="Whatsapp"
                      className={"btn btn-social"}
                    >
                      <Icon
                        icon={whatsapp}
                        size={22}
                        className="text-white icon"
                      />
                    </a>
                    <a
                      href={
                        data && data.facebook
                          ? data.facebook
                          : "https://www.facebook.com/nearestlaundry"
                      }
                      title="Facebook"
                      className={"btn btn-social"}
                    >
                      <Icon
                        icon={facebook}
                        size={22}
                        className="text-white icon"
                      />
                    </a>
                    <a
                      href={
                        data && data.twitter
                          ? data.twitter
                          : "https://www.twitter.com/nearestlaundry"
                      }
                      title="Twitter"
                      className={"btn btn-social"}
                    >
                      <Icon
                        icon={twitter}
                        size={22}
                        className="text-white icon"
                      />
                    </a>
                    <a
                      href={
                        data && data.linkedin
                          ? data.linkedin
                          : "https://www.linkedin.com/nearestlaundry"
                      }
                      title="Linkedin"
                      className={"btn btn-social"}
                    >
                      <Icon
                        icon={linkedin}
                        size={22}
                        className="text-white icon"
                      />
                    </a>
                    <a
                      href={
                        data && data.instagram
                          ? data.instagram
                          : "https://www.instagram.com/nearestlaundry"
                      }
                      title="Instagram"
                      className={"btn btn-social"}
                    >
                      <Icon
                        icon={instagram}
                        size={22}
                        className="text-white icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 text-sm-left">
                {data && data.copyright ? (
                  <span
                    className="copy-right-text"
                    dangerouslySetInnerHTML={{ __html: data.copyright }}
                  ></span>
                ) : (
                  <span className="copy-right-text">
                    &copy; Copyright
                    <a href="/" className="branding">
                      Nearest Laundry
                    </a>
                    . All right reserved.
                  </span>
                )}
              </div>
              <div className="col-md-6 col-sm-6">
                <ul className="terms-privacy d-flex justify-content-sm-end justify-content-center">
                  <li>
                    <a
                      href="/terms-and-conditions"
                      style={{ textDecoration: "none" }}
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy-policy"
                      style={{ textDecoration: "none" }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterTwo;
