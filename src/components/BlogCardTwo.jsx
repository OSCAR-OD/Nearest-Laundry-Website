import Image from "next/image";
import Icon from "react-icons-kit";
import { longArrowRight } from "react-icons-kit/fa";

const BlogCardTwo = (props) => {
  const { blog } = props;
  const options = { year: "numeric", month: "short", day: "numeric" };
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const blogLink = (
    <link
      rel="prefetch"
      href={`/blog/${blog.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    />
  );

  return (
    <div className="card-container ">
      {blogLink}

      <div className="card-image">
        <Image src={blog.image} alt="blog" width={300} height={150} />
      </div>

      <div className="card-body homepage-blog-card">
        {blog.keywords ? (
          <div className={"w-100 d-flex flex-wrap"}>
            <span className="card-badge card-badge-primary m-1">
              {blog.keywords[0]}
            </span>
          </div>
        ) : null}

        <div className={"blog-date-info"}>
          <span className="total_read">
            Total Read: {blog.visitorCount ?? 0}
          </span>
          <span className="published_on">
            Published On:{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-us", options)}
          </span>
        </div>

        <h2>
          {blog.title.slice(0, 28)}
          {blog.title.length > 28 ? "..." : ""}
        </h2>

        <p className="card-subtitle">
          {removeTags(blog.description).slice(0, 60)}
          <a
            href={`/blog/${blog.slug}`}
            style={{
              textDecoration: "none",
              color: "var(--color-primary)",
              marginLeft: "5px",
            }}
          >
            Read more{" "}
            <Icon icon={longArrowRight} size={20} style={{ marginLeft: "5px" }} />
          </a>
        </p>
      </div>
    </div>
  );
};

export default BlogCardTwo;
//////////
// import Image from "next/image";
// import Icon from "react-icons-kit";
// import { longArrowRight } from "react-icons-kit/fa";

// const BlogCardTwo = (props) => {
//   const { blog } = props;
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   function removeTags(str) {
//     if (str === null || str === "") return false;
//     else str = str.toString();

//     // Regular expression to identify HTML tags in
//     // the input string. Replacing the identified
//     // HTML tag with a null string.
//     return str.replace(/(<([^>]+)>)/gi, "");
//   }
//   return (
//     <div className="card-container ">
//       <a
//         href={`/blog/${blog.slug}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <div className="card-image">
//           <Image src={blog.image} alt="blog" width={300} height={150} />
//         </div>
//         <div className="card-body homepage-blog-card">
//           {blog.keywords ? (
//             <div className={"w-100 d-flex flex-wrap"}>
//               <span className="card-badge card-badge-primary m-1">
//                 {blog.keywords[0]}
//               </span>
//             </div>
//           ) : null}

//           <div className={"blog-date-info"}>
//             <span className="total_read">
//               Total Read: {blog.visitorCount ?? 0}
//             </span>
//             <span className="published_on">
//               Published On:{" "}
//               {new Date(blog.createdAt).toLocaleDateString("en-us", options)}
//             </span>
//           </div>
//           <h2>
//             {blog.title.slice(0, 28)}
//             {blog.title.length > 28 ? "..." : ""}
//           </h2>
//           <p className="card-subtitle">
//             {removeTags(blog.description).slice(0, 60)}
//             <a
//               href={`/blog/${blog.slug}`}
//               style={{
//                 textDecoration: "none",
//                 color: "var(--color-primary)",
//                 marginLeft: "5px",
//               }}
//             >
//               Read more{" "}
//               <Icon
//                 icon={longArrowRight}
//                 size={20}
//                 style={{ marginLeft: "5px" }}
//               />
//             </a>
//           </p>
//         </div>
//       </a>
//     </div>
//   );
// };

// export default BlogCardTwo;
