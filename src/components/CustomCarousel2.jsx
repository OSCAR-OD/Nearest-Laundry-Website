import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Skeleton from "react-loading-skeleton";

const CustomCarousel2 = (props) => {
  const { banners } = props;

  const [sliderIndex, setSliderIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#fff");

  useEffect(() => {
    let color =
      banners?.length > 0 && banners[sliderIndex].color
        ? banners[sliderIndex].color
        : "#fff";
    setBgColor(color);
  }, [sliderIndex, banners]);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <section className="container">
        <div className="row">
          <div className={`col-12 custom-carousel2 slider-wrapper`}>
            {banners?.length ? (
              <Carousel
                onSelect={(eventKey, event) => {
                  // console.log("OnSelect eventKey", eventKey);
                  // console.log("OnSelect event", event);
                  setSliderIndex(eventKey);
                }}
                indicators={false}
                controls={banners && banners.length > 1 ? true : false}
              >
                {banners.map((item, index) => (
                  <Carousel.Item key={index} interval={4000}>
                    <Image
                      src={item.file}
                      priority={true}
                      alt={"banner"}
                      width={"1440"}
                      height={"400"}
                      className="d-block carousel-image"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Skeleton className={"hero-section-skeleton"} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomCarousel2;
