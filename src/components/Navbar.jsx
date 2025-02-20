import { AppContext } from "@/store/contexts/AppContext";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useContext } from "react";
import Icon from "react-icons-kit";

import {
  dashboard,
  longArrowRight,
  paperPlaneO,
  signOut,
  userO,
} from "react-icons-kit/fa";
import {
  edit,
  home,
  logIn,
  packageIcon,
  userPlus,
} from "react-icons-kit/feather";
import { toast } from "react-toastify";
import addUser from "./assets/img/add-user.png";
import close from "./assets/img/close.png";
import enter from "./assets/img/enter.png";
import logo from "./assets/img/logo.png";
import magnify from "./assets/img/magnifying-glass.png";

const Navbar = () => {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const { pathname } = router;
  const [services, setServices] = React.useState(undefined);
  const [userInfo, setUserInfo] = React.useState({});
  const [suggestion, setSuggestion] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [hideSuggestions, setHideSuggestions] = React.useState(true);
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [hideSideNav, setHideSideNav] = React.useState(false);
  const fetchData = React.useCallback(async () => {
    const response = await REQUEST.HomePage.services();
    setServices(response.data);

    // set services to context
    dispatch({ type: "SET_APP_SERVICES", services: response.data });

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (authCheck(accessToken)) {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userInfo");
      }
    }
    // setCartLength(JSON.parse(localStorage.getItem('cart'))?.length??0);
  }, [setServices]);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  const logout = async () => {
    await REQUEST.PageData.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    setUserInfo({});
    toast("Logged out successfully.", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "info",
      position: "top-center",
      theme: "dark",
    });
  };

  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setHideSuggestions(false);
          setQuery("");
          setSuggestion([]);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function sideBarClose(ref) {
    React.useEffect(() => {
      function handleCloseSidebar(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setShowSidebar(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleCloseSidebar);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleCloseSidebar);
      };
    }, [ref]);
  }

  const wrapperRef = React.useRef(null);
  const sideRef = React.useRef(null);
  sideBarClose(sideRef);
  useOutsideAlerter(wrapperRef);
  const searchQuery = async (e) => {
    setQuery(e.target.value);
    try {
      if (e.target.value) {
        const search = await REQUEST.HomePage.search(e.target.value);
        if (search.success) {
          setHideSuggestions(false);
          setSuggestion(search.data.products);
        }
      } else {
        setHideSuggestions(true);
        setSuggestion([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top bg-white"
        ref={wrapperRef}
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <Image src={logo} alt={"Logo"} priority={true} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-expanded="false"
            onClick={() => {
              setShowSidebar(true);
              setHideSideNav(true);
            }}
          >
            {showSidebar ? "" : <span className="navbar-toggler-icon"></span>}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={`nav-link nav-link-na ${pathname === "/" ? "active" : ""
                    }`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={`nav-link nav-link-na dropdown-toggle ${pathname === "/service/[slug]" ? "active" : ""
                    }`}
                >
                  Services
                </a>
                <ul className="dropdown-menu  ">
                  <li>
                    <a
                      className="dropdown-item ps-3"
                      href="/service/all-service"
                    >
                      All Service
                    </a>
                  </li>

                  {services !== undefined
                    ? services.map((item, index) => (
                      <li key={index}>
                        <a
                          className="dropdown-item"
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
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link nav-link-na ${pathname === "/blogs" ? "active" : ""
                    }`}
                  href="/blogs"
                >
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link nav-link-na ${pathname === "/contact-us" ? "active" : ""
                    }`}
                  href="/contact-us"
                >
                  Contact us
                </a>
              </li>
            </ul>
            <div className={"search-box-wrapper"}>
              <form className="d-flex search-box me-md-5" role="search">
                <input
                  className="form-control me-2 search-input"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={searchQuery}
                  onFocus={() => setHideSuggestions(false)}
                  value={query}
                />
                <button className="search-button" type="button">
                  <Image src={magnify} alt={"Search"} priority={true} />
                </button>
              </form>
              {!hideSuggestions && suggestion.length ? (
                <ul className="list-group suggestion-box">
                  {suggestion.length
                    ? suggestion.map((item, index) => (
                      <li className="list-group-item" key={index}>
                        <Link
                          href={`/product/${item.name
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          className={"d-flex justify-content-start"}
                          style={{ textDecoration: "none" }}
                          onClick={() => setHideSuggestions(true)}
                        >
                          <Image
                            src={item.image}
                            alt={"PI"}
                            width={40}
                            height={40}
                            style={{ marginRight: "10px" }}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))
                    : null}
                </ul>
              ) : null}
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item rn-item">
                <a
                  className={`nav-link auth-btn ${pathname === "/book-now" ? "active" : ""
                    }`}
                  aria-current="page"
                  href="/book-now"
                >
                  <span>Book Now</span>
                  <span className="animation-line"></span>
                  <span className="animation-line"></span>
                  <span className="animation-line"></span>
                  <span className="animation-line"></span>
                </a>
              </li>
              {!userInfo?.name ? (
                <li className="nav-item rn-item">
                  <a
                    className={`nav-link ${pathname === "/sign-in" ? "active" : ""
                      }`}
                    aria-current="page"
                    href="/sign-in"
                  >
                    <Image
                      className="nav-icon"
                      src={enter}
                      alt={"Sign In"}
                      priority={true}
                    />
                    <span>Sign In</span>
                  </a>
                </li>
              ) : null}
              {!userInfo?.name ? (
                <li className="nav-item rn-item">
                  <a
                    className={`nav-link ${pathname === "/sign-up" ? "active" : ""
                      }`}
                    aria-current="page"
                    href="/sign-up"
                  >
                    <Image
                      className="nav-icon"
                      src={addUser}
                      alt={"Sign Up"}
                      priority={true}
                    />
                    <span>Sign Up</span>
                  </a>
                </li>
              ) : null}
              {userInfo?.name ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/dashboard">
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>

      {/* mobile screen search section */}
      <section className="container fixed-top d-block d-lg-none navbar-search-section">
        <div className={"search-box-wrapper"}>
          <form className="d-flex search-box " role="search">
            <input
              className="form-control  search-input"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={searchQuery}
              onFocus={() => setHideSuggestions(false)}
              value={query}
            />
            <button className="search-button" type="button">
              <Image src={magnify} alt={"Search"} priority={true} />
            </button>
          </form>
          {!hideSuggestions && suggestion.length ? (
            <ul className="list-group suggestion-box">
              {suggestion.length
                ? suggestion.map((item, index) => (
                  <li className="list-group-item" key={index}>
                    <Link
                      href={`/product/${item.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}+*+NLP${item._id}`}
                      className={"d-flex justify-content-start"}
                      style={{ textDecoration: "none" }}
                      onClick={() => setHideSuggestions(true)}
                    >
                      <Image
                        src={item.image}
                        alt={"PI"}
                        width={40}
                        height={40}
                        style={{ marginRight: "10px" }}
                      />
                      {item.name}
                    </Link>
                  </li>
                ))
                : null}
            </ul>
          ) : null}
        </div>
      </section>

      {/* mobile screen sidebar */}
      <section
        className={`sidebar-nav ${showSidebar ? "sidenav-show" : hideSideNav ? "sidenav-hide" : ""
          }`}
      >
        <div className={"actual-navbar"} ref={sideRef}>
          <div className="sidebar-header">
            <a className="navbar-brand sidebar-nav-logo" href="/">
              <Image src={logo} alt={"Logo"} priority={true} />
            </a>
            <div
              className={"custom-close"}
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <Image
                src={close}
                alt={"close"}
                style={{ height: "20px", width: "auto" }}
              />
            </div>
          </div>
          <div className={"sidebar-body"}>
            {userInfo?.name ? (
              <ul className={"sidenavbar-links mb-4"}>
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-na"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Icon icon={userO} /> {userInfo?.name}
                  </a>
                  <ul className="sidenavbar-links">
                    <li>
                      <a className="dropdown-item" href="/dashboard">
                        <Icon icon={dashboard} /> Dashboard
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        <Icon icon={signOut} /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : null}
            <ul className="sidenavbar-links">
              <li>
                <a
                  className={`nav-link nav-link-na ${pathname === "/" ? "active" : ""
                    }`}
                  aria-current="page"
                  href="/"
                >
                  <Icon
                    className="align-text-bottom me-2"
                    size={18}
                    icon={home}
                  />
                  Home
                </a>
              </li>
              <li>
                <a
                  className={`nav-link nav-link-na ${pathname === "/service/[slug]" ? "active" : ""
                    }`}
                  aria-current="page"
                  href="/service/all-service"
                >
                  <Icon
                    className="align-text-bottom me-2"
                    size={16}
                    icon={packageIcon}
                  />
                  Services
                </a>
                <ul className={"sidenavbar-links"}>
                  <li>
                    <a className="dropdown-item" href="/service/all-service">
                      <Icon icon={longArrowRight} /> All Service
                    </a>
                  </li>

                  {services !== undefined
                    ? services.map((item, index) => (
                      <li key={index}>
                        <a
                          className="dropdown-item"
                          href={`/service/${item.name
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          <Icon icon={longArrowRight} /> {item.name}
                        </a>
                      </li>
                    ))
                    : null}
                </ul>
              </li>
              <li>
                <a
                  className={`nav-link nav-link-na ${pathname === "/blogs" ? "active" : ""
                    }`}
                  href="/blogs"
                >
                  <Icon
                    className="align-text-bottom me-2"
                    size={18}
                    icon={edit}
                  />
                  Blogs
                </a>
              </li>
              <li>
                <a
                  className={`nav-link nav-link-na ${pathname === "/contact-us" ? "active" : ""
                    }`}
                  href="/contact-us"
                >
                  <Icon
                    className="align-text-bottom me-2"
                    size={18}
                    icon={paperPlaneO}
                  />
                  Contact us
                </a>
              </li>
              {!userInfo?.name ? (
                <li>
                  <a
                    className={`nav-link nav-link-na${pathname === "/sign-in" ? "active" : ""
                      }`}
                    href="/sign-in"
                  >
                    {/* <Image
                      className="nav-icon"
                      src={enter}
                      alt={"Sign In"}
                      priority={true}
                    /> */}

                    <Icon
                      className="align-text-bottom me-2"
                      size={18}
                      icon={logIn}
                    />
                    <span>Sign In</span>
                  </a>
                </li>
              ) : null}
              {!userInfo?.name ? (
                <li>
                  <a
                    className={`nav-link nav-link-na ${pathname === "/sign-up" ? "active" : ""
                      }`}
                    href="/sign-up"
                  >
                    {/* <Image
                      className="nav-icon"
                      src={addUser}
                      alt={"Sign Up"}
                      priority={true}
                    /> */}

                    <Icon
                      className="align-text-bottom me-2"
                      size={18}
                      icon={userPlus}
                    />
                    <span>Sign Up</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
