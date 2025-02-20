import Link from "next/link";
import { Carousel } from "react-bootstrap";

const index = ({ sliders }) => {
  return (
    <div className="custom-slider-container">
      <div className="container">
        <div className="row">
          {/* Slider Container */}
          <div className="col-12 col-lg-9 ">
            <div className="slider-container">
              <Carousel controls={false}>
                {sliders.length > 0 &&
                  sliders.map((slider, i) => (
                    <Carousel.Item key={i}>
                      <div className="slider-card">
                        <Link href={`/category/${slider.category}`}>
                          <img
                            src={slider.image}
                            className="img-fluid"
                            alt="..."
                          />
                        </Link>
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
