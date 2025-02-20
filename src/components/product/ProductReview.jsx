import moment from "moment";
import * as React from "react";
import Icon from "react-icons-kit";
import { star } from "react-icons-kit/fa";
import ProductReviewForm from "./ProductReviewForm";

const ProductReview = ({ product, reviews }) => {
  // rating
  const [selectedRating, setSelectedRating] = React.useState(0);
  const [avgRating, setAvgRating] = React.useState(0);
  const [totalRating, setTotalRating] = React.useState(0);

  const [oneStarCount, setOneStarCount] = React.useState(0);
  const [oneStarPercentage, setOneStarPercentage] = React.useState("0%");

  const [twoStarCount, setTwoStarCount] = React.useState(0);
  const [twoStarPercentage, setTwoStarPercentage] = React.useState("0%");

  const [threeStarCount, setThreeStarCount] = React.useState(0);
  const [threeStarPercentage, setThreeStarPercentage] = React.useState("0%");

  const [fourStarCount, setFourStarCount] = React.useState(0);
  const [fourStarPercentage, setFourStarPercentage] = React.useState("0%");

  const [fiveStarCount, setFiveStarCount] = React.useState(0);
  const [fiveStarPercentage, setFiveStarPercentage] = React.useState("0%");

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  React.useEffect(() => {
    const total_rating = reviews.reduce(
      (prev, review) => (prev += review.rating),
      0
    );

    const avg_rating = Math.floor(total_rating / reviews.length);
    setAvgRating(avg_rating > 0 ? avg_rating : 0);

    // 5 star count
    const fiver_star_count = reviews.filter((review) => {
      return review.rating == 5;
    }).length;

    const fiver_star_percentage = Math.floor(
      (fiver_star_count / reviews.length) * 100
    );
    setFiveStarCount(fiver_star_count);
    setFiveStarPercentage(`${fiver_star_percentage}%`);

    // 4 star count
    const four_star_count = reviews.filter((review) => {
      return review.rating == 4;
    }).length;

    const four_star_percentage = Math.floor(
      (four_star_count / reviews.length) * 100
    );
    setFourStarCount(four_star_count);
    setFourStarPercentage(`${four_star_percentage}%`);

    // 3 star count
    const three_star_count = reviews.filter((review) => {
      return review.rating == 3;
    }).length;

    const three_star_percentage = Math.floor(
      (three_star_count / reviews.length) * 100
    );
    setThreeStarCount(three_star_count);
    setThreeStarPercentage(`${three_star_percentage}%`);

    // 2 star count
    const two_star_count = reviews.filter((review) => {
      return review.rating == 2;
    }).length;

    const two_star_percentage = Math.floor(
      (two_star_count / reviews.length) * 100
    );
    setTwoStarCount(two_star_count);
    setTwoStarPercentage(`${two_star_percentage}%`);

    // 1 star count
    const one_star_count = reviews.filter((review) => {
      return review.rating == 1;
    }).length;

    const one_star_percentage = Math.floor(
      (one_star_count / reviews.length) * 100
    );
    setOneStarCount(one_star_count);
    setOneStarPercentage(`${one_star_percentage}%`);

    // setFiveStarPercentage(`Math.floor(fiver_star_count / reviews.length) %`);
    // setFiveStarPercentage(`Math.floor(fiver_star_count / reviews.length) %`);
  }, []);

  return (
    <div className="container">
      <div className="row rating-review-section">
        <div className="col-12 ">
          <div className="card  shadow p-1 p-md-3 mb-5 bg-body rounded">
            <div className="card-body m-0">
              <h4 className="card-title">Ratings & Reviews of {product?.name}</h4>

              <div className="row rating-review-overview d-flex justify-content-between w-100 overflow-hidden">
                <div className="col-md-6 rating-summary">
                  <div className="score">
                    <span className="score-average">{avgRating}</span>
                    <span className="score-max h5 text-secondary">/5</span>
                  </div>
                  <div className="rating-stars d-flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span
                        className={`mr-3  star ${
                          rating <= avgRating ? "text-warning" : "text-black-50"
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

                  <p className="count mt-2 ">{reviews.length} Ratings</p>
                </div>
                <div className="col-md-6 rating-details">
                  <ul>
                    <li className="d-flex align-items-center">
                      <div className="progress-stars">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            className={`mr-2 star ${
                              rating <= 5 ? "text-warning" : "text-black-50"
                            }`}
                          >
                            <Icon
                              className="align-text-bottom me-1 me-md-2"
                              size={18}
                              icon={star}
                            />
                          </span>
                        ))}
                      </div>
                      <div className="progress-bar bg-light ">
                        <div
                          className="bar bg-warning"
                          style={{ width: fiveStarPercentage }}
                        ></div>
                      </div>
                      <div className="progress-count ms-1">
                        <span>{fiveStarCount}</span>
                      </div>
                    </li>

                    <li className="d-flex align-items-center">
                      <div className="progress-stars">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            className={`mr-2 star ${
                              rating <= 4 ? "text-warning" : "text-black-50"
                            }`}
                          >
                            <Icon
                              className="align-text-bottom me-1 me-md-2"
                              size={18}
                              icon={star}
                            />
                          </span>
                        ))}
                      </div>
                      <div className="progress-bar bg-light ">
                        <div
                          className="bar bg-warning"
                          style={{ width: fourStarPercentage }}
                        ></div>
                      </div>
                      <div className="progress-count ms-1">
                        <span>{fourStarCount}</span>
                      </div>
                    </li>

                    <li className="d-flex align-items-center">
                      <div className="progress-stars">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            className={`mr-2 star ${
                              rating <= 3 ? "text-warning" : "text-black-50"
                            }`}
                          >
                            <Icon
                              className="align-text-bottom me-1 me-md-2"
                              size={18}
                              icon={star}
                            />
                          </span>
                        ))}
                      </div>
                      <div className="progress-bar bg-light ">
                        <div
                          className="bar bg-warning"
                          style={{ width: threeStarPercentage }}
                        ></div>
                      </div>
                      <div className="progress-count ms-1">
                        <span>{threeStarCount}</span>
                      </div>
                    </li>

                    <li className="d-flex align-items-center">
                      <div className="progress-stars">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            className={`mr-2 star ${
                              rating <= 2 ? "text-warning" : "text-black-50"
                            }`}
                          >
                            <Icon
                              className="align-text-bottom me-1 me-md-2"
                              size={18}
                              icon={star}
                            />
                          </span>
                        ))}
                      </div>
                      <div className="progress-bar bg-light ">
                        <div
                          className="bar bg-warning"
                          style={{ width: twoStarPercentage }}
                        ></div>
                      </div>
                      <div className="progress-count ms-1">
                        <span>{twoStarCount}</span>
                      </div>
                    </li>

                    <li className="d-flex align-items-center">
                      <div className="progress-stars">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            className={`mr-2 star ${
                              rating <= 1 ? "text-warning" : "text-black-50"
                            }`}
                          >
                            <Icon
                              className="align-text-bottom me-1 me-md-2"
                              size={18}
                              icon={star}
                            />
                          </span>
                        ))}
                      </div>
                      <div className="progress-bar bg-light ">
                        <div
                          className="bar bg-warning"
                          style={{ width: oneStarPercentage }}
                        ></div>
                      </div>
                      <div className="progress-count ms-1">
                        <span>{oneStarCount}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="mt-5 mb-3  w-100">
                  <ProductReviewForm product={product} />
                </div>
              ) : null}

              <hr className="my-3 w-100" />
              <h5 className="card-title">Product Reviews</h5>
              <hr className="my-3 w-100" />

              {reviews.length > 0 ? (
                reviews.map((review, idx) => {
                  return (
                    <>
                      <div className="card border-0">
                        <div className=" d-flex">
                          <div className="profile-pic ">
                            <img
                              className=" border p-1 rounded-circle"
                              src={
                                review.image
                                  ? review.image
                                  : "/Frontend/img/user_icon.png"
                              }
                            />
                          </div>
                          <div className="d-flex flex-column ms-3">
                            <h3 className="mt-2 mb-0 ">{review?.customerName}</h3>
                            <div className="rating-stars d-flex  ">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  className={`mr-3  star ${
                                    rating <= review.rating
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

                            <p className="text-muted m-0 ">
                              {moment(review.createdAt)
                                .startOf("day")
                                .fromNow()}
                            </p>
                          </div>
                          <div className="ml-auto"></div>
                        </div>
                        <div className="row text-left">
                          <p className="content">{review.description}</p>
                        </div>

                        {review.images.length > 0 && (
                          <div className="review-images d-flex text-left">
                            {review.images.map((image, i) => {
                              return (
                                <img className="review-image p-1" src={image} />
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {idx != reviews.length - 1 && <hr className="my-3 w-100" />}
                    </>
                  );
                })
              ) : (
                <>
                  <h6 className="my-4 text-center w-100">
                    There are no reviews yet. Be the first reviewer of this
                    product
                  </h6>
                  <ProductReviewForm product={product} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
