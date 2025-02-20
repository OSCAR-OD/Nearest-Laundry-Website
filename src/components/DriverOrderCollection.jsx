import times from "@/utils/times";
import * as React from "react";
import Select from "react-select";
import { toast } from "react-toastify";
const currentHour = new Date().getHours();
const currentMinute = new Date().getMinutes();
const DriverOrderCollection = (props) => {
  const { cdData, setCdData } = props;
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
    if (!cdData.collectionDate) {
      toast("Please select collection date first", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "warning",
        position: "top-right",
        theme: "dark",
      });
      return;
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
  const collectionTimeChange = (e) => {
    setCdData({
      ...cdData,
      collectionTime: e,
      deliveryDate: "",
      deliveryTime: "",
    });
  };
  const deliveryTimeChange = (e) => {
    if (!cdData.collectionDate || !cdData.collectionTime) {
      toast("Please select collection date & Time first", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "warning",
        position: "top-right",
        theme: "dark",
      });
      return;
    }

    setCdData({ ...cdData, deliveryTime: e });
  };
  const changeCollectionInfo = (e) => {
    setCdData({ ...cdData, collectionInfo: e.target.value });
  };
  const changeDeliveryInfo = (e) => {
    setCdData({ ...cdData, deliveryInfo: e.target.value });
  };
  return (
    <div className="row">
      <div className="col-md-8 me-auto ms-auto mt-3">
        <div className="row">
          <div className="col-md-12">
            <h4 className="form-title">Collection Time</h4>
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
              <label className="form-label">Enter Collection Information</label>
              <input
                type="text"
                className="form-control"
                onChange={changeCollectionInfo}
                value={cdData.collectionInfo}
              />
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <h4 className="form-title">Delivery Time</h4>
            <div className="form-group mb-2">
              <label className="form-label">
                Delivery Date
                <span style={{ color: "red", fontSize: "18px" }}>*</span>
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
              <label className="form-label">Enter Delivery Information</label>
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
  );
};

export default DriverOrderCollection;
