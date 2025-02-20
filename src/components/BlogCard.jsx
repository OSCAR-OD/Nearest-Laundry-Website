import Image from "next/image";

const BlogCard = (props) => {
  const { blog } = props;
  return (
    <div className="blog-card">
      <Image
        className="blog-image"
        src={blog.image}
        priority={true}
        alt={"Blog Image"}
        width={200}
        height={160}
      />
      <h5 className="blog-title">{blog.title}</h5>
      <h6 className="blog-info d-flex justify-content-between">
          <span>Created At: {new Date(blog.createdAt).toDateString()}</span>
          <span>Visitor Count: {blog.visitorCount??0}</span>
      </h6>
      <h6
        className="blog-description"
        dangerouslySetInnerHTML={{
          __html:
            blog.description.slice(0, 155) +
            `${blog.description.length > 155 ? "..." : ""}`,
        }}
      ></h6>
      <div className="action-buttons blog-attraction-button">
        <a href={`/blog/${blog.slug}`} className="btn blog-read-more">
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
