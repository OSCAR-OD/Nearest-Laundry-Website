import Script from "next/script";
import { useRouter } from "next/router";

const schemas = [
  {
    url: "/product/hygenic-wash",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": " Hygienic Wash services ",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "77"
      },
      "brand": {
        "@type": "Brand",
        "name": "Nearest Laundry",
        "logo": "https://www.nearestlaundry.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.625c975b.png&w=256&q=75"
      },
      "description": "Experience uncompromising hygiene with Hygienic Wash services at nearest  laundries (London's number one  service ). We go the extra mile to ensure your garments are thoroughly cleaned, eliminating dirt, germs and allergens.",
      "image": "https://www.nearestlaundry.com/_next/image?url=https%3A%2F%2Fapi.nearestlaundry.com%2Ffile-1690975471879-824440808.jpg&w=640&q=75",
      "offers": {
        "@type": "Offer",
        "availability": "https://www.nearestlaundry.com/product/hygenic-wash",
        "price": "20.99",
        "priceCurrency": "GBP"
      },
      "review": [
        {
          "@type": "Review",
          "author": "Freddie",
          "datePublished": "2023-10-02",
          "reviewBody": "The name says it all – NearestLaundry is indeed the nearest and most convenient laundry service I've ever used. Located just around the corner from my home, it's a game-changer for anyone with a busy schedule. The 24/7 accessibility is a huge plus; I can drop off or pick up my laundry at any hour that suits me.",
          "name": "Value purchase",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "1",
            "worstRating": "1"
          }
        }

      ]
    }
  },
  {
    url: "/product/mixed-wash-6kg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": " Mixed Wash Service in London",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "81"
      },
      "brand": {
        "@type": "Brand",
        "name": "Nearest Laundry",
        "logo": "https://www.nearestlaundry.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.625c975b.png&w=256&q=75"
      },
      "description": "A mixed wash service is your laundry's best friend. This all-in-one solution tackles a variety of fabrics and garments, from delicate silks to tough workwear. With a blend of traditional and eco-friendly methods, your clothes get top-notch care.Preserve quality, save time, and Talk to us to get London's number one service",
      "url": "https://www.nearestlaundry.com/product/mixed-wash-6kg",
      "image": "https://www.nearestlaundry.com/_next/image?url=https%3A%2F%2Fapi.nearestlaundry.com%2Ffile-1690972029284-719202194.jpg&w=640&q=75",
      "offers": {
        "@type": "Offer",
        "price": "16.50",
        "priceCurrency": "GBP"
      },
      "review": [
        {
          "@type": "Review",
          "author": "Pritom Chaki",
          "datePublished": "2023-09-26",
          "reviewBody": "I recently tried out NearestLaundry, and I have to say, it exceeded my expectations in every way. This laundry service truly lives up to its name, offering not only proximity but also top-notch cleanliness and convenience.",
          "name": "Value purchase",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "1",
            "worstRating": "1"
          }
        }

      ]
    }
  }
]

const getSchema = (url) => {
  console.log(url);
  let schema = {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "name": "Nearest Laundry",
    "image": "https://www.nearestlaundry.com/",
    "@id": "",
    "url": "https://www.nearestlaundry.com/",
    "telephone": "02034884131",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "60 Turnstone Close",
      "addressLocality": "London",
      "postalCode": "E13 0HW",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5262618,
      "longitude": 0.0192724
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/NearestLaundry",
      "https://twitter.com/NearestLaundry",
      "https://www.instagram.com/nearestlaundry/",
      "https://www.youtube.com/@Nearestlaundry",
      "https://www.linkedin.com/company/91075131/admin/?feedType=following",
      "",
      "https://www.nearestlaundry.com/"
    ]
  };
  for (let i = 0; i < schemas.length; i++) {
    if (schemas[i].url === url) {
      schema = schemas[i].schema;
    }
  }
  return schema;
}

// Structured Data Component
export const StructuredData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const schema = getSchema('/product/' + slug);
  return (
    <>
      <Script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}