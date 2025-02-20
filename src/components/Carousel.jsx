import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";

const CustomCarousel = (props) => {
  const { banners } = props;
  return (
    <section className="container">
      <div className="row">
        <div className={`col-12 slider-wrapper`}>
          {banners?.length ? (
            <Carousel
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
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CustomCarousel;
