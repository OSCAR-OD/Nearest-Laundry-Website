import AppContextProvider from '@/store/contexts/AppContext';
import CartContextProvider from '@/store/contexts/CartContext';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import FooterTwo from "@/components/FooterTwo";

import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BookAScheduleBtn from '@/components/floating-btn/BookAScheduleBtn';
import CartBtn from '@/components/floating-btn/CartBtn';
import WhatsAppBtn from '@/components/floating-btn/WhatsAppBtn';
import { GoogleAnalytics } from '@/components/googleAnalytics';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/pageloader.css';
// import { GoogleTagManager } from '@/components/GoogleTagManager';

// load custom style
import { StructuredData } from '@/components/structuredData';
import '@/styles/components.css';
import '@/styles/globals.css';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRouter } from "next/router";
import { useState } from "react";
import getSchema from "@/utils/Schema";

const tawkPropertyId = "61363becd6e7610a49b3ebb6";
const tawkApiKey = "1fettk5i1";


export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const router = useRouter();

  return <>
    <ToastContainer />
    <StructuredData />
    <GoogleAnalytics />

    {/* <GoogleTagManager /> */}

    <AppContextProvider >
      <CartContextProvider>
        <Component {...pageProps} />
        {(router.pathname !== '/payment/[oid]/[pi]') ? <>
          <CartBtn />
          <BookAScheduleBtn />
          <WhatsAppBtn />
          <FooterTwo />
        </> : null}
      </CartContextProvider>
    </AppContextProvider>

    <div className="tawk-custom-container">
      <TawkMessengerReact
        propertyId={tawkPropertyId}
        widgetId={tawkApiKey}
      />
    </div>
  </>
}
