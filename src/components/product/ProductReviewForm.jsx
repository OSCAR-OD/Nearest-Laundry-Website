import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Icon from "react-icons-kit";
import { star } from "react-icons-kit/fa";
import { toast } from "react-toastify";

const ProductReviewForm = ({ product, faqs }) => {
  const router = useRouter();

  // rating
  const [productReview, setProductReview] = useState("");
  const [selectedRating, setSelectedRating] = React.useState(3);
  const [files, setFiles] = React.useState([]);

  const [hasLogged, setLogged] = React.useState(false);
  const [reviewSubmitted, SetReviewSubmitted] = useState(false);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    console.log(selectedFiles, "selectedFiles");
  };

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (authCheck(accessToken)) {
        // router.push('/dashboard')
        setLogged(true);
      } else {
        setLogged(false);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    if (!productReview) error = true;
    if (error) {
      toast("Product review is required", {
        hideProgressBar: true,
        autoClose: false,
        type: "warning",
        position: "top-right",
        theme: "dark",
      });
    } else {
      const formData = new FormData();
      formData.append("item", product._id);
      formData.append("rating", selectedRating);
      formData.append("description", productReview);
      let images = [];

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await REQUEST.PageData.submitProductReview(formData);
      let resError = "";
      if (response?.success) {
        toast("Review is submitted.", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
          position: "top-right",
          theme: "dark",
        });
        SetReviewSubmitted(true);
      } else {
        SetReviewSubmitted(false);
      }

      if (response?.response?.status === 422) {
        resError = response.response.data.errors.email;
      } else if (response?.response?.status === 500) {
        resError = response.response.data.errors.errors.email.message;
      } else if (response?.response?.status === 400) {
        resError = response.response.data.message;
      }
      if (resError) {
        toast(resError, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "warning",
          position: "top-right",
          theme: "dark",
        });
      }
      // console.log(response);
    }
  };

  return (
    <div className="w-100 write-review-section">
      <div className="col-12 col-md-8 me-auto ms-auto ">
        <div className="card p-4 border-1">
          <h4 className="text-center">Write a review</h4>

          {!reviewSubmitted ? (
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">
                  Product Review <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="review"
                  rows={3}
                  value={productReview}
                  onChange={(e) => setProductReview(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <label className="form-label">
                  Product Rating <span className="text-danger">*</span>
                </label>
                <div className="d-flex flex-column">
                  <div className="rating-stars d-flex  ">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span
                        onClick={() => handleRatingClick(rating)}
                        className={`mr-3  star ${
                          rating <= selectedRating
                            ? "text-warning"
                            : "text-black-50"
                        }`}
                      >
                        <Icon
                          className="align-text-bottom star-icon me-2"
                          size={18}
                          icon={star}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Upload Images </label>
                <br />
                <input
                  type="file"
                  className="form-control-file"
                  id="addimage"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                />

                <div className="d-flex flex-wrap uploaded-review-images">
                  {files.map((file, index) => (
                    <div className=" image" key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group text-center mt-3">
                {hasLogged ? (
                  <button className={"btn btn-primary"} onClick={onSubmit}>
                    Submit
                  </button>
                ) : (
                  <div className="alert alert-info py-2" role="alert">
                    To submit a review! Please sign in your account.{" "}
                    <a href="/sign-in" style={{ textDecoration: "none" }}>
                      Sign in now.
                    </a>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="alert alert-info py-2 text-center" role="alert">
              Product review is submitted successfully.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewForm;
