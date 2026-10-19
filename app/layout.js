
import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://fortenservice.vercel.app"),
  title: "Forten Commercial Equipment Services",
  description:
    "Commercial Kitchen Equipment Repair & Maintenance platform with website, CRM, estimates, work orders, invoices, and equipment history.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "gXHwzW1hPONEIOAw3lQjCxYUCm59DZ1Ms2iChYnIqwE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QN9BL0XZLZ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QN9BL0XZLZ');
          `}
        </Script>
      </body>
    </html>
  );
}

