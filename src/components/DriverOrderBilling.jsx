const DriverOrderBilling = (props) => {
  const { billing, setBilling, postCode, streetAddress } = props;
  const billingSameAsCollection = () => {
    setBilling({
      ...billing,
      billingPostcode: postCode,
      billingStreetAddress: streetAddress,
    });
  };

  return (
    <div className="row">
      <div className="col-md-8 me-auto ms-auto mt-3">
        <h4 className="form-title">Billing Details</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2 w-100">
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
            <div className="form-group">
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
        </div>
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
        <div className={"row"}>
          <div className="form-group mb-2 col-md-6">
            <label className="form-label">
              Postcode <span style={{ color: "red", fontSize: "18px" }}>*</span>
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
          <div className="form-group col-md-6">
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
        <div className={"d-md-flex justify-content-between w-100"}>
          <div className="form-group mb-2 w-100">
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
        <div className={"d-md-flex justify-content-between w-100"}>
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
      <div className="col-md-8 me-auto ms-auto mt-3">
        <h4 className="form-title text-start">Order recursively</h4>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group small-100 mb-2">
              <label className="form-label">I want to order this in each</label>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-between">
                <div className="form-check mb-2">
                  <label className="form-check-label" htmlFor="recursiveOrder0">
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
                  <label className="form-check-label" htmlFor="recursiveOrder">
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
                  <label className="form-check-label" htmlFor="recursiveOrder2">
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
                  <label className="form-check-label" htmlFor="recursiveOrder3">
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
                  <label className="form-check-label" htmlFor="recursiveOrder4">
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
  );
};

export default DriverOrderBilling;
