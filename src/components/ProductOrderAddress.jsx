import REQUEST from "@/utils/networks/Request";
import times from "@/utils/times";
import * as React from "react";
import Select from "react-select";
const currentHour = new Date().getHours();
const currentMinute = new Date().getMinutes();
const OrderAddress = (props) => {
  const {
    cdData,
    setCdData,
    postCode,
    setPostCode,
    streetAddress,
    setStreetAddress,
    allAddresses,
    billing,
    setBilling,
  } = props;

  Date.prototype.addDay = function (d) {
    this.setTime(this.getTime() + d * 24 * 60 * 60 * 1000);
    return this;
  };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date().addDay(1).toISOString().split("T")[0];

  let fromPos = Math.ceil(currentMinute / 15);
  for (let i = 0; i < times.length; i++) {
    const hour = parseInt(times[i].value.split("-")[0].split(":")[0]);
    if (hour === currentHour) {
      fromPos = fromPos + i;
      break;
    }
  }

  const collectionTimes = times.slice(fromPos + 8, times.length);
  const deliveryDateRef = React.useRef(null);
  const [cTimes, setCTimes] = React.useState([]);
  const [dTimes, setDTimes] = React.useState([]);
  const [minDelivery, setMinDelivery] = React.useState(tomorrow);
  const [errors, setErrors] = React.useState({});

  const [message, setMessage] = React.useState("");
  const [addresses, setAddresses] = React.useState();
  const [checking, setChecking] = React.useState(false);
  const [selected, setSelected] = React.useState({
    value: "",
    label: "Please select an address",
  });

  const collectionDateChange = (e) => {
    if (e.target.value === today) {
      setCTimes(collectionTimes);
    } else {
      setCTimes(times);
    }
    setCdData({
      ...cdData,
      collectionDate: e.target.value,
      collectionTime: "",
      deliveryDate: "",
      deliveryTime: "",
    });
    const nextDayOfCollection = new Date(e.target.value)
      .addDay(1)
      .toISOString()
      .split("T")[0];
    setMinDelivery(nextDayOfCollection);
  };

  const deliveryDateChange = (e) => {
    if (!cdData.collectionTime) {
      setErrors({
        ...errors,
        deliveryDate: "Please select collection time first.",
      });
      return;
    } else {
      setErrors({
        ...errors,
        deliveryDate: "",
      });
    }
    const dayN = new Date(cdData.collectionDate)
      .addDay(1)
      .toISOString()
      .split("T")[0];
    if (e.target.value === dayN) {
      setDTimes(
        times.slice(times.indexOf(cdData.collectionTime), times.length)
      );
    } else {
      setDTimes(times);
    }
    setCdData({ ...cdData, deliveryDate: e.target.value, deliveryTime: "" });
  };

  // const deliveryDateChecking = (e) => {
  //   // check collection time exist or not
  //   if (!cdData.collectionTime) {
  //     setErrors({
  //       ...errors,
  //       deliveryDate: "Please select collection time first.",
  //     });

  //     return;
  //   } else {
  //     setErrors({
  //       ...errors,
  //       deliveryDate: "",
  //     });
  //   }

  //   // check selected date with minDelivery date
  //   const dateIsAfter = moment(moment(e.target.value)).isSameOrAfter(
  //     minDelivery
  //   );

  //   if (!dateIsAfter) {
  //     setErrors({
  //       ...errors,
  //       deliveryDate: `Delivery date should be after or equal to ${moment(
  //         minDelivery
  //       ).format("MM/DD/YYYY")}`,
  //     });
  //     return;
  //   } else {
  //     setErrors({
  //       ...errors,
  //       deliveryDate: "",
  //     });
  //   }
  // };

  const collectionTimeChange = (e) => {
    setCdData({
      ...cdData,
      collectionTime: e,
      deliveryDate: "",
      deliveryTime: "",
    });
  };

  const deliveryTimeChange = (e) => {
    setCdData({ ...cdData, deliveryTime: e });
  };

  const changeCollectionInfo = (e) => {
    setCdData({ ...cdData, collectionInfo: e.target.value });
  };

  const changeDeliveryInfo = (e) => {
    setCdData({ ...cdData, deliveryInfo: e.target.value });
  };

  const getServingAreas = async () => {
    setChecking(true);
    if (postCode) {
      const response = await REQUEST.PageData.checkServiceArea(postCode);
      if (response.success === true) {
        setMessage("We provide service in your area. Please proceed.");
        setAddresses(
          response.data.addresses.addresses.map((item) => ({
            value: item,
            label: item,
          }))
        );
      } else {
        setMessage(
          "We do not provide service in your area. Please try with another postcode."
        );
      }
    }
    setChecking(false);
  };
  const handleChange = (so) => {
    setSelected(so);
    setStreetAddress(so.value);
  };
  const billingSameAsCollection = () => {
    setBilling({
      ...billing,
      billingPostcode: postCode,
      billingStreetAddress: streetAddress,
    });
  };
  React.useEffect(() => {
    if (allAddresses.length > 0) {
      setAddresses(allAddresses);
    }
  }, [allAddresses]);

  return (
    <>
      <div className="row">
        <div className="col-md-8 me-auto ms-auto mt-3">
          <h4 className="form-title">Address Details</h4>
          <div className="row">
            <div className="form-group col-md-6 mb-2">
              <label htmlFor="postcode" className="form-label">
                Post Code
                <span style={{ color: "red", fontSize: "18px" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setPostCode(e.target.value);
                }}
                value={postCode}
                id="postcode"
                onBlur={getServingAreas}
              />
              {message ? <p className={"help-block"}>{message}</p> : null}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="street_address" className="form-label">
                Street Address
                <span style={{ color: "red", fontSize: "18px" }}>*</span>
              </label>
              <Select
                value={selected}
                onChange={handleChange}
                options={addresses}
                placeholder={"Select an address"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 me-auto ms-auto">
          <div className="row">
            <div className="col-md-12 mt-3">
              <h4 className="form-title">Collection Time</h4>
              <div className="form-group mb-2 small-100">
                <label className="form-label">
                  Collection Date
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  min={today}
                  value={cdData.collectionDate}
                  onChange={collectionDateChange}
                />
              </div>
              <div className="form-group small-100 mb-2">
                <label className="form-label">
                  Collection Time
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <Select
                  options={cTimes}
                  value={cdData.collectionTime}
                  onChange={collectionTimeChange}
                  placeholder={"Please select collection time"}
                />
              </div>
              <div className={"w-100"}>
                <div className="form-group small-100 mb-2">
                  <label className="form-label">
                    Enter Collection Information
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={changeCollectionInfo}
                    value={cdData.collectionInfo}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <h4 className="form-title">Delivery Time</h4>
              <div className="form-group small-100 mb-2">
                <label className="form-label">
                  Delivery Date
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                  {errors.deliveryDate ? (
                    <span style={{ color: "red", fontSize: "16px" }}>
                      {" "}
                      {errors.deliveryDate}
                    </span>
                  ) : null}
                </label>
                <input
                  ref={deliveryDateRef}
                  type="date"
                  className="form-control"
                  min={minDelivery}
                  value={cdData.deliveryDate}
                  onChange={deliveryDateChange}
                  onClick={() => {
                    deliveryDateRef.current.showPicker();
                  }}
                  onKeyUp={() => {
                    deliveryDateRef.current.showPicker();
                  }}
                  onKeyDown={() => {
                    deliveryDateRef.current.showPicker();
                  }}
                />
              </div>
              <div className="form-group small-100 mb-2">
                <label className="form-label">
                  Delivery Time
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <Select
                  options={dTimes}
                  value={cdData.deliveryTime}
                  onChange={deliveryTimeChange}
                  placeholder={"Please select delivery time"}
                />
              </div>
              <div className={"w-100"}>
                <div className="form-group mb-2">
                  <label className="form-label">
                    Enter Delivery Information
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={changeDeliveryInfo}
                    value={cdData.deliveryInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 me-auto ms-auto mt-3">
          <h4 className="form-title text-start">Billing Details</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group small-100 mb-2">
                <label className="form-label">
                  Full Name{" "}
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setBilling({ ...billing, name: e.target.value });
                  }}
                  value={billing.name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group small-100">
                <label className="form-label">
                  Email Address{" "}
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => {
                    setBilling({ ...billing, email: e.target.value });
                  }}
                  value={billing.email}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className={"billingAddressSame"}>
                <div className="form-group mt-3 mb-2 d-flex justify-content-between">
                  <label
                    className="form-label"
                    onClick={billingSameAsCollection}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="checkbox"
                      onChange={billingSameAsCollection}
                      className="form-check-inline"
                    />
                    Billing address same as collection address.
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-2 small-100">
                <label className="form-label">
                  Postcode{" "}
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setBilling({ ...billing, billingPostcode: e.target.value });
                  }}
                  value={billing.billingPostcode}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group small-100">
                <label className="form-label">
                  Street Address{" "}
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setBilling({
                      ...billing,
                      billingStreetAddress: e.target.value,
                    });
                  }}
                  value={billing.billingStreetAddress}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-2 w-100">
                <label className="form-label">
                  Mobile/WhatsApp No.{" "}
                  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setBilling({ ...billing, mobile: e.target.value });
                  }}
                  value={billing.mobile}
                />
              </div>
            </div>
          </div>
          <div className={"d-md-flex justify-content-between w-100"}>
            <div className="form-group small-100 mb-2 w-100">
              <label className="form-label">Extra Detail of Address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setBilling({ ...billing, extraDetails: e.target.value });
                }}
                value={billing.extraDetails}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 me-auto ms-auto mt-3">
          <h4 className="form-title text-start">Order recursively</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group small-100 mb-2">
                <label className="form-label">
                  I want to order this in each
                </label>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <div className="form-check mb-2">
                    <label
                      className="form-check-label"
                      htmlFor="recursiveOrder0"
                    >
                      <input
                        defaultChecked={true}
                        className="form-check-input"
                        type="radio"
                        name="recursiveOrder"
                        id="recursiveOrder0"
                        onChange={() => {
                          setBilling({ ...billing, recursive: 0 });
                        }}
                      />
                      None
                    </label>
                  </div>

                  <div className="form-check mb-2">
                    <label
                      className="form-check-label"
                      htmlFor="recursiveOrder"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recursiveOrder"
                        id="recursiveOrder"
                        onChange={() => {
                          setBilling({ ...billing, recursive: 7 });
                        }}
                      />
                      7 Days
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <label
                      className="form-check-label"
                      htmlFor="recursiveOrder2"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recursiveOrder"
                        id="recursiveOrder2"
                        onChange={() => {
                          setBilling({ ...billing, recursive: 14 });
                        }}
                      />
                      14 Days
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <label
                      className="form-check-label"
                      htmlFor="recursiveOrder3"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recursiveOrder"
                        id="recursiveOrder3"
                        onChange={() => {
                          setBilling({ ...billing, recursive: 21 });
                        }}
                      />
                      21 Days
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <label
                      className="form-check-label"
                      htmlFor="recursiveOrder4"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="recursiveOrder"
                        id="recursiveOrder4"
                        onChange={() => {
                          setBilling({ ...billing, recursive: 28 });
                        }}
                      />
                      28 Days
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderAddress;
