import Script from "next/script";



// https://www.learnbestcoding.com/post/9/easiest-way-to-integrate-google-analytics-with-react-js-and-next-js


const GTM_ID = 'GTM-5CSG8K2';


// Google Tag Manager
export const GoogleTagManager = () => {
  return (
      <>
          <Script id="google-tag-manager"
              dangerouslySetInnerHTML={{
                  __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-5CSG8K2');
                  
            `}}
          />
      </>
  )
}