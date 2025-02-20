import REQUEST from "@/utils/networks/Request";
import * as React from "react";
import Select from "react-select";

const DriverOrderAddress = (props) => {
  const { postCode, setPostCode, streetAddress, setStreetAddress } = props;
  const [message, setMessage] = React.useState("");
  const [addresses, setAddresses] = React.useState();
  const [checking, setChecking] = React.useState(false);
  const [selected, setSelected] = React.useState({ value: "", label: "" });
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
  React.useEffect(() => {
    if (streetAddress) {
      setSelected({ value: streetAddress, label: streetAddress });
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-8 me-auto ms-auto mt-3">
        <h4 className="form-title">Address Details</h4>
        <div className="form-group mb-2">
          <label htmlFor="postcode" className="form-label">
            Post Code<span style={{ color: "red", fontSize: "18px" }}>*</span>
          </label>
          <div className={"d-md-flex justify-content-evenly"}>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPostCode(e.target.value)}
              value={postCode}
              id="postcode"
            />
            <button className={"btn btn-get-address"} onClick={getServingAreas}>
              {checking ? (
                <div
                  className="spinner-grow text-dark"
                  role="status"
                  style={{
                    "--bs-spinner-width": "1.1rem",
                    "--bs-spinner-height": "1.1rem",
                  }}
                ></div>
              ) : (
                "Get Address"
              )}
            </button>
          </div>
          {message ? <p className={"help-block"}>{message}</p> : null}
        </div>
        <div className="form-group">
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
  );
};

export default DriverOrderAddress;
