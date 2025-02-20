import REQUEST from "@/utils/networks/Request";
import * as React from "react";
import { toast } from "react-toastify";

const Postcode = () => {
  const [serviceArea, setServiceArea] = React.useState(null);
  const [checking, setChecking] = React.useState(false);
  const [message, setMessage] = React.useState(
    "We always ensure the quality of laundry and dry cleaning. Our fleet team is efficient <br/>" +
      "enough to ensure your schedule collection and delivery"
  );
  const checkAddress = async () => {
    setChecking(true);
    if (serviceArea) {
      const response = await REQUEST.PageData.checkServiceArea(serviceArea);
      if (response.success === true) {
        setMessage(
          "We provide service in your area. Please add items into basket & proceed to checkout."
        );
        toast(
          "We provide service in your area. Please add items into basket & proceed to checkout.",
          {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
            position: "top-right",
            theme: "light",

            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        setMessage(
          "We do not provide service in your area but we will start soon! Please try another area."
        );
        toast(
          "We do not provide service in your area but we will start soon! Please try another area.",
          {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
            position: "top-right",
            theme: "light",
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      setMessage("Please enter your zipcode before checking.");
      toast("Please enter your zipcode before checking.", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "warning",
        position: "top-right",
        theme: "dark",
      });
    }
    setChecking(false);
  };
  return (
    <section className="container postcode-section mt-5 mt-md-5">
      <div className="row">
        <div className="col-12  mt-3">
          <h1 className="section-title">
            We are Different in Laundry Industry
          </h1>
          <h3 className="section-description d-none d-md-block">
            Our clothing speaks volumes about your personality. It is your
            <br />
            identity.
          </h3>
        </div>
        <div className="col-12">
          <form className="postcode-form me-auto ms-auto d-flex justify-content-between">
            <input
              className="form-control postcode-input"
              type="search"
              placeholder="Enter Your Postcode"
              aria-label="Search"
              onChange={(e) => setServiceArea(e.target.value)}
            />
            <button
              className="btn postcode-btn"
              type="button"
              onClick={checkAddress}
            >
              {checking ? "Checking ..." : "Check"}
            </button>
          </form>
        </div>
        <div className="col-12 d-none d-md-block">
          <h3
            className="section-description mt-3"
            dangerouslySetInnerHTML={{ __html: message }}
          ></h3>
        </div>
      </div>
    </section>
  );
};

export default Postcode;
