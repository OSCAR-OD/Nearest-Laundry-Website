import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Skeleton from "react-loading-skeleton";
const HeroSection = (props) => {
  const { banners } = props;

  const [sliderIndex, setSliderIndex] = useState(0);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    let color =
      banners?.length > 0 && banners[sliderIndex].color
        ? banners[sliderIndex].color
        : "#fff";
    setBgColor(color);
  }, [sliderIndex, banners]);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <section className="container hero-section">
        <div className="row">
          <div className={`col-12 slider-wrapper`}>
            {banners?.length ? (
              <Carousel
                onSelect={(eventKey, event) => {
                  // console.log("OnSelect eventKey", eventKey);
                  // console.log("OnSelect event", event);
                  setSliderIndex(eventKey);
                }}
                // onSlide={(eventKey, event) => {
                //   console.log("onSlide eventKey", eventKey);
                //   console.log("onSlide event", event);
                //   setSliderIndex(eventKey);
                // }}
                // onSlid={(eventKey, event) => {
                //   console.log("onSlid eventKey", eventKey);
                //   console.log("onSlid event", event);
                //   setSliderIndex(eventKey);
                // }}
                indicators={false}
                controls={banners && banners.length > 1 ? true : false}
              >
                {banners.map((item, index) => (
                  <Carousel.Item key={index} interval={4000}>
                    <a href={item.link}>
                      <Image
                        src={item.file}
                        alt={"banner"}
                        width={"1440"}
                        height={"760"}
                        className="d-block carousel-image"
                        priority={true}
                      />
                    </a>
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

export default HeroSection;
