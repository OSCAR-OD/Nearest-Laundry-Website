function sanitizeForXML(text) {
   const characterMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };
     return text.replace(/[&<>"']/g, (char) => characterMap[char]);
  }
  
  function formatDateForXML(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes} +00:00`;
  }

 function generateSiteMap(data) {
  const blogs = data.blogs.data;
  const services = data.services.data;
  const products = data.products.data;
  const lastmod = formatDateForXML(new Date());
  //const lastmod = new Date().toISOString();
  const blogUrls = blogs.map((blog) => ({
   url: `https://www.nearestlaundry.com/blog/${sanitizeForXML(blog.slug)}`,
   lastmod: lastmod,
    priority:'0.80'
  }));

  const serviceUrls = services.map((service) => ({
    url: `https://www.nearestlaundry.com/service/${sanitizeForXML(service.name)}`,
    lastmod: lastmod,
    priority:'0.80'

  }));

  const productUrls = products.map((product) => ({
    url: `https://www.nearestlaundry.com/product/${sanitizeForXML(product.slug)}`,
    lastmod: lastmod,
    priority: '0.80',
  }));

  const allUrls = [...blogUrls, ...serviceUrls, ...productUrls ];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
       <url>
      <loc>https://www.nearestlaundry.com/</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
    <loc>https://nearestlaundry.com/sign-in</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://nearestlaundry.com/sign-up</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://nearestlaundry.com/forget-password</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://nearestlaundry.com/service/all-service</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://nearestlaundry.com/blogs</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/order-with-driver</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/book-now</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/videos</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/gift-cards</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/terms-and-conditions</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/about-us</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/contact-us</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://www.nearestlaundry.com/privacy-policy</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.80</priority>
    </url>

    ${allUrls
      .map((item) => {
        return `<url>
        <loc>${item.url}</loc>
        <lastmod>${item.lastmod}</lastmod>
        <priority>${item.priority}</priority>
      </url>`;
      })
      .join("")}
  </urlset>
  `;
}

function SiteMap() {}

export const getServerSideProps = async ({ res }) => {
  const blogs = await fetch("https://api.nearestlaundry.com/blogSitemap");
  const blogsData = await blogs.json();

  const serviceInfo = await fetch("https://api.nearestlaundry.com/servicesSitemap");
  const serviceData = await serviceInfo.json();

   const productInfo = await fetch("https://api.nearestlaundry.com/productSitemap");
   const productData = await productInfo.json();


  const data = {
    blogs: blogsData,
    services: serviceData,
    products: productData,
  };

  const sitemap = generateSiteMap(data);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;

  
  
  
  
  
  
  