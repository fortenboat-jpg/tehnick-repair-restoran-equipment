import "./globals.css";

export const metadata = {
  title: "Restaurant Repair CRM",
  description: "CRM, estimates, and marketing for restaurant equipment repair"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
