import Script from "next/script"

export const GoogleAnalytics = () => {
    return (
        <>
            {/* Global site tag (gtag.js) - Google Analytics  */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=UA-233576742-1"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                 window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'UA-233576742-1');
                `}
            </Script>
        </>
    )
}