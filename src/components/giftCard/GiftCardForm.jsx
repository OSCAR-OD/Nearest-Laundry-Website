import { errorHandler } from "@/utils/ErrorHandler";
import { authCheck } from "@/utils/auth";
import REQUEST from "@/utils/networks/Request";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const GiftCardForm = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [userInfo, setUserInfo] = useState({});
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [cardPrices, setCardPrices] = useState([]);

  // input
  const [hasCustomAmount, setHasCustomAmount] = useState("no");
  const [customAmount, setCustomAmount] = useState("");
  const [giftPriceId, setGiftPriceId] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      if (authCheck(accessToken)) {
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(userData);

        console.log("userData", userData);
        setValue("fromName", userData.name);
        setValue("fromEmail", userData.email);
      }
    }
  }, []);

  const fetchCardPricesData = useCallback(async () => {
    try {
      setFetching(true);
      const response = await REQUEST.GiftCard.getGiftCardPrices();

      if (response && response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          console.log(response.data.data);
          setCardPrices(response.data.data);
        }
      }
      setFetching(false);
    } catch (error) {
      setFetching(false);
      if (error) console.log(error.response);
    }
  }, []);

  useEffect(() => {
    fetchCardPricesData();
  }, [fetchCardPricesData]);

  const handleCustomAmountOption = (e) => {
    setHasCustomAmount(e.target.value);

    //reset default card
    setCustomAmount("");
    setGiftPriceId(null);
  };

  /* handle submission */
  const onSubmit = async (data) => {
    try {
      // console.log("Data", data);

      // console.log("hasCustomAmount", hasCustomAmount);
      // console.log("customAmount", customAmount);
      if (hasCustomAmount == "yes" && Number(customAmount) < 1) {
        toast("Please add custom price", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
          position: "top-right",
          theme: "dark",
        });
      }

      if (hasCustomAmount == "no" && !giftPriceId) {
        toast("Select gift card amount", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
          position: "top-right",
          theme: "dark",
        });
      }

      setLoading(true);

      // custom data
      if (hasCustomAmount == "no") {
        data.priceID = giftPriceId;
      } else {
        data.customPrice = customAmount;
      }

      data.template = "64ed96989e9e4a130c8a9a82";

      const response = await REQUEST.GiftCard.sendGiftCard(data);

      if (response.status == 200 || response.status == 201) {
        setLoading(false);

        toast(response.data.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
          position: "top-right",
          theme: "dark",
        });

        // note redirect
      }
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 me-auto ms-auto mt-3">
        <form
          method="post"
          acceptCharset="utf-8"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-md-12">
              <h4 className="form-title">From (Your Data)</h4>
              <div className="form-group mb-2">
                <label className="form-label">
                  Name
                  <span className="ms-1 text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={
                    errors.fromName
                      ? "form-control  is-invalid"
                      : "form-control "
                  }
                  {...register("fromName", {
                    required: "This field is required",
                  })}
                />
                {errors.fromName && errors.fromName.message ? (
                  <small className="text-danger">
                    {errors.fromName && errors.fromName.message}
                  </small>
                ) : null}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">
                  Email Address
                  <span className="ms-1 text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={
                    errors.fromEmail
                      ? "form-control  is-invalid"
                      : "form-control "
                  }
                  {...register("fromEmail", {
                    required: "This field is required",
                  })}
                />
                {errors.fromEmail && errors.fromEmail.message ? (
                  <small className="text-danger">
                    {errors.fromEmail && errors.fromEmail.message}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <h4 className="form-title">
                To (Whom You Want To Gift this Cart)
              </h4>

              <div className="form-group mb-2">
                <label className="form-label">
                  Name
                  <span className="ms-1 text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={
                    errors.toName ? "form-control  is-invalid" : "form-control "
                  }
                  {...register("toName", {
                    required: "This field is required",
                  })}
                />
                {errors.toName && errors.toName.message ? (
                  <small className="text-danger">
                    {errors.toName && errors.toName.message}
                  </small>
                ) : null}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">
                  Email Address
                  <span className="ms-1 text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={
                    errors.toEmail
                      ? "form-control  is-invalid"
                      : "form-control "
                  }
                  {...register("toEmail", {
                    required: "This field is required",
                  })}
                />
                {errors.toEmail && errors.toEmail.message ? (
                  <small className="text-danger">
                    {errors.toEmail && errors.toEmail.message}
                  </small>
                ) : null}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">
                  Your Message
                  <span className="ms-1 text-danger">*</span>
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className={
                    errors.message
                      ? "form-control  is-invalid"
                      : "form-control "
                  }
                  {...register("message", {
                    required: "This field is required",
                  })}
                ></textarea>

                {errors.message && errors.message.message ? (
                  <small className="text-danger">
                    {errors.message && errors.message.message}
                  </small>
                ) : null}
              </div>

              <div className="row ">
                <div className="col-12 ">
                  <div className="form-group mb-0 ">
                    <label className="form-label">
                      Select Gift Card Amount
                      <span className="ms-1 text-danger">*</span>
                    </label>
                  </div>
                </div>

                {cardPrices && cardPrices.length > 0
                  ? cardPrices.map((cardPrice, index) => {
                      return (
                        <div key={index} className="col-6 col-md-3 mb-2">
                          <div className="form-check">
                            <label
                              className="form-check-label"
                              htmlFor={`giftCardAmount${index}`}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="giftCardAmount"
                                value={cardPrice._id}
                                id={`giftCardAmount${index}`}
                                checked={giftPriceId == cardPrice._id}
                                onChange={(e) => {
                                  setGiftPriceId(e.target.value);
                                  setHasCustomAmount("no");
                                  setCustomAmount("");
                                }}
                              />
                              £{cardPrice.userGet}
                              {cardPrice.bonus && cardPrice.bonus > 0 ? (
                                <span className="badge badge-secondary ms-2">
                                  + £{cardPrice.bonus} Free
                                </span>
                              ) : null}
                            </label>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="row">
                <div className="col-12 col-md-12 mb-3  ms-0">
                  <div className="d-flex" onChange={handleCustomAmountOption}>
                    <span>Custom Card Amount? </span>

                    <div className="ms-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="customGiftCardAmount"
                        id="customAmountYes"
                        value={"yes"}
                        checked={hasCustomAmount == "yes"}
                      />
                      <label
                        className="form-check-label ms-1"
                        htmlFor="customAmountYes"
                      >
                        Yes
                      </label>
                    </div>

                    <div className="ms-3">
                      <input
                        className="form-check-input "
                        type="radio"
                        name="customGiftCardAmount"
                        id="customAmountNo"
                        value={"no"}
                        checked={hasCustomAmount == "no"}
                      />
                      <label
                        className="form-check-label ms-1"
                        htmlFor="customAmountNo"
                      >
                        No
                      </label>
                    </div>
                  </div>

                  {hasCustomAmount == "yes" ? (
                    <div className="mt-2">
                      <input
                        style={{ maxWidth: "160px" }}
                        type="number"
                        min={0}
                        className="form-control  py-1"
                        placeholder="Enter amount"
                        value={customAmount}
                        onBlur={(e) => {
                          let val = e.target.value;

                          if (val < 1) {
                            setCustomAmount(0);
                          } else {
                            setCustomAmount(val);
                          }
                        }}
                        onChange={(e) => {
                          let val = e.target.value;
                          setCustomAmount(val);
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                {/* <div className="col-12 col-md-3 mb-3  ms-0">
                <div className="">
                  <p className="mb-0">Custom Card Amount? </p>
                  <input
                    type="number"
                    min={0}
                    className="form-control py-0 "
                    placeholder="Enter amount"
                    onBlur={(e) => {
                      console.log("e.target.value", e.target.value);
                    }}
                  />
                </div>
              </div> */}
              </div>

              <div className="row ">
                <div className="col-12 ">
                  <div className="form-group mb-0 ">
                    <label className="form-label">
                      Select Gift Card
                      <span className="ms-1 text-danger">*</span>
                    </label>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-2">
                  <div className="gift-card-img selected">
                    <img
                      className="img rounded"
                      src="https://place-hold.it/150x150"
                      alt=""
                    />
                    <p>Victory Day</p>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-2">
                  <div className="gift-card-img ">
                    <img
                      className="img rounded"
                      src="https://place-hold.it/150x150"
                      alt=""
                    />
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-2">
                  <div className="gift-card-img ">
                    <img
                      className="img rounded"
                      src="https://place-hold.it/150x150"
                      alt=""
                    />
                  </div>
                </div>

                <div className="col-md-12 d-flex justify-content-center">
                  <button type="button" className="btn btn-info text-white py-0">
                    Preview
                  </button>
                </div>

                <div className="col-md-12 mt-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary text-white ">
                    Pay With Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiftCardForm;
