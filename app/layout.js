import "./globals.css";

export const metadata = {
  title: "Forten Commercial Equipment Services",
  description: "Commercial Kitchen Equipment Repair & Maintenance platform with website, CRM, estimates, work orders, invoices, and equipment history.",
  verification: {
    google: "gXHwzW1hPONEIOAw3lQjCxYUCm59DZ1Ms2iChYnIqwE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
