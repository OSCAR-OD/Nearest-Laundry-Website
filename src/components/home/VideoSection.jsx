import banner from "@/components/assets/img/banner.png";
import { Carousel } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const VideoSection = ({ videos }) => {
  return (
    <section className="container video-section mt-5 mt-md-5">
      <div className="row mb-4">
        <h2 className="section-title">Videos you may like</h2>
        <h3 className="section-description d-none d-md-block">
          We have few videos describing us and how we work.
          <br />
          It may become one of your interest.
        </h3>
      </div>
        {videos?.length > 0 ? <div className="row">
            <div className="col-12 video-wrapper mt-4">
                <div
                    className="background-image"
                    style={{ backgroundImage: `url(${banner.src})` }}
                ></div>
                <div className="video-item">
                    <Carousel
                        interval={null}
                        className={"carousel-dark mt-4"}
                        indicators={false}
                        controls={videos && videos.length > 1 ? true : false}
                    >
                        {videos?.map((item, index) => (
                            <Carousel.Item
                                // interval={2000}
                                className={"justify-content-evenly"}
                                key={index}
                            >
                                <iframe
                                    src={item.link}
                                    title={item.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading={'lazy'}
                                ></iframe>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

            </div>
        </div> : <div className="row">
            <div className="col-12 video-wrapper mt-4">
                <Skeleton className={'background-image'} style={{backgroundImage: 'none'}}/>
            </div>
        </div> }

      <div className="row">
        <div className="col-12 text-center mt-3 mt-md-5 mb-5">
          <a href="/videos" className={"btn btn-outline-primary"}>
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
