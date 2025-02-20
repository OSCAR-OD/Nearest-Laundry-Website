import Slider from "react-slick";
import BlogCardTwo from "../BlogCardTwo";
import Image from "next/image";
import Icon from "react-icons-kit";
import {longArrowRight} from "react-icons-kit/fa";
import Skeleton from "react-loading-skeleton";
const BlogSection = ({ blogs }) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: false,
    speed: 500,
    // slidesToShow: items.length < 3 ? items.length : 5,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    // variableWidth: true,
    // adaptiveHeight: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let firstItems = [1,2,3,4,5];
  return (
    <section className="container blog-section mt-2 mt-md-4">
      <div className="row">
        <div className="col-12">
          <h2 className="section-title mb-4">Blog</h2>
          <p className="section-description">
            Nearest Laundry offers same-day Laundry service in London. <br/>
            We are publishing a blog for our customers as if they can get enough knowledge about the care of their clothes. Our article will be helpful for our customers. <br/>
            We are always trying to make published content stay with Nearest Laundry. Enjoy Our Services and get different offers based on products.
          </p>
        </div>
      </div>

      <div className="row d-flex justify-content-evenly mt-4">
        <div className="simple-slick-slider ">
          <Slider {...settings} className={"mt-4"}>
            {blogs?.length > 0 ?
              blogs?.map((blog, index) => (
                <div className="simple-slick-slide">
                  <BlogCardTwo key={index} blog={blog} />
                </div>
              )) : firstItems.map((item, index) => <div className="simple-slick-slide" key={index}><div className="card-container">
                    <div className="card-image">
                      <Skeleton style={{width: '300px', height: '250px'}} />
                    </div>
                    <Skeleton style={{marginTop: '20px', height: '20px',marginBottom: '15px'}} />
                    <Skeleton count={3}/>
                </div></div>)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
