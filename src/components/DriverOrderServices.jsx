import REQUEST from "@/utils/networks/Request";
import * as React from "react";

const DriverOrderServices = (props) => {
  const { items, setItems } = props;
  const [suggestion, setSuggestion] = React.useState([]);
  const [hideSuggestions, setHideSuggestions] = React.useState(true);
  const [top, setTop] = React.useState(75);
  const [currentSB, setCurrentSB] = React.useState(0);
  const addItem = () => {
    setItems([...items, { service: "", quantity: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const allItems = [...items];
    allItems.splice(index, 1);
    setItems(allItems);
  };

  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setHideSuggestions(true);
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

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  const searchQuery = async (e, index) => {
    items.map((it, i) => {
      if (i === index) {
        it.service = e.target.value;
        it.price = 0;
      }
    });
    setItems([...items]);
    // setTop(top*(index+1));
    setCurrentSB(index);
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
  const setItemValue = (val, price, index) => {
    items.map((it, i) => {
      if (i === index) {
        it.service = val;
        it.price = price;
      }
    });
    setItems([...items]);
    setHideSuggestions(true);
  };

  return (
    <div className="row">
      <div className="col-md-8 me-auto ms-auto mt-3">
        <h4 className="form-title">Type of your service</h4>
        {items.length
          ? items.map((item, index) => (
              <div
                className={"d-flex justify-content-evenly"}
                key={index}
                style={{ position: "relative" }}
                ref={wrapperRef}
              >
                <div className="form-group mb-2 me-2 w-74">
                  <label className="form-label">
                    Item name
                    <span style={{ color: "red", fontSize: "18px" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.service}
                    placeholder={"Please enter item name here."}
                    onChange={(e) => {
                      searchQuery(e, index);
                    }}
                    onFocus={() => setHideSuggestions(true)}
                  />
                </div>
                <div className="form-group w-24 me-2">
                  <label className="form-label">
                    Quantity
                    <span style={{ color: "red", fontSize: "18px" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min={1}
                    onChange={(e) => {
                      items.map((it, i) => {
                        if (i === index) it.quantity = e.target.value;
                      });
                      setItems([...items]);
                    }}
                    value={item.quantity}
                  />
                </div>
                <div className="form-group  shadow-none">
                  <label className="form-label">
                    <span style={{ fontSize: "18px" }}>&nbsp;</span>
                  </label>
                  <button
                    type="button"
                    className=" btn btn-danger  btn-sm mt-1"
                    onClick={() => handleRemoveItem(index)}
                  >
                    X
                  </button>
                </div>
                {!hideSuggestions &&
                suggestion.length &&
                currentSB === index ? (
                  <ul
                    className="list-group"
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      top: top,
                      left: 0,
                      minWidth: "400px",
                    }}
                  >
                    {suggestion.length
                      ? suggestion.map((item, ind) => (
                          <li
                            className="list-group-item"
                            key={ind}
                            onClick={() => {
                              setItemValue(item.name, item.price, index);
                            }}
                          >
                            {/*<Image src={item.image} alt={'PI'} width={40} height={40} style={{marginRight: '10px'}}/>*/}
                            {item.name}
                          </li>
                        ))
                      : null}
                  </ul>
                ) : null}
              </div>
            ))
          : null}
        <div className={"text-center"}>
          <button
            className={"btn btn-primary text-uppercase text-small"}
            onClick={addItem}
          >
            Add more item
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverOrderServices;
