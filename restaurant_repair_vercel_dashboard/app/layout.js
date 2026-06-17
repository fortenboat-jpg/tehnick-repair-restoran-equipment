import "./globals.css";

export const metadata = {
  title: "Restaurant Repair Dashboard",
  description: "Client finder and estimate dashboard for restaurant equipment repair"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
